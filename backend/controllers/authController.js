//controllers/authController.js
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/ImageeUser.js";

// Google Login
export const googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const decoded = jwt.decode(token);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const { email, name } = decoded;
    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, displayName: name, googleId: decoded.sub });
      await user.save();
    }

    const userToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token: userToken, user });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Google login failed" });
  }
};

// Email/Password Login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, displayName: user.displayName },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ success: true, token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Signup with Email/Password
export const signup = async (req, res) => {
  const { email, password, displayName } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      displayName,
    });

    await newUser.save();

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Edit User Details
export const editUser = async (req, res) => {
  const { id } = req.params;
  const { displayName, about, hobbies, profileImage } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.displayName = displayName || user.displayName;
    user.about = about || user.about;
    user.hobbies = hobbies || user.hobbies;
    user.profileImage = profileImage || user.profileImage;
    await user.save();

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Edit user error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Follow a user
export const followUser = async (req, res) => {
  const userIdToFollow = req.params.id;
  const currentUserId = req.user._id;

  try {
    const userToFollow = await User.findById(userIdToFollow);
    const currentUser = await User.findById(currentUserId);

    if (!userToFollow) {
      return res.status(404).json({ message: "User not found" });
    }

    const alreadyFollowing = currentUser.following.includes(userIdToFollow);

    if (alreadyFollowing) {
      currentUser.following.pull(userIdToFollow);
      userToFollow.followers.pull(currentUserId);
    } else {
      currentUser.following.push(userIdToFollow);
      userToFollow.followers.push(currentUserId);
    }

    await currentUser.save();
    await userToFollow.save();

    res.status(200).json({ success: true, isFollowing: !alreadyFollowing });
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
