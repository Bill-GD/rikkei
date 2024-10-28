function solveLinearEquation() {
  const a = parseFloat(prompt('Solving ax + b = 0\nEnter a:')),
    b = parseFloat(prompt('Solving ax + b = 0\nEnter b:'));

  if (isNaN(a) || isNaN(b)) {
    alert('Invalid input');
    return;
  }

  alert(`${a}x + ${b} = 0\n -> x=${getLinearResult(a, b)}`);
}

function getLinearResult(a, b) {
  // ax + b = 0
  let res = -b;
  if (a !== 0) res /= a;
  return res;
}

function solveQuadEquation() {
  const a = parseFloat(prompt('Solving ax^2 + bx + c = 0\nEnter a:')),
    b = parseFloat(prompt('Solving ax^2 + bx + c = 0\nEnter b:')),
    c = parseFloat(prompt('Solving ax^2 + bx + c = 0\nEnter c:'));

  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    alert('Invalid input');
    return;
  }

  const res = getQuadResult(a, b, c);
  if (res === false) {
    alert('No solution');
    return;
  }
  alert(`${a}x^2 + ${b}x + ${c} = 0\n${res.join('\n')}`);
}

function getQuadResult(a, b, c) {
  if (a === 0) return [` -> x = ${getLinearResult(b, c)}`];

  const delta = b ^ 2 - (4 * a * c);
  if (delta < 0) {
    return false;
  }
  if (delta === 0) {
    return [` -> x = ${-b / 2 / a}`];
  }
  return [
    ` -> x1 = ${(-b - Math.sqrt(delta)) / 2 / a}`,
    ` -> x2 = ${(-b + Math.sqrt(delta)) / 2 / a}`,
  ];
}