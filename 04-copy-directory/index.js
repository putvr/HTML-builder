const path = require('path');
const { mkdir, readdir, copyFile, constants } = require('fs');

mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, () => {
  readdir(path.join(__dirname, 'files'), (_, files) => {
    for (const file of files) {
      copyFile(
        path.join(__dirname, 'files', file),
        path.join(__dirname, 'files-copy', file),
        constants.COPYFILE_FICLONE,
        () => {}
      );
    }
  });
});
