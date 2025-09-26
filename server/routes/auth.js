import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

// 🔹 Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already registered");
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashed });
    await user.save();

    res.send("User created successfully ✅");
  } catch (err) {
    res.status(500).send("Error creating user");
  }
});

// 🔹 Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send("Invalid credentials");
    }

    const token = jwt.sign({ 
       id: user._id, 
      email: user.email }, 
      process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res
      .cookie("token", token, { httpOnly: true, sameSite: "strict" })
      .send("Logged in ✅");
  } catch (err) {
    res.status(500).send("Error logging in");
  }
});

// 🔹 Logout Route
router.post("/logout", (req, res) => {
  res.clearCookie("token").send("Logged out ✅");
});

// 🔹 Check Auth
router.get("/check", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).send("Unauthorized");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.json({ user: decoded });
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
});

export default router;
