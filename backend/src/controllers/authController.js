const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const adminModel = require("../models/adminModel")

const isProduction = process.env.NODE_ENV === 'production';

const cookieOption = {
  httpOnly: true,                               // JS can't read it → mitigates XSS theft
  secure: isProduction,                         // HTTPS only in prod
  sameSite: isProduction ? 'strict' : 'lax',    // Strict in prod for CSRF mitigation, Lax in dev to prevent local auth issues
  maxAge: 60 * 60 * 1000                        // 1 hour in milliseconds
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "please input all fields"
    })
  }

  try {
    const admin = await adminModel.findOne({
      email
    }
    ).select("+password")

    const isPasswordValid = await bcrypt.compare(password, admin.password)

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "please input valid credentials"
      })
    }

    req.admin = {
      id: admin._id.toString(),
      email: admin.email,
      role: admin.role
    }

    const token = jwt.sign(req.admin, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
    res.cookie("token", token, cookieOption)

  } catch (error) {
    console.error(error)
  }


  res.status(200).json({
    message: "login successfully",
    success: true,
    admin: req.admin
  })

}

module.exports = loginAdmin
