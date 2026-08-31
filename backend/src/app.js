require("dotenv").config()
const express = require('express')
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/authRoutes")
const connectDB = require('./db/db')
const app = express()

connectDB()

app.use(cookieParser());
app.use(express.json())

// login API
app.use("/api/auth",authRoutes)

module.exports = app