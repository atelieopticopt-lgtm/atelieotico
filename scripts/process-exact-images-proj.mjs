import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const pDir = path.resolve(process.cwd(), 'public/partners');

async function processLogo(filename, outFilename) {
  const inputPath = path.join(pDir, filename);
  if (!fs.existsSync(inputPath)) {
    console.error('File not found:', inputPath);
    return;
  }

  const image = sharp(inputPath);
  const metadata = await image.metadata();
  console.log(`Processing ${filename} (${metadata.width}x${metadata.height})...`);

  // Get raw RGBA buffer
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;

  let minX = width, minY = height, maxX = 0, maxY = 0;

  // Make white background transparent and find bounding box of dark pixels
  const processedData = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      
      // Calculate grayscale brightness
      const brightness = 0.299 * r + 0.587 * g + 0.114 * b;

      if (brightness < 240) { // Dark / text pixel
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;

        // Smooth anti-aliased transparency
        const alpha = Math.min(255, Math.max(0, Math.round((255 - brightness) * (255 / (255 - 30)))));
        processedData[idx] = 0;     // Pure black text
        processedData[idx + 1] = 0;
        processedData[idx + 2] = 0;
        processedData[idx + 3] = alpha;
      } else {
        // Pure transparent background
        processedData[idx] = 0;
        processedData[idx + 1] = 0;
        processedData[idx + 2] = 0;
        processedData[idx + 3] = 0;
      }
    }
  }

  console.log(`Bounding Box for ${filename}: [${minX}, ${minY}] to [${maxX}, ${maxY}], Dimensions: ${maxX - minX + 1}x${maxY - minY + 1}`);

  // Add slight padding around cropped box
  const pad = 12;
  const cropX = Math.max(0, minX - pad);
  const cropY = Math.max(0, minY - pad);
  const cropWidth = Math.min(width - cropX, (maxX - minX + 1) + pad * 2);
  const cropHeight = Math.min(height - cropY, (maxY - minY + 1) + pad * 2);

  const croppedBuffer = await sharp(processedData, {
    raw: {
      width,
      height,
      channels: 4
    }
  })
  .extract({ left: cropX, top: cropY, width: cropWidth, height: cropHeight })
  .png({ compressionLevel: 9 })
  .toBuffer();

  const outPath = path.join(pDir, outFilename);
  fs.writeFileSync(outPath, croppedBuffer);
  console.log(`✅ Saved tight transparent PNG: ${outFilename} (${cropWidth}x${cropHeight})`);
}

async function run() {
  // 1. Calvin Klein Eyewear (from exact user image Calvin-Klein-Eyewear.jpeg)
  await processLogo('Calvin-Klein-Eyewear.jpeg', 'Calvin-Klein-Eyewear.png');
  await processLogo('Calvin-Klein-Eyewear.jpeg', 'Calvin_Klein_Eyewear.png');

  // 2. Maison Bensimon (from exact user image maison-bensimon.jpeg)
  await processLogo('maison-bensimon.jpeg', 'maison-bensimon.png');

  console.log('All exact brand images cropped to tight bounding boxes with 100% transparent backgrounds!');
}

run();
