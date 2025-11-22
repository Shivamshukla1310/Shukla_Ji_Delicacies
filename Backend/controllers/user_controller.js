// controllers/user_controller.js
const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashPwd = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashPwd });
    const token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY);

    return res.status(201).json({ token, user: newUser });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY);
    return res.json({ token, user });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ email: user.email, id: user._id });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { userLogin, userSignUp, getUser };




// const User = require("../models/user")
// const bcrypt = require("bcrypt")
// const jwt = require("jsonwebtoken")

// const userSignUp = async (req, res) => {
//   const { email, password } = req.body
//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password is required" })
//   }
//   let user = await User.findOne({ email })
//   if (user) {
//     return res.status(400).json({ error: "Email is already exist" })
//   }
//   const hashPwd = await bcrypt.hash(password, 10)
//   const newUser = await User.create({
//     email, password: hashPwd
//   })
//   let token = jwt.sign({ email, id: newUser._id }, process.env.SECRET_KEY)
//   return res.status(200).json({ token, user: newUser })

// }

// const userLogin = async (req, res) => {
//   const { email, password } = req.body
//   if (!email || !password) {
//     return res.status(400).json({ message: "Email and password is required" })
//   }
//   let user = await User.findOne({ email })
//   if (user && await bcrypt.compare(password, user.password)) {
//     let token = jwt.sign({ email, id: user._id }, process.env.SECRET_KEY)
//     return res.status(200).json({ token, user })
//   }
//   else {
//     return res.status(400).json({ error: "Invaild credientials" })
//   }
// }

// const getUser = async (req, res) => {
//   const user = await User.findById(req.params.id)
//   res.json({ email: user.email })
// }

// module.exports = { userLogin, userSignUp, getUser }