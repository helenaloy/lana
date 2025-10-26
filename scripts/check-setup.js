#!/usr/bin/env node

/**
 * Setup checker script
 * Verifies that all required configuration is in place
 */

const fs = require('fs');
const path = require('path');

const checks = {
  passed: [],
  failed: [],
  warnings: [],
};

function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    checks.passed.push(`✅ ${description}`);
    return true;
  } else {
    checks.failed.push(`❌ ${description} (${filePath} not found)`);
    return false;
  }
}

function checkEnvFile() {
  const envPath = path.join(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) {
    checks.failed.push('❌ .env.local file not found. Run: cp .env.example .env.local');
    return false;
  }

  const envContent = fs.readFileSync(envPath, 'utf8');
  const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'INQUIRY_TO'];
  let allPresent = true;

  requiredVars.forEach((varName) => {
    if (!envContent.includes(`${varName}=`)) {
      checks.failed.push(`❌ Missing environment variable: ${varName}`);
      allPresent = false;
    } else if (envContent.includes(`${varName}=your-`)) {
      checks.warnings.push(
        `⚠️  ${varName} appears to have placeholder value. Update with real credentials.`
      );
    }
  });

  if (allPresent) {
    checks.passed.push('✅ .env.local file exists with required variables');
  }
  return allPresent;
}

function checkGalleryImages() {
  const galleryPath = path.join(process.cwd(), 'public', 'images', 'gallery');
  const galleryJsonPath = path.join(process.cwd(), 'content', 'gallery.json');

  if (!fs.existsSync(galleryJsonPath)) {
    checks.failed.push('❌ content/gallery.json not found');
    return;
  }

  const galleryData = JSON.parse(fs.readFileSync(galleryJsonPath, 'utf8'));
  let missingImages = 0;

  galleryData.forEach((image) => {
    const imagePath = path.join(process.cwd(), 'public', image.src);
    if (!fs.existsSync(imagePath)) {
      missingImages++;
    }
  });

  if (missingImages === 0) {
    checks.passed.push('✅ All gallery images exist');
  } else {
    checks.warnings.push(
      `⚠️  ${missingImages} gallery images missing. Add images to public/images/gallery/`
    );
  }
}

console.log('\n🔍 Checking Mobile Home Lana setup...\n');

// Check essential files
checkFile('package.json', 'package.json exists');
checkFile('next.config.mjs', 'Next.js config exists');
checkFile('tailwind.config.ts', 'Tailwind config exists');
checkFile('tsconfig.json', 'TypeScript config exists');

// Check content files
checkFile('content/site.json', 'Site content file exists');
checkFile('content/gallery.json', 'Gallery content file exists');
checkFile('content/availability.json', 'Availability content file exists');
checkFile('content/meta.json', 'Meta content file exists');

// Check message files
checkFile('messages/hr.json', 'Croatian translations exist');
checkFile('messages/en.json', 'English translations exist');

// Check environment
checkEnvFile();

// Check gallery images
checkGalleryImages();

// Print results
console.log('\n📊 Results:\n');

if (checks.passed.length > 0) {
  console.log('Passed checks:');
  checks.passed.forEach((check) => console.log(`  ${check}`));
  console.log('');
}

if (checks.warnings.length > 0) {
  console.log('Warnings:');
  checks.warnings.forEach((warning) => console.log(`  ${warning}`));
  console.log('');
}

if (checks.failed.length > 0) {
  console.log('Failed checks:');
  checks.failed.forEach((fail) => console.log(`  ${fail}`));
  console.log('');
  console.log('❌ Setup incomplete. Please fix the issues above.\n');
  process.exit(1);
} else if (checks.warnings.length > 0) {
  console.log('⚠️  Setup complete with warnings. Review warnings above.\n');
} else {
  console.log('✅ All checks passed! You\'re ready to run: pnpm dev\n');
}

