const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;

        if (!uri || uri === 'your_mongodb_connection_string') {
            throw new Error('Please update MONGO_URI in your .env file with your actual MongoDB connection string.');
        }

        const conn = await mongoose.connect(uri);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Connection Failure: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
