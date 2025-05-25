import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const iconsDir = path.join(__dirname, '../public/icons');
const logoPath = path.join(__dirname, '../public/your-logo.png'); // Place your logo here

// Function to copy your logo to the icon files
async function updateIcons() {
  try {
    // Check if the logo file exists
    if (!fs.existsSync(logoPath)) {
      console.error('Logo file not found at:', logoPath);
      console.log('Please place your logo file at public/your-logo.png');
      return;
    }

    // Read the logo file
    const logoData = fs.readFileSync(logoPath);
    
    // Copy to maskable icons
    fs.writeFileSync(path.join(iconsDir, 'maskable-192.png'), logoData);
    fs.writeFileSync(path.join(iconsDir, 'maskable-512.png'), logoData);
    
    // Copy to regular icons
    fs.writeFileSync(path.join(iconsDir, 'favicon-192.png'), logoData);
    fs.writeFileSync(path.join(iconsDir, 'favicon-512.png'), logoData);
    
    // Copy to favicon.ico
    fs.writeFileSync(path.join(iconsDir, 'favicon.ico'), logoData);
    
    console.log('All icons updated with your logo!');
    console.log('Note: For best results, your logo should be at least 512x512 pixels and square.');
  } catch (error) {
    console.error('Error updating icons:', error);
  }
}

// Run the update
updateIcons();
