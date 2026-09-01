require("dotenv").config()
const express = require('express')
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/authRoutes")
const connectDB = require('./db/db')
const cors = require("cors");
const app = express()

connectDB()

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)
app.use(cookieParser());
app.use(express.json())

// login API
app.use("/api/auth",authRoutes)

module.exports = app