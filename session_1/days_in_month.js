function getDaysInMonth() {
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

  const monthInput = parseInt(prompt('Enter month:'));
  if (isNaN(monthInput)) {
    alert('Invalid month');
  } else {
    alert(`Days: ${days_in_month[monthInput]}`);
  }
}