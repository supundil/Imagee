//controllers/image.controller.js
import mongoose from "mongoose";
import Image from "../models/image.model.js";
import User from "../models/ImageeUser.js";

// Upload image
export const uploadImage = async (req, res) => {
  try {
    const { title, description, link, tags, allowComments } = req.body;
    const uploadedBy = req.user.id;

    if (!req.file) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const imagePath = `uploads/${req.file.filename}`;

    const newImage = new Image({
      title,
      description,
      link,
      tags: JSON.parse(tags),
      allowComments,
      imagePath,
      uploadedBy,
    });

    await newImage.save();

    return res.status(201).json({
      message: "Image uploaded successfully",
      image: newImage,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};

// Get all images
export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find().populate("uploadedBy", "displayName");
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching all images:", error);
    res.status(500).json({ message: "Error fetching images", error });
  }
};

// Get image by ID
export const getImageById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid image ID format" });
    }

    const image = await Image.findById(id)
      .populate("uploadedBy", "displayName")
      .populate({
        path: "comments.user",
        select: "displayName",
      });
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json(image);
  } catch (error) {
    console.error("Error fetching image by ID:", error);
    res.status(500).json({ message: "Error fetching image", error });
  }
};

// Handle liking an image
export const likeImage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid image ID format" });
    }

    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    if (image.likes.includes(userId)) {
      image.likes = image.likes.filter((like) => like.toString() !== userId);
    } else {
      image.likes.push(userId);
    }

    await image.save();
    res.status(200).json({ likes: image.likes.length });
  } catch (error) {
    console.error("Error liking image:", error);
    res.status(500).json({ message: "Error liking image", error });
  }
};

// Handle adding a comment
export const addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const userId = req.user.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid image ID format" });
    }

    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    image.comments.push({
      text: comment,
      user: userId,
      displayName: user.displayName,
    });
    await image.save();

    const populatedImage = await Image.findById(id).populate(
      "comments.user",
      "displayName"
    );
    res
      .status(201)
      .json({ message: "Comment added", comments: populatedImage.comments });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error adding comment", error });
  }
};

// Delete image
export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid image ID format" });
    }

    const deletedImage = await Image.findByIdAndDelete(id);
    if (!deletedImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Error deleting image", error });
  }
};

// Get images uploaded by the logged-in user
export const getImagesByUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const images = await Image.find({ uploadedBy: userId });
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching images by user:", error);
    res.status(500).json({ message: "Server error." });
  }
};
