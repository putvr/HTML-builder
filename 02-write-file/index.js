const fs = require('fs');
const path = require('path');
const readline = require('readline');
const process = require('process');

const msg = 'What is your favorite color? ';

const s = fs.createWriteStream(path.join(__dirname, 'text.txt'));

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: msg,
});

rl.prompt();

rl.on('line', (line) => {
  if (line.trim() === 'exit') {
    rl.close();
  } else {
    s.write(line + '\n');
    rl.prompt();
  }
});

rl.on('close', () => {
  rl.setPrompt('\nBye!\n');
  rl.prompt();

  s.end();
  s.close();

  process.exit(0);
});
