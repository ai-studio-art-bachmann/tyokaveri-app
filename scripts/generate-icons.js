import fs from 'fs';
import path from 'path';
import { createCanvas } from 'canvas';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Function to generate an icon
function generateIcon(filename, size, color, maskable = false) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = '#ea580c'; // Orange background matching theme color
  ctx.fillRect(0, 0, size, size);

  // If maskable, leave some padding
  const padding = maskable ? size * 0.1 : 0;
  const innerSize = size - (padding * 2);

  // Draw a stylized "T" for Työkalu
  ctx.fillStyle = '#ffffff'; // White text
  ctx.font = `bold ${innerSize * 0.7}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('T', size / 2, size / 2);

  // Save the icon
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(iconsDir, filename), buffer);
  console.log(`Generated ${filename}`);
}

// Generate regular icons
generateIcon('favicon-192.png', 192, '#ea580c');
generateIcon('favicon-512.png', 512, '#ea580c');

// Generate maskable icons (with safe area)
generateIcon('maskable-192.png', 192, '#ea580c', true);
generateIcon('maskable-512.png', 512, '#ea580c', true);

// Generate favicon.ico (using the 192px version)
fs.copyFileSync(
  path.join(iconsDir, 'favicon-192.png'), 
  path.join(iconsDir, 'favicon.ico')
);
console.log('Generated favicon.ico');

console.log('All icons generated successfully!');
