// index.js
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import imageRoutes from "./routes/image.routes.js";

dotenv.config();

const app = express();

// Helper to resolve __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
connectDB(); // Call your connectDB function once

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files for images
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded images

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/images", imageRoutes);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
