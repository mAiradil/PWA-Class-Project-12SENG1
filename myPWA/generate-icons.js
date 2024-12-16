const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Define icon sizes and output directory
const sizes = [192, 512];
const inputPath = path.join(__dirname, 'cheesepizza.jpg'); // Replace with your source image path
const outputDir = path.join(__dirname, 'public');

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate icons for each size
sizes.forEach(size => {
  const outputPath = path.join(outputDir, `icon-${size}x${size}.png`);
  sharp(inputPath)
    .resize(size, size)
    .toFile(outputPath)
    .then(() => console.log(`Generated ${outputPath}`))
    .catch(err => console.error(`Error generating ${outputPath}`, err));
});
