// middleware/multer.js
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Get the current directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, "../uploads"); // Use __dirname for the correct path

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set storage engine for uploaded images to disk
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Filter to only allow image files
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extname) {
    return cb(null, true);
  } else {
    return cb(new Error("Error: Images Only!"));
  }
};

// Multer setup with disk storage and file filter
const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB file size limit
  fileFilter: fileFilter,
});

export default upload;
