const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir  = path.join(__dirname, '../frontend/public/works/photo-editing');
const outputDir = path.join(__dirname, '../frontend/public/optimized-works');

if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.webp') || f.endsWith('.jpg') || f.endsWith('.jpeg'));

async function compressAll() {
  console.log(`🚀 Starting compression of ${files.length} images...`);
  
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file.replace(/\.(jpg|jpeg|webp)$/, '.webp'));
    
    try {
      await sharp(inputPath)
        .resize(1920, null, { withoutEnlargement: true }) // Downscale to 4K max
        .webp({ quality: 80, effort: 6 }) // Aggressive compression
        .toFile(outputPath);
      
      const oldSize = (fs.statSync(inputPath).size / (1024 * 1024)).toFixed(2);
      const newSize = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);
      console.log(`✅ ${file}: ${oldSize}MB -> ${newSize}MB`);
    } catch (err) {
      console.error(`❌ Failed ${file}:`, err.message);
    }
  }
  
  console.log('\n✨ ALL DONE! Now move the files from "optimized-works" back to its place.');
}

compressAll();
