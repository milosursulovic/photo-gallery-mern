"use client";

import { useState } from "react";
import UploadForm from "../components/UploadForm";
import Gallery from "../components/Gallery";

export default function HomePage() {
  const [refreshGallery, setRefreshGallery] = useState(false);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-600">
        📸 Photo Gallery
      </h1>
      <UploadForm onUploadComplete={() => setRefreshGallery((prev) => !prev)} />
      <Gallery key={refreshGallery} />
    </main>
  );
}
