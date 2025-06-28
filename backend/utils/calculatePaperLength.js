export function calculatePaperLength(photos) {
  const DPI = 250;
  const paperWidthCm = 60;
  const paperWidthInches = paperWidthCm / 2.54;
  const paperWidthPx = paperWidthInches * DPI;

  let totalHeightPx = 0;

  photos.forEach((photo) => {
    const scale = paperWidthPx / photo.width;
    totalHeightPx += photo.height * scale;
  });

  const totalHeightInches = totalHeightPx / DPI;
  const totalHeightCm = totalHeightInches * 2.54;

  return totalHeightCm.toFixed(2);
}
