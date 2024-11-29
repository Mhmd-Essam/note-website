const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongodburl);
    console.log(`Database Connected ${conn.connection.host}`);
  } catch (err) {
    console.log(`THE ERROE ${err}`);
  }
};

module.exports = connectDB ; 
