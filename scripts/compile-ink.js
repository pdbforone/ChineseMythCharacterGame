/**
 * Ink Compilation Script
 *
 * Compiles .ink files to .ink.json for use with inkjs in the browser.
 * Uses inkjs's built-in compiler instead of external inklecate.
 *
 * Usage: node scripts/compile-ink.js
 */

const { Compiler } = require('inkjs/full');
const { glob } = require('glob');
const fs = require('fs');
const path = require('path');

async function compileInkFiles() {
  console.log('🖋️  Compiling Ink stories with inkjs...\n');

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
      // Read the ink source
      const inkSource = fs.readFileSync(inkFile, 'utf-8');

      // Compile using inkjs
      const compiler = new Compiler(inkSource);
      const story = compiler.Compile();

      // Check for errors
      if (compiler.errors && compiler.errors.length > 0) {
        throw new Error(compiler.errors.join('\n'));
      }

      // Export to JSON
      const jsonOutput = story.ToJson();

      // Write the compiled JSON
      fs.writeFileSync(outputFile, jsonOutput);

      console.log(`  ✓ ${relativePath} → ${path.basename(outputFile)}`);
      compiled++;
    } catch (error) {
      console.error(`  ✗ ${relativePath}`);
      console.error(`    Error: ${error.message}`);
      errors++;
    }
  }

  console.log(`\n📚 Compiled: ${compiled}, Errors: ${errors}\n`);
}

// Run
compileInkFiles().catch(console.error);
