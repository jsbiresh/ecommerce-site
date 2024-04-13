const generateToken = require("../config/jwtToken");
const User = require("../models/userModel");
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
      token: generateToken(findUser?._id),
    });
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
    // console.log(getUsers);
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});

// GET a Single User
const getAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    // console.log(id)
    const userFound = await User.findById(id);
    if (userFound) {
      //   console.log(userFound);
      res.json(userFound);
    } else {
      res.json({
        msg: "User Not Found Bro.",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// DELETE a User
const deleteAUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const userToBeDeleted = await User.findByIdAndDelete(id);
    if (userToBeDeleted) {
      //   console.log(`Delete Success.`);
      res.status(204).json({ msg: `User with ID ${id} Deleted.` });
    } else {
      res.status(404).json({ message: "User Not Found." });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// UPDATE a User
const updateAUser = asyncHandler(async (req, res) => {
  const { id } = req.user;
  console.log(req.user);
  console.log(id);
  try {
    const userToBeUpdated = await User.findByIdAndUpdate(
      id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      { new: true }
    );
    res.json(userToBeUpdated);
  } catch (error) {
    throw new Error(error);
  }
});

// BLOCK a User
const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const blockU = await User.findByIdAndUpdate(
      id,
      { isBlocked: true },
      { new: true }
    );
    res.json({
      msg: `User Blocked.`
    })
  } catch (error) {
    throw new Error(error);
  }
});
// UNBLOCK a User
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const unblockU = await User.findByIdAndUpdate(
      id,
      { isBlocked: false },
      { new: true }
    );
    res.json({
      msg: `User Unblocked.`
    })
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUserControl,
  getAllUsers,
  getAUser,
  deleteAUser,
  updateAUser,
  blockUser,
  unblockUser,
};

// 1:07:33
