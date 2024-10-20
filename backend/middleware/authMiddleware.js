// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/ImageeUser.js";

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    console.log("Authorization header missing");
    return res.status(401).json({ message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded user:", decoded);

    const user = await User.findById(decoded.id);
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Invalid or expired token", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authenticateJWT;
