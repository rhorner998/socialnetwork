const mongoose = require('mongoose');

// Ensure that your MongoDB URI is stored in the MONGODB_URI environment variable,
// or replace the string below with your actual connection string.
const dbURI = process.env.MONGODB_URI || 'your_mongodb_uri_here';

mongoose.connect(dbURI)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log('MongoDB connection error:', err));

module.exports = mongoose;

