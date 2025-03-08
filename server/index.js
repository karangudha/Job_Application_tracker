// api documentation
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
// package imports
const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const logger = require(utils.logger.js);
const morgan = require('morgan');

// Swagger setup
const options = {
  defination: {
    openapi: "3.0.0",
    info: {
      title: "Job Application Tracker",
      version: "1.0.0",
      description: "API for managing job applications",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);


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

//swagger home page root
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(specs));

app.use()
// Middleware to parse JSON
app.use(express.json());

// Define routes


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
