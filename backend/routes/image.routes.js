import express from "express";
import authenticateJWT from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";
import Image from "../models/image.model.js";
import {
  uploadImage,
  getAllImages,
  getImageById,
  getImagesByUser,
  likeImage,
  addComment,
  deleteImage,
} from "../controllers/image.controller.js";

// Create a router instance
const router = express.Router();

// Define routes
router.post(
  "/upload",
  authenticateJWT,
  upload.single("imageData"),
  uploadImage
);
router.get("/", getAllImages);
router.get("/user-images", authenticateJWT, getImagesByUser);
router.get("/api/images/user-images/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const images = await Image.find({ userId });

    if (images.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: "Error fetching images" });
  }
});

router.get("/:id", getImageById);
router.delete("/:id", authenticateJWT, deleteImage);
router.put("/:id/like", authenticateJWT, likeImage);
router.post("/:id/comments", authenticateJWT, addComment);

// Export the router as default
export default router;
