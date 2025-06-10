const fs = require('fs');
const path = require('path');

const sourcePath = path.join(__dirname, 'public', 'static.json');
const destPath = path.join(__dirname, 'build', 'static.json');

fs.copyFile(sourcePath, destPath, (err) => {
  if (err) {
    console.error('❌ Failed to copy static.json:', err);
  } else {
    console.log('✅ static.json copied successfully after build!');
  }
});
