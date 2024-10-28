function reverseNum() {
  const num = prompt('Enter a number');
  if (isNaN(parseInt(num))) {
    alert('Invalid input');
    return;
  }
  alert(`Reversed: ${num} -> ${num.split('').reverse().join('')}`);
}