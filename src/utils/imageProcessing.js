const MAX_EDGE = 1800;
const JPEG_QUALITY = 0.84;

function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Das Bild konnte nicht gelesen werden."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("Das Bildformat wird nicht unterstützt."));
      image.onload = () => resolve(image);
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
export async function prepareImageForLocalStorage(file) {
  if (!file?.type?.startsWith("image/")) {
    throw new Error("Bitte wähle eine Bilddatei aus.");
  }

  if (file.size > 25 * 1024 * 1024) {
    throw new Error("Das Bild ist größer als 25 MB.");
  }

  const image = await readImage(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(image.naturalWidth, image.naturalHeight));
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d", { alpha: false });

  canvas.width = width;
  canvas.height = height;
  context.fillStyle = "#120905";
  context.fillRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);

  // Canvas-Neukodierung entfernt EXIF-Daten einschließlich möglicher GPS-Daten.
  return canvas.toDataURL("image/jpeg", JPEG_QUALITY);
}
