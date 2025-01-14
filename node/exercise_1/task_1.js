const fs = require('node:fs');

console.log(fs.readFileSync(
  './txt/read-this.txt',
  { encoding: 'utf8' },
));
const input = fs.readFileSync(
  './txt/input.txt',
  { encoding: 'utf8' },
);
const append = fs.readFileSync(
  './txt/append.txt',
  { encoding: 'utf8' },
);

console.log(input);
console.log(append);

fs.writeFileSync(
  './txt/final.txt',
  `${input}\n${append}`,
);
