function checkTriangle() {
  const a = parseInt(prompt('Enter a:')),
    b = parseInt(prompt('Enter b:')),
    c = parseInt(prompt('Enter c:'));

  if (a + b > c && a + c > b && b + c > a) {
    alert('Is a triangle');
  } else {
    alert('Is not a triangle');
  }
}