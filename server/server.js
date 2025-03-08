// Main entry point of the backend
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS setup to allow requests from frontend running on port 3000
app.use(cors({
  origin: 'http://localhost:3000',  // Allow requests only from this origin
  methods: 'GET,POST,PUT,DELETE',  // Allowed methods
  allowedHeaders: 'Content-Type,Authorization',  // Allowed headers
}));

// Middleware to parse JSON
app.use(express.json());

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/applications', require('./routes/jobApplications'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
