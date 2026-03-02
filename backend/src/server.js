require('dotenv').config({quiet: true});// Load environment variables from .env file, with quiet mode to suppress warnings if the file is missing
require('colors');//library for adding colors to console output

const express = require('express');//web framework for building APIs
const path = require('path');//built-in module for handling file paths
const cors = require('cors');//middleware for enabling Cross-Origin Resource Sharing
const morgan = require('morgan');//logger middleware for logging HTTP requests
const connectDB = require('./config/database');//function to connect to MongoDB database
const noteRouter =  require('./routes/notesRoutes');//router for handling note-related API endpoints


const app = express();

// env variables
const PORT = process.env.PORT || 5001;
const URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/thoughtsphere';
//! NOTE: __dirname is available in CommonJS. In ES Modules, it must be recreated manually. Using path.resolve() to simulate __dirname.like below. 
//* const __dirname = path.resolve(); 

// middlewares
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: 'http://localhost:5173',
    }),
  );
}

app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1/notes', noteRouter);

// production frontend serve
if (process.env.NODE_ENV === "production") {

  app.use(express.static(path.join(__dirname, "/../../frontend/dist")));// Serve static files from the frontend's dist directory when in production mode. This allows the backend to serve the built frontend application.

  app.get(/.*/, (req, res) => {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "/../../frontend/dist/index.html"));// For any GET request that doesn't match an API route, send the index.html file from the frontend's dist directory. This is important for client-side routing in single-page applications (SPAs) like React, ensuring that all routes are handled by the frontend.
  });
}

// 404 handler
app.use((_, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });// If no route matches, return a 404 JSON response with a message indicating that the route was not found.
});

// global error handler
app.use((err, _, res, next) => {
  const statusCode = err.statusCode || err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Something went wrong',
  }); // If an error occurs in any route handler, this middleware will catch it and return a JSON response with the error message and appropriate status code.
});

// server start
const startServer = async () => {
  try {
    await connectDB(URI);

    app.listen(PORT, () =>
      console.log(
        `🚀 ThoughtSphere API is running at http://localhost:${PORT}`.white
          .bgCyan.bold,
      ),
    );
  } catch (error) {
    console.error(` Server Error : ${error.message} `.white.bgRed.bold);
    process.exit(1);//
  }
};

startServer();
