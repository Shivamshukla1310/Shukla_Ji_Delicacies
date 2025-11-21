const express = require("express")
const app = express()
const dotenv = require("dotenv").config()

const PORT = process.env.PORT || 3000 // If port is not available we will see 3000

app.get("/", (req, res) => {
  res.json({ message: "Hello Ji Shukla Ji Here..." })
})

app.listen(PORT, (err) => {
  console.log(`App is listening at ${PORT}`)
})