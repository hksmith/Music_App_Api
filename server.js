const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3500;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const musicRoutes = require('./src/routes/music-route');
app.use('/playlist', musicRoutes);

// MongoDB Atlas Connection
const mongoURI = process.env.MONGODBURI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to MongoDB Atlas');
  // Start the server once the connection is established
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.log('Error connecting to MongoDB Atlas:', error);
});
