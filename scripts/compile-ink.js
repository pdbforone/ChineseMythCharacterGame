/**
 * Ink Compilation Script
 *
 * Compiles .ink files to .ink.json for use with inkjs in the browser.
 *
 * Usage: node scripts/compile-ink.js
 *
 * Requires: inklecate (npm install inklecate)
 */

const { execSync } = require('child_process');
const { glob } = require('glob');
const fs = require('fs');
const path = require('path');

async function compileInkFiles() {
  console.log('🖋️  Compiling Ink stories...\n');

  // Find all .ink files
  const inkFiles = await glob('src/ink/**/*.ink');

  if (inkFiles.length === 0) {
    console.log('No .ink files found.');
    return;
  }

  let compiled = 0;
  let errors = 0;

  for (const inkFile of inkFiles) {
    const outputFile = inkFile + '.json';
    const relativePath = path.relative(process.cwd(), inkFile);

    try {
      // Use inklecate to compile
      execSync(`npx inklecate -o "${outputFile}" "${inkFile}"`, {
        stdio: 'pipe',
      });

      console.log(`  ✓ ${relativePath} → ${path.basename(outputFile)}`);
      compiled++;
    } catch (error) {
      console.error(`  ✗ ${relativePath}`);
      console.error(`    Error: ${error.message}`);
      errors++;
    }
  }

  console.log(`\n📚 Compiled ${compiled} file(s), ${errors} error(s)\n`);
}

// Run
compileInkFiles().catch(console.error);
