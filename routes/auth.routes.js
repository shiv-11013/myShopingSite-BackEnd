const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const { body, validationResult } = require("express-validator");

router.post(
  "/register",
  body("fullName", "Full name is required").notEmpty(),
  body("email", "Please include a valid email").isEmail(),
  body("password", "Password must be at least 6 characters").isLength({
    min: 6,
  }),
  body("phone", "Phone number is required").notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { email, phone } = req.body;
      const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "User with this email or phone already exists" });
      }
      const user = new User(req.body);
      await user.save();
      const userResponse = user.toObject();
      delete userResponse.password;
      res
        .status(201)
        .json({ message: "Registration successful", data: { user: userResponse } });
    } catch (error) {
      console.error("Registration error:", error);
      res
        .status(500)
        .json({ message: "Registration failed", error: error.message });
    }
  }
);

router.post(
  "/login",
  body("email", "Please include a valid email").isEmail(),
  body("password", "Password is required").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          message: "Invalid email or password",
        });
      }
      const userResponse = user.toObject();
      delete userResponse.password;
      res.json({
        message: "Login successful",
        data: { user: userResponse },
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        message: "Login failed",
        error: error.message,
      });
    }
  }
);

router.get("/profile/:user_id", async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ data: { user } });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ data: { users } });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
});

module.exports = router;