const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./User'); // User modelini içe aktarın
const Blog = require('./Blog'); // Blog modelini içe aktarın

const dbURI = process.env.DBURI;

async function connectDB() {
  try {
    // Mongoose ile MongoDB'ye bağlanma
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB with Mongoose!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

connectDB();

module.exports = {
  User,
  Blog,
};
