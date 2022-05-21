const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'text.txt');

const s = fs.createReadStream(file);

s.on('data', (chunk) => {
  console.log(String(chunk));
});