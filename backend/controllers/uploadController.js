import crypto from "crypto";
import fs from "fs";
import sharp from "sharp";
import Photo from "../models/Photo.js";
import { uploadToGyazo } from "../services/gyazoService.js";
import { calculatePaperLength } from "../utils/calculatePaperLength.js";

const hashFile = (filePath) => {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash("sha256").update(fileBuffer).digest("hex");
};

export async function uploadPhoto(req, res) {
  try {
    const file = req.file;
    const hash = hashFile(file.path);

    const existing = await Photo.findOne({ hash });
    if (existing) {
      fs.unlinkSync(file.path);
      return res.status(400).json({ error: "Duplicate file" });
    }

    const image = sharp(file.path);
    const metadata = await image.metadata();

    const gyazoResponse = await uploadToGyazo(file.path);
    fs.unlinkSync(file.path);

    const photo = new Photo({
      filename: file.originalname,
      url: gyazoResponse.url,
      width: metadata.width,
      height: metadata.height,
      hash,
    });

    await photo.save();
    res.status(201).json(photo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

export async function getGallery(req, res) {
  const photos = await Photo.find().sort({ uploadedAt: -1 });
  res.json(photos);
}

export async function getPaperLength(req, res) {
  const photos = await Photo.find();
  const length = calculatePaperLength(photos);
  res.json({ totalLengthCm: length });
}
