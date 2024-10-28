function checkLeapYear() {
  const year = parseInt(prompt('Please enter a year'));

  if (year % 4 === 0) {
    alert('It is a leap year');
    return;
  }
  alert('It is not a leap year');
}