import axios from "axios";
import fs from "fs";
import FormData from "form-data";

export async function uploadToGyazo(localFilePath) {
  const form = new FormData();
  form.append("imagedata", fs.createReadStream(localFilePath));
  form.append("access_token", process.env.GYAZO_ACCESS_TOKEN);

  const response = await axios.post(
    "https://upload.gyazo.com/api/upload",
    form,
    {
      headers: form.getHeaders(),
    }
  );

  return response.data;
}
