const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'd:/Portfolio/design/summohith-portfolio/frontend/public/works/photo-editing';
const outputDir = 'd:/Portfolio/design/summohith-portfolio/frontend/public/works/photo-editing/webp';

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const files = fs.readdirSync(inputDir);

async function convert() {
    for (const file of files) {
        if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.jpeg')) {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, file.replace(/\.(jpg|jpeg)$/i, '.webp'));
            
            console.log(`Converting ${file}...`);
            try {
                await sharp(inputPath)
                    .webp({ quality: 80 }) // 80 is a good balance of quality and size
                    .toFile(outputPath);
                console.log(`✅ Converted ${file}`);
            } catch (err) {
                console.error(`❌ Error converting ${file}:`, err);
            }
        }
    }
    console.log('--- ALL CONVERSIONS DONE ---');
}

convert();
