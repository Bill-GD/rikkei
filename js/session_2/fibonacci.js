function fibonacci() {
  let num = parseInt(prompt("Enter a number:"));
  if (isNaN(num)) {
    console.log("Invalid input.");
    return;
  }

  if (num === 1) {
    console.log('0');
    return;
  }
  if (num === 2) {
    console.log('1');
    return;
  }

  let first = 0, second = 1;
  let sum = 1;
  let str ='0 1 ';

  while (sum < num) {
    const third = first + second;
    [first, second] = [second, third];
    sum += third;
    if (sum >= num) break;
    str += `${third} `;
  }
  console.log(str);
}