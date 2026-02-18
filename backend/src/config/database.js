const mongoose = require('mongoose');

const connectDB = async (url) => {
  try {
    const conn = await mongoose.connect(url);

    console.log(
      ` MongoDB Connected : ${conn.connection.host} `.rainbow.bgWhite.bold,
    );
  } catch (error) {
    console.error(` MongoDB Error : ${error.message} `.white.bgRed.bold);
    process.exit();
  }
};

module.exports = connectDB;
