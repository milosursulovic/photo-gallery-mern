import express from "express";
import multer from "multer";
import {
  uploadPhoto,
  getGallery,
  getPaperLength,
} from "../controllers/uploadController.js";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/upload", upload.single("photo"), uploadPhoto);
router.get("/", getGallery);
router.get("/paper-length", getPaperLength);

export default router;
