/**
 * Converts a data URL string to a File object.
 * @param dataUrl The data URL to convert.
 * @param filename The desired filename for the output File.
 * @returns A Promise that resolves to a File object.
 */
export async function dataUrlToFile(dataUrl: string, filename: string): Promise<File> {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type });
}

/**
 * Applies basic enhancement filters to an image provided as a data URL.
 * @param dataUrl The data URL of the image to enhance.
 * @returns A Promise that resolves to the data URL of the enhanced image.
 */
export function enhanceImage(dataUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error('Could not get canvas context'));
      }

      canvas.width = img.width;
      canvas.height = img.height;

      // Apply filters for enhancement. These can be tweaked.
      ctx.filter = 'contrast(115%) brightness(105%) saturate(110%)';
      
      ctx.drawImage(img, 0, 0);

      resolve(canvas.toDataURL('image/jpeg', 0.95)); // Use jpeg for better compression
    };
    img.onerror = (err) => {
      reject(err);
    };
    img.src = dataUrl;
  });
}
