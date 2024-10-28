const math = parseFloat(prompt('Enter math score: ')),
  lit = parseFloat(prompt('Enter literature score: ')),
  english = parseFloat(prompt('Enter english score: '));

if (isNaN(math) || isNaN(lit) || isNaN(english) || isNaN(english)) {
  alert('Entered score is not a number! Please enter again.');
} else if (math < 0 || math > 10 || lit < 0 | lit > 10 || english < 0 || english > 10) {
  alert('Entered score is not within bound! Please enter again.');
} else {
  const average = ((math + lit + english) / 3).toFixed(2);
  if (average < 5) {
    alert(`${average} -> YẾU`);
  } else if (average <= 6.4) {
    alert(`${average} -> TRUNG BÌNH`);
  } else if (average <= 7.9) {
    alert(`${average} -> KHÁ`);
  } else if (average <= 10.0) {
    alert(`${average} -> GIỎI`);
  }
}