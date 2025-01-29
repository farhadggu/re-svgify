#!/usr/bin/env node
const path = require("path");
const { exec } = require("child_process");

// Paths
const projectRoot = process.cwd(); // Root of the project where re-svg is installed
const iconsFolder = path.join(projectRoot, "_icons"); // Look for _icons folder
const componentsFolder = path.join(projectRoot, "components", "icons"); // Output folder
const gulpfilePath = path.join(__dirname, "../scripts/gulpfile.cjs"); // Path to Gulpfile

// Check if _icons folder exists
if (!require("fs").existsSync(iconsFolder)) {
  console.error("Error: _icons folder not found in the root of the project.");
  process.exit(1);
}

// Run the Gulp task
exec(
  `npx gulp --gulpfile ${gulpfilePath} --iconsFolder ${iconsFolder} --componentsFolder ${componentsFolder}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    console.log(stdout);
  }
);
