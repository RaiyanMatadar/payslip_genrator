const jwt = require("jsonwebtoken")
const express = require('express')
const connectDB = require('./db/db')
const app = express()

connectDB()

app.use(express.json())

// login API
app.post('/login', (req, res) => {
  const { email, password } = req.body

  // email and password for admin user 
  const adminEmail = "admin@gmail.com"
  const adminPassword = "admin"

  // validation of inputs 
  if (!email || !password) {
    return res.status(401).json({
      success: false,
      message: "please input all fields"
    })
  }

  // checks wether the admin email and password is correct or not 
  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({
      success: false,
      message: "please input valid credentials"
    })
  }

  // const token = jwt.sign(
  //   adminEmail, 
  //   PrivateKey = ,
  // )


  res.send('Hello World!')
})

module.exports = app