const path = require('path');
const fs = require('fs');

const stylesDir = path.join(__dirname, 'styles');
const bundleFile = path.join(__dirname, 'project-dist', 'bundle.css');

fs.unlink(bundleFile, () => {
  fs.readdir(stylesDir, (_, files) => {
    for (const file of files) {
      addFileToBunde(file);
    }
  });
});

const addFileToBunde = (file) => {
  if (path.extname(file) !== '.css') return;

  fs.readFile(path.join(stylesDir, file), (_, data) => {
    fs.appendFile(bundleFile, data, () => {});
  });
};
