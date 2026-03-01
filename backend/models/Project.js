const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['video', 'image', 'before-after'],
        required: true
    },
    category: {
        type: String,
        enum: ['video-editing', 'photo-editing', 'ui-ux', 'graphic-design'],
        required: true
    },
    url: {
        type: String, // Video URL or main image URL
        required: true
    },
    thumbnail: {
        type: String, // Thumbnail URL for videos
    },
    beforeImage: {
        type: String, // For before-after types
    },
    afterImage: {
        type: String, // For before-after types
    },
    tags: {
        type: [String],
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);
