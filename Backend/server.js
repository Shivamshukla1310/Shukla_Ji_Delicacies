// server.js
const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDb = require("./config/connectionDb");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 3000;

connectDb();

// Middleware - order matters
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// serve static files (images)
app.use("/images", express.static(path.join(__dirname, "public", "images")));

// Routes
app.use("/", require("./routes/user"));
app.use("/recipe", require("./routes/recipe"));

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`);
});



// const express = require("express")
// const app = express()
// const dotenv = require("dotenv").config()
// const connectDb = require("./config/connectionDb")
// const cors = require("cors")

// const PORT = process.env.PORT || 3000
// connectDb()

// app.use(express.json())
// app.use(cors())
// app.use(express.static("public"))

// app.use("/", require("./routes/user"))
// app.use("/recipe", require("./routes/recipe"))

// app.listen(PORT, (err) => {
//   console.log(`app is listening on port ${PORT}`)
// })