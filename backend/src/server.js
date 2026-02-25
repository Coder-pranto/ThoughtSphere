require('dotenv').config({quiet: true});
require('colors');

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/database');
const noteRouter =  require('./routes/notesRoutes');
const rateLimiter = require('./middleware/rateLimiter');

const app = express();

// env variables
// const PORT = process.env.PORT || 5001;
const PORT = 5001;
const URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/thoughtsphere';

// middlewares
app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(express.json());
app.use(rateLimiter);
app.use(morgan('dev'));

// routes
app.use('/api/v1/notes', noteRouter);

// health check
app.get('/', (_, res) => {
  res.send('🚀 ThoughtSphere API is running');
});

// 404 handler
app.use((_, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// global error handler
app.use((err, _, res, next) => {
  const statusCode = err.statusCode || err.status || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Something went wrong',
  });
});

// server start
const startServer = async () => {
  try {
    await connectDB(URI);

    app.listen(PORT, () =>
      console.log(`🚀 Server running at http://localhost:${PORT}`.white.bgCyan.bold)
  );
  } catch (error) {
    console.error(` Server Error : ${error.message} `.white.bgRed.bold);
    process.exit(1);
  }
};

startServer();
