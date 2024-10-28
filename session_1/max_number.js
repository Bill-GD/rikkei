function findMax() {
  const a = parseInt(prompt('Enter a:')),
    b = parseInt(prompt('Enter b:')),
    c = parseInt(prompt('Enter c:'));

  const max = a > b ? (a > c ? a : c) : (b > c ? b : c);
  console.log(`Số lớn nhất là - ${max}`);
  alert(`Số lớn nhất là - ${max}`);
}