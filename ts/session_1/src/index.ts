function concatAndCapitalize(): void {
  clearCanvas();
  let str1 = prompt('Enter first name:')!,
    str2 = prompt('Enter last name:')!;

  console.log(`Input: ${str1}, ${str2}`);
  console.log(`${str1.charAt(0).toUpperCase()}${str1.substring(1)} ${str2.charAt(0).toUpperCase()}${str2.substring(1)}`);
}

function filterDuplicateChar() {
  clearCanvas();
  let str: string = prompt('Enter a string:')!, newStr: string = '';

  for (let i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) >= i) newStr += str[i];
  }

  console.log(newStr);
}

function clearCanvas(): void {
  const upperElement = document.getElementById('upper');
  if (upperElement) upperElement.innerHTML = ``;

  const midElement = document.getElementById('mid');
  if (midElement) midElement.innerHTML = ``;

  const lowerElement = document.getElementById('lower');
  if (lowerElement) lowerElement.innerHTML = ``;
}

function performOp(op: string, num1: number | string, num2: number | string): void {
  switch (op) {
    case '+':
      console.log(add(num1, num2));
      break;
    case '-':
      console.log(subtract(num1, num2));
      break;
    case '*':
      console.log(multiply(num1, num2));
      break;
    case '/':
      console.log(divide(num1, num2));
      break;
  }
}

function calculate(): void {
  let num1 = parseInt(prompt('Enter first number:')!),
    num2 = parseInt(prompt('Enter second number:')!);

  const upperElement = document.getElementById('upper');
  if (upperElement) upperElement.innerHTML = `Input: ${num1} & ${num2}`;

  const midElement = document.getElementById('mid');
  if (midElement) midElement.innerHTML = `
    <button onclick="performOp('+', ${num1}, ${num2})">Add</button>
    <button onclick="performOp('-', ${num1}, ${num2})">Subtract</button>
    <button onclick="performOp('*', ${num1}, ${num2})">Multiply</button>
    <button onclick="performOp('/', ${num1}, ${num2})">Divide</button>
  `;
}

function getMultiplicationTable(): void {
  const nums = Array.from(Array(10).keys()).map(e => e + 1);
  console.log('-------------------');
  for (const i of nums) {
    for (const j of nums) {
      console.log(`${i} * ${j} = ${i * j}`);
    }
    console.log('-------------------');
  }
}

function guessNumberGame(): void {
  const num: number = Math.floor(Math.random() * 10 + 1);
  let guess: number = -1, attempt: number = 3;

  while (attempt > 0) {
    guess = parseInt(prompt(`Guess a number (${attempt} attempt${attempt > 1 ? 's' : ''} left): `)!);
    attempt--;
    if (guess === num) {
      alert(`You guessed correctly (${num})`);
      return;
    }
  }
  alert(`You lose! The number was ${num}`);
}

function randomConsoleColor(): void {
  const r: number = Math.floor(Math.random() * 255),
    g: number = Math.floor(Math.random() * 255),
    b: number = Math.floor(Math.random() * 255);
  console.log(`\x1b[38;2;${r};${g};${b}m Hello`);
}

function getZodiac(): void {
  const date: number = parseInt(prompt('Enter a date:')!),
    month: number = parseInt(prompt('Enter a date:')!);

  let result: string = 'None/Invalid';

  if ((date >= 21 && month === 3) || (date <= 19 && month === 4)) {
    result = 'Aries';
  } else if ((date >= 20 && month === 4) || (date <= 20 && month === 5)) {
    result = 'Taurus';
  } else if ((date >= 21 && month === 5) || (date <= 20 && month === 6)) {
    result = 'Gemini';
  } else if ((date >= 21 && month === 6) || (date <= 22 && month === 7)) {
    result = 'Cancer';
  } else if ((date >= 23 && month === 7) || (date <= 22 && month === 8)) {
    result = 'Leo';
  } else if ((date >= 23 && month === 8) || (date <= 22 && month === 9)) {
    result = 'Virgo';
  } else if ((date >= 23 && month === 9) || (date <= 22 && month === 10)) {
    result = 'Libra';
  } else if ((date >= 23 && month === 10) || (date <= 21 && month === 11)) {
    result = 'Scorpio';
  } else if ((date >= 22 && month === 11) || (date <= 21 && month === 12)) {
    result = 'Sagittarius';
  } else if ((date >= 22 && month === 12) || (date <= 19 && month === 1)) {
    result = 'Capricorn';
  } else if ((date >= 20 && month === 1) || (date <= 18 && month === 2)) {
    result = 'Aquarius';
  } else if ((date >= 19 && month === 2) || (date <= 20 && month === 3)) {
    result = 'Pisces';
  }
  alert(`Zodiac sign: ${result}`);
}
