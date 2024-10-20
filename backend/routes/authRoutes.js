// routes/authRoutes.js
import express from "express";
import {
  googleLogin,
  login,
  signup,
  editUser,
  followUser,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/ImageeUser.js";

const router = express.Router();

// Google login route
router.post("/google-login", googleLogin);

// Email/password login route
router.post("/login", login);

// Signup route
router.post("/signup", signup);

// Protected route to get user profile
router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

// Route to get user details by ID
router.get("/edit/:id", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Protected route to edit user details
router.put("/edit/:id", authMiddleware, editUser);

router.put("/users/:id/follow", authMiddleware, followUser);

export default router; // Updated export
