const path = require('path');
const { mkdir, readdir, copyFile, constants, rm } = require('fs');

const copyPath = path.join(__dirname, 'files-copy');

try {
  rm(copyPath, { recursive: true }, () => copy());
} 
// eslint-disable-next-line no-empty
catch {}

const copy = () => {

  mkdir(copyPath, { recursive: true }, () => {
    readdir(path.join(__dirname, 'files'), (_, files) => {
      for (const file of files) {
        copyFile(
          path.join(__dirname, 'files', file),
          path.join(copyPath, file),
          constants.COPYFILE_FICLONE,
          () => {}
        );
      }
    });
  });
};