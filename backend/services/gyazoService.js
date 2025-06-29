import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import dontenv from "dotenv";

dontenv.config();

export async function uploadToGyazo(localFilePath) {
  const form = new FormData();
  form.append("imagedata", fs.createReadStream(localFilePath));
  form.append("access_token", process.env.GYAZO_ACCESS_TOKEN);

  const response = await axios.post(process.env.GYAZO_ENDPOINT, form, {
    headers: form.getHeaders(),
  });

  return response.data;
}
