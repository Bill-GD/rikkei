function printDownRightTriangle() {
  const num = parseInt(prompt('Enter a number'));
  if (isNaN(num)) {
    alert('Invalid input');
    return;
  }

  const lines = [];
  for (let i = 0; i < num; i++) {
    let str = '';
    while (str.length < i) {
      str += ' ';
    }
    while (str.length < num) {
      str += '*';
    }
    lines.push(str);
  }
  console.log(lines.join('\n'));
  console.log(lines.map(l => l.split('').reverse().join('')).join('\n'));
}