import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Script para crear versiones WebP de las imágenes PNG
// Este script genera archivos .webp optimizados desde PNG usando sharp

const sharp = require('sharp');

const imgDir = path.join(__dirname, '../public/img');
const outputDir = imgDir;

async function convertToWebP() {
  console.log('🖼️  Convirtiendo imágenes a WebP...\n');

  const files = fs.readdirSync(imgDir).filter(f => f.endsWith('.png'));

  if (files.length === 0) {
    console.log('❌ No se encontraron archivos PNG');
    return;
  }

  let totalSaved = 0;

  for (const file of files) {
    const inputPath = path.join(imgDir, file);
    const outputPath = path.join(outputDir, file.replace('.png', '.webp'));
    
    const originalSize = fs.statSync(inputPath).size;

    try {
      await sharp(inputPath)
        .webp({ quality: 82, effort: 6 })
        .toFile(outputPath);

      const newSize = fs.statSync(outputPath).size;
      const saved = originalSize - newSize;
      const savedPercent = ((saved / originalSize) * 100).toFixed(1);
      
      totalSaved += saved;

      console.log(`✅ ${file}`);
      console.log(`   Original: ${(originalSize / 1024).toFixed(1)} KB`);
      console.log(`   WebP: ${(newSize / 1024).toFixed(1)} KB`);
      console.log(`   Ahorro: ${(saved / 1024).toFixed(1)} KB (${savedPercent}%)\n`);
    } catch (error) {
      console.error(`❌ Error con ${file}:`, error.message);
    }
  }

  console.log(`\n📊 Total ahorrado: ${(totalSaved / 1024).toFixed(1)} KB`);
}

convertToWebP().catch(console.error);
