function calcEquation() {
  // S= 1+1/23+1/33+...+1/n3
  const num = parseInt(prompt('Enter a number'));
  if (isNaN(num)) {
    alert('Invalid input');
    return;
  }

  let res = 1;
  for (let i = 2; i <= num; i++) {
    res += 1 / (i ** 3);
  }
  alert(`1+1/23+1/33+...+1/n3 = ${res.toFixed(5)}`);
}