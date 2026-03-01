const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { configureCloudinary, upload } = require('./config/cloudinary');
const Project = require('./models/Project');

dotenv.config();

// Connect to MongoDB
connectDB();

// Setup Cloudinary config
configureCloudinary();

const app = express();
app.use(cors());
app.use(express.json());

// --- ROUTES ---

// 1. GET ALL PROJECTS
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 2. UPLOAD NEW PROJECT (Handles Video, Image, Before-After)
app.post('/api/projects', 
    upload.fields([
        { name: 'video', maxCount: 1 }, 
        { name: 'thumbnail', maxCount: 1 },
        { name: 'before', maxCount: 1 },
        { name: 'after', maxCount: 1 }
    ]), 
    async (req, res) => {
        try {
            const { title, description, category, type, tags } = req.body;
            
            const newProject = new Project({
                title,
                description,
                category,
                type,
                tags: tags ? tags.split(',') : [],
                // Mapping URLs based on what was uploaded
                url: req.files.video ? req.files.video[0].path : (req.files.after ? req.files.after[0].path : ''),
                thumbnail: req.files.thumbnail ? req.files.thumbnail[0].path : '',
                beforeImage: req.files.before ? req.files.before[0].path : '',
                afterImage: req.files.after ? req.files.after[0].path : ''
            });

            const savedProject = await newProject.save();
            res.status(201).json(savedProject);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
);

// 3. DELETE PROJECT
app.delete('/api/projects/:id', async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
