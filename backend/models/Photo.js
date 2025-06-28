import mongoose from "mongoose";

const photoSchema = new mongoose.Schema({
  filename: String,
  url: String,
  width: Number,
  height: Number,
  hash: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Photo", photoSchema);
