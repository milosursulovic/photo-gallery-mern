import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import fs from "fs";
import https from "https";
import uploadRoutes from "./routes/uploadRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_APP_URL,
    credentials: true,
  })
);

app.use("/api/photos", uploadRoutes);

const PORT = process.env.PORT || 5000;

const httpsOptions = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH),
};

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    https
      .createServer(httpsOptions, app)
      .listen(PORT, () =>
        console.log(`HTTPS server running on https://localhost:${PORT}`)
      );
  })
  .catch((err) => console.error(err));
