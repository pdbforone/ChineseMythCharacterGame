/**
 * Ink Compilation Script
 *
 * Compiles .ink files to .ink.json for use with inkjs in the browser.
 *
 * Usage: node scripts/compile-ink.js
 *
 * Note: Requires inklecate CLI. If not available, pre-compiled JSON files
 * will be used. Download inklecate from: https://github.com/inkle/ink/releases
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
  let skipped = 0;
  let errors = 0;

  for (const inkFile of inkFiles) {
    const outputFile = inkFile + '.json';
    const relativePath = path.relative(process.cwd(), inkFile);

    // Check if JSON already exists and is newer than the .ink file
    if (fs.existsSync(outputFile)) {
      const inkStat = fs.statSync(inkFile);
      const jsonStat = fs.statSync(outputFile);

      if (jsonStat.mtime > inkStat.mtime) {
        console.log(`  ○ ${relativePath} (up to date)`);
        skipped++;
        continue;
      }
    }

    try {
      // Try using inklecate to compile
      execSync(`npx inklecate -o "${outputFile}" "${inkFile}"`, {
        stdio: 'pipe',
      });

      console.log(`  ✓ ${relativePath} → ${path.basename(outputFile)}`);
      compiled++;
    } catch (error) {
      // Check if pre-compiled JSON exists
      if (fs.existsSync(outputFile)) {
        console.log(`  ⚠ ${relativePath} (using existing JSON, inklecate not available)`);
        skipped++;
      } else {
        console.error(`  ✗ ${relativePath}`);
        console.error(`    Error: inklecate not found. Download from https://github.com/inkle/ink/releases`);
        errors++;
      }
    }
  }

  console.log(`\n📚 Compiled: ${compiled}, Skipped: ${skipped}, Errors: ${errors}\n`);

  if (errors > 0) {
    console.log('💡 Tip: Install inklecate CLI to compile new .ink files');
  }
}

// Run
compileInkFiles().catch(console.error);
