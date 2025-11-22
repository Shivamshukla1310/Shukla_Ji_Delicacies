const mongoose = require("mongoose")
// import dotenv from "dotenv";
const dotenv = require("dotenv")

dotenv.config()

const connectDb = async () => {
  await mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Database Connected"))
}

// mongoose.connectDb(process.env.MONGODB_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));

module.exports = connectDb