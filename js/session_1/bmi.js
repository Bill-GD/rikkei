function getBMI() {
  const weight = parseFloat(prompt('Enter weight:')),
    height = parseFloat(prompt('Enter height:'));

  const bmi = (weight / (height ** 2)).toFixed(2);
  if (bmi <= 0) {
    alert(`Invalid values`);
  } else if (bmi < 18.5) {
    alert(`Type: Underweight (${bmi})`);
  } else if (bmi < 25) {
    alert(`Type: Healthy (${bmi})`);
  } else if (bmi < 30) {
    alert(`Type: Overweight (${bmi})`);
  } else if (bmi < 35) {
    alert(`Type: Class 1 Obesity (${bmi})`);
  } else if (bmi < 40) {
    alert(`Type: Class 2 Obesity (${bmi})`);
  } else {
    alert(`Type: Class 3 Obesity (${bmi})`);
  }
}