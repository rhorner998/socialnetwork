// server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('./config/db'); // Assuming you have your MongoDB connection logic here
const routes = require('./routes'); // Your central route file that includes all other routes

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Routes
app.use(routes);

// Connect to MongoDB
mongoose.connection.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
  process.exit(-1);
});

// Start the server only if MongoDB connects successfully
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(require('express-list-endpoints')(app)); 
  });
});
