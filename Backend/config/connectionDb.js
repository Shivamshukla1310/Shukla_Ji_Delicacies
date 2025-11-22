// // config/connectionDb.js
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");

// dotenv.config();

// const connectDb = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);

//     console.log("MongoDB Connected Successfully");
//   } catch (error) {
//     console.error("MongoDB connection error:", error);
//     process.exit(1);
//   }
// };

// module.exports = connectDb;



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