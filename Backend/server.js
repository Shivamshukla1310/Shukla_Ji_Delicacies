const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDb = require("./config/connectionDb");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 3000;

// DB connect
connectDb();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use("/images", express.static(path.join(__dirname, "public", "images")));

// ROUTES (VERY IMPORTANT ORDER!)
app.use("/user", require("./routes/user"));
app.use("/recipe", require("./routes/recipe"));

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});
