const User = require("../models/userSchema");
const { generateToken } = require("../helper/jwt");

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// ........................createUser........................................
const creatUser = async (req, res) => {
  try {
    const body = req.body;
    const { email } = body;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const user = new User(body);
    await user.save();
    res.status(200).json({ message: "User is created", user: user });
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

// .................................getUser...................................
const getUser = async (req, res) => {
  try {
    const userData = await User.find();
    res
      .status(200)
      .json({ message: "Users fetched successfully", user: userData });
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};
//................................getUserById.................................
const getUserById = async(req,res) =>{
  try {
    let id = req.params.id
    const user = await User.findById(id)
    res
      .status(200)
      .json({ message: "Users fetched successfully", user: user });
  } catch (err) {
    res.status(404).json({ message: "An error occurred", error: err.message });
  }
};

// ...........................deleteUser........................................
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

// ...........................updateUser......................................
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "User updated successfully", user: user });
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: err.message });
  }
};

// .............................loginUser..........................................
const loginUser = async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = data;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const UserData = await User.findOne({ email, password });

    if (!UserData) {
      return res
        .status(404)
        .json({ message: "User not found or incorrect credentials" });
    }

    const token = await generateToken({
      id: UserData._id,
      firstName: UserData.firstName,
      lastName: UserData.lastName,
      email: UserData.email
    });

    return res
      .status(200)
      .json({ message: "User found", data: UserData, token: token });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "An error occurred", error: err.message });
  }
};

module.exports = {
  creatUser,
  getUser,
  deleteUser,
  updateUser,
  loginUser,
  getUserById
};
