const fs = require('node:fs');

fs.readFile(
  './txt/read-this.txt',
  'utf8',
  (err, data) => {
    if (err) console.error(err);
    else console.log(data);
  },
);

let input;
fs.readFile(
  './txt/input.txt',
  { encoding: 'utf8' },
  (err, data) => {
    if (err) console.error(err);
    else {
      input = data;
      console.log(input);
    }
  },
);

let append;
fs.readFile(
  './txt/append.txt',
  { encoding: 'utf8' },
  (err, data) => {
    if (err) console.error(err);
    else {
      append = data;
      console.log(append);
    }
  },
);

// couldn't await so undefined is written instead
fs.writeFile(
  './txt/final.txt',
  `${input}\n${append}`,
  err => {
    if (err) console.error(err);
  },
);
