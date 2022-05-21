const { readdir, stat } = require('fs');

const path = require('path');

readdir(path.join(__dirname, 'secret-folder'), (_, files) => {
  for (const file of files) {
    const { name, ext } = path.parse(file);

    stat(path.join(__dirname, 'secret-folder', file), (_, stats) => {
      if (!stats.isFile()) return;

      const size = stats.size;
      console.log(`${name} - ${ext.slice(1)} - ${size}b`);
    });
  }
});
