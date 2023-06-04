const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3500;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const musicRoutes = require('./src/routes/music-route');
app.use('/playlist', musicRoutes);

// MongoDB Atlas Connection
const mongoURI = 'mongodb+srv://kalabsol25:nB92.GEf*b6fhaJ@cluster0.urbyao0.mongodb.net/?retryWrites=true&w=majority';
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
