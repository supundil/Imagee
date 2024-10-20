// models/image.model.js
import mongoose from "mongoose"; // Import mongoose using ES module syntax

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ImageeUser",
      required: true,
    },
  },
  { timestamps: true }
);

const imageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    link: { type: String },
    tags: { type: [String] },
    allowComments: { type: Boolean, default: true },
    imagePath: { type: String, required: true },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ImageeUser",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "ImageeUser" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "ImageeUser" }],
    comments: [
      {
        text: String,
        user: { type: mongoose.Schema.Types.ObjectId, ref: "ImageeUser" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Image = mongoose.model("Image", imageSchema);
export default Image; // Use export default
