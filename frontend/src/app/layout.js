import "../styles/globals.css";

export const metadata = {
  title: "Photo Gallery",
  description: "Upload and preview photos with paper length calculation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
