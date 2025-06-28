"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [rollLength, setRollLength] = useState(null);

  const fetchPhotos = async () => {
    const res = await axios.get(`${API_BASE_URL}/api/photos`);
    setPhotos(res.data);

    const lenRes = await axios.get(`${API_BASE_URL}/api/photos/paper-length`);
    setRollLength(lenRes.data.totalLengthCm);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">🖼️ Galerija</h2>
      {rollLength && (
        <p className="mb-6 text-gray-600">
          📏 Dužina rolne potrebna za štampu:{" "}
          <span className="font-bold">{rollLength} cm</span>
        </p>
      )}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {photos.map((photo) => (
          <div
            key={photo._id}
            className="rounded overflow-hidden shadow-md bg-white"
          >
            <img
              src={photo.url}
              alt={photo.filename}
              className="w-full h-60 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
