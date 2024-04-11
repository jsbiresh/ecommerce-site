const User = require("../models/UserModel");
const asyncHandler = require('express-async-handler')


const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    // create a new user
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    // user already exists
    // res.json({
    //     msg: 'User Already Exists',
    //     success: false
    // })
    throw new Error('User Already Exists')
  }
})


const loginUserControl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // console.log(email, password); 
    // check if user exists or not
    const findUser = await User.findOne({ email: email })
    if (findUser && await findUser.isPasswordMatch(password)) {
        res.json(findUser);
    } else {
        throw new Error('Invalid Credentials.')
    }
})

module.exports = { createUser, loginUserControl };