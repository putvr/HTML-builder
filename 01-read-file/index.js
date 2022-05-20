const fs = require('fs');
const Path = require('path');

const file = Path.join(__dirname, 'text.txt');

const s = fs.createReadStream(file);

s.on('data', (chunk) => {
  console.log(String(chunk));
});