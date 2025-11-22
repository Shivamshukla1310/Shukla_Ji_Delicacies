const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const connectDb = require("./config/connectionDb")

const PORT = process.env.PORT || 3000

connectDb()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/recipe", require("./routes/recipe"))

app.listen(PORT, () => {
  console.log(`App is listening at ${PORT}`)
})
