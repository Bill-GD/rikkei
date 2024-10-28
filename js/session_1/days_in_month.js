const days_in_month = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

function getDaysInMonth() {
  const month = parseInt(prompt('Enter month:'));
  if (isNaN(month)) {
    alert('Invalid month');
  } else {
    alert(`Days: ${days_in_month[month]}`);
  }
}

function getDaysInMonthOfYear() {
  const month = parseInt(prompt('Enter month (1-12):')),
    year = parseInt(prompt('Please enter a year'));

  if (month < 0 || month > 12 || isNaN(month) || isNaN(year)) {
    alert('Invalid input');
    return;
  }
  if (year % 4 === 0 && month === 2) {
    alert('Days: 29');
    return;
  }
  alert(`Days: ${days_in_month[month]}`);
}