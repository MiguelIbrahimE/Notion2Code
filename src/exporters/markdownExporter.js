// exporters/markdownExporter.js
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

function moveMarkdownExport(sourceFolder, destinationFolder, openInVSCode = false) {
  if (!fs.existsSync(sourceFolder)) {
    throw new Error('Source folder does not exist.');
  }

  fs.readdirSync(sourceFolder).forEach(file => {
    const srcPath = path.join(sourceFolder, file);
    const destPath = path.join(destinationFolder, file);

    if (fs.statSync(srcPath).isDirectory()) {
      // Recursively copy folders (like "media")
      fs.mkdirSync(destPath, { recursive: true });
      fs.cpSync(srcPath, destPath, { recursive: true });
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });

  if (openInVSCode) {
    exec(`code "${destinationFolder}"`);
  }

  return true;
}

module.exports = {
  moveMarkdownExport
};
