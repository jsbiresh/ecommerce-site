const generateToken = require("../config/jwtToken");
const User = require("../models/UserModel");
const asyncHandler = require("express-async-handler");

// For User creation
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
    throw new Error("User Already Exists");
  }
});

// For Login Purposes
const loginUserControl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password);
  // check if user exists or not
  const findUser = await User.findOne({ email: email });
  if (findUser && (await findUser.isPasswordMatch(password))) {
    // res.json(findUser);
    res.json({
        _id: findUser?._id,
        firstname: findUser?.firstname,
        lastname: findUser?.lastname,
        email: findUser?.email,
        mobile: findUser?.mobile,
        token: generateToken(findUser?._id)

    })
    // const responseBody = {
    //   _id: findUser?._id,
    //   firstname: findUser?.firstname,
    //   lastname: findUser?.lastname,
    //   email: findUser?.email,
    //   mobile: findUser?.mobile,
    //   token: generateToken(findUser?._id),
    // };

    // res.json(responseBody);
    // console.log(responseBody); // Log the response body
  } else {
    throw new Error("Invalid Credentials.");
  }
});



// GET all Users 
const getAllUsers = asyncHandler(async (req, res) => {
    
    try {
        const getUsers = await User.find();
        res.json(getUsers);
    } catch (error) {
        throw new Error(error);        
    }


    
})

module.exports = { createUser, loginUserControl, getAllUsers };
