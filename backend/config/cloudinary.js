const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// Cloudinary Configuration
const configureCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key:    process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.includes('video');
    return {
      folder:        'portfolio_assets',
      resource_type: isVideo ? 'video' : 'image',
      allowed_formats: ['jpg', 'png', 'jpeg', 'mp4', 'mov', 'webm'],
    };
  },
});

const upload = multer({ storage: storage });

module.exports = { configureCloudinary, upload };
