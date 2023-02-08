import asyncHandler from "express-async-handler"
import generateToken from "../utils/tokenGenerator.js"
import User from "../models/userModel.js"

// @desc     authorize login
// @route    POST /api/users/login
// @access   Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error("Invalid email or password")
  }
})

// @desc     register new user
// @route    POST /api/users/register
// @access   Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email: email })

  if (userExists) {
    res.status(400)
    throw new Error("User already exists")
  }

  const user = await User.create({
    name,
    email,
    password,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc     get all users
// @route    GET /api/users
// @access   Private, Admin

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})

  if (users) {
    res.json(users)
  } else {
    res.status(404)
    throw new Error("Users not found")
  }
})

export { authUser, registerUser, getUsers }
