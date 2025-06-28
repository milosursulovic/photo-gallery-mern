"use client";

import { useState } from "react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function UploadForm({ onUploadComplete }) {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState({});
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
    setError(null);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append("photo", file);

    return axios.post(`${API_BASE_URL}/api/photos/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (event) => {
        setProgress((prev) => ({
          ...prev,
          [file.name]: Math.round((event.loaded * 100) / event.total),
        }));
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress({});
    setError(null);

    try {
      const results = await Promise.all(
        files.map((file) =>
          uploadFile(file).catch((err) => {
            console.error(file.name, "failed");
            return { error: true, file };
          })
        )
      );
      const successful = results.filter((r) => !r.error);
      if (successful.length > 0) {
        onUploadComplete();
      }
    } catch (err) {
      setError("❌ Došlo je do greške prilikom slanja fajlova.");
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-12">
      <h2 className="text-2xl font-semibold mb-4">📤 Dodaj fotografije</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full border border-gray-300 rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          disabled={files.length === 0}
        >
          Pošalji
        </button>
      </form>

      {Object.keys(progress).map((filename) => (
        <div key={filename} className="mt-4">
          <div className="text-sm mb-1">{filename}</div>
          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-blue-600 h-2 rounded transition-all"
              style={{ width: `${progress[filename]}%` }}
            ></div>
          </div>
        </div>
      ))}

      {error && (
        <div className="mt-4 bg-red-100 text-red-800 px-4 py-2 rounded">
          {error}
        </div>
      )}
    </div>
  );
}
