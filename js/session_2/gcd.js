function getGCD() {
  const a = parseInt(prompt('Enter a:')),
    b = parseInt(prompt('Enter b:')),
    c = parseInt(prompt('Enter c:')),
    d = parseInt(prompt('Enter d:'));

  if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) {
    alert('Invalid input');
    return;
  }

  const list = [a, b, c, d];
  while (list.length > 1) {
    const newNum = gcd(list[0], list[1]);
    list.shift();
    list.shift();
    list.unshift(newNum);
  }
  alert(`GCD of ${a}, ${b}, ${c}, ${d}: ${list[0]}`);
}

function gcd(a, b) {
  let larger = a > b ? a : b, smaller = a > b ? b : a;

  let remainder = -1;
  while (remainder !== 0) {
    remainder = larger % smaller;
    [larger, smaller] = [smaller, remainder];
  }
  return larger;
}