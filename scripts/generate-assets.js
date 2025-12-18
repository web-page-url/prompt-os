
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE_IMAGE = path.join(__dirname, '../public/final-img.png');
const PUBLIC_DIR = path.join(__dirname, '../public');

if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR);
}

const SIZES = [
    { name: 'favicon-16x16.png', width: 16, height: 16 },
    { name: 'favicon-32x32.png', width: 32, height: 32 },
    { name: 'apple-touch-icon.png', width: 180, height: 180 },
    { name: 'android-chrome-144x144.png', width: 144, height: 144 },
    { name: 'android-chrome-192x192.png', width: 192, height: 192 },
    { name: 'android-chrome-256x256.png', width: 256, height: 256 },
    { name: 'android-chrome-384x384.png', width: 384, height: 384 },
    { name: 'android-chrome-512x512.png', width: 512, height: 512 },
    { name: 'apple-touch-icon-152x152.png', width: 152, height: 152 },
    { name: 'og-image.jpg', width: 1200, height: 630, fit: 'cover' }
];

async function generateImages() {
    console.log(`Processing image from: ${SOURCE_IMAGE}`);

    if (!fs.existsSync(SOURCE_IMAGE)) {
        console.error('Source image not found!');
        process.exit(1);
    }

    for (const size of SIZES) {
        try {
            const outputPath = path.join(PUBLIC_DIR, size.name);
            console.log(`Generating ${size.name}...`);

            let pipeline = sharp(SOURCE_IMAGE);

            if (size.name.endsWith('.jpg')) {
                pipeline = pipeline.resize(size.width, size.height, {
                    fit: 'cover',
                    position: 'center'
                })
                    .jpeg({ quality: 75, mozjpeg: true }); // MozJPEG is highly efficient, 75 quality usually <100KB
            } else {
                pipeline = pipeline.resize(size.width, size.height);
            }

            await pipeline.toFile(outputPath);
            console.log(`Saved to ${outputPath}`);
        } catch (error) {
            console.error(`Error generating ${size.name}:`, error);
        }
    }

    // Also copy the original to public just in case
    // fs.copyFileSync(SOURCE_IMAGE, path.join(PUBLIC_DIR, 'prompt-os-original.png'));
}

generateImages();
