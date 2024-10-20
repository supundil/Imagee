//models/ImageeUser.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
    },
    displayName: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
      default: null,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    likedImages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ImageeUser",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ImageeUser",
      },
    ],
    about: { type: String, default: null },
    hobbies: { type: [String], default: [] },
  },
  { timestamps: true }
);

const User = mongoose.model("ImageeUser", userSchema);
export default User;
