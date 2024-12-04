function checkNaN(num: number | string): boolean {
  if (typeof num === 'number') return false;
  return isNaN(parseInt(num)) || isNaN(parseFloat(num));
}

function add(num1: number | string, num2: number | string): number | null {
  if (checkNaN(num1) || checkNaN(num2)) return null;

  let first =
      typeof num1 === 'string' ? parseInt(num1) : num1,
    second = typeof num2 === 'string' ? parseInt(num2) : num2;
  return first + second;
}

function subtract(num1: number | string, num2: number | string): number | null {
  if (checkNaN(num1) || checkNaN(num2)) return null;

  let first =
      typeof num1 === 'string' ? parseInt(num1) : num1,
    second = typeof num2 === 'string' ? parseInt(num2) : num2;
  return first - second;
}

function multiply(num1: number | string, num2: number | string): number | null {
  if (checkNaN(num1) || checkNaN(num2)) return null;

  let first =
      typeof num1 === 'string' ? parseInt(num1) : num1,
    second = typeof num2 === 'string' ? parseInt(num2) : num2;
  return first * second;
}

function divide(num1: number | string, num2: number | string): number | null {
  if (checkNaN(num1) || checkNaN(num2)) return null;

  let first =
      typeof num1 === 'string' ? parseInt(num1) : num1,
    second = typeof num2 === 'string' ? parseInt(num2) : num2;
  if (second === 0) {
    console.log('Can\'t divide by 0');
    return null;
  }
  return first / second;
}

function power(num: number, power: number): number {
  let mulCount: number = power, res: number = 1;
  while (mulCount > 0) {
    res *= num;
    mulCount--;
  }
  return res;
}

function factorial(num: number): number {
  if (num === 1) return 1;
  return num * factorial(num - 1);
}

function root(root: number, num: number): number {
  if (root < 2) return NaN;
  if (root === 2) return Math.sqrt(num);

  let res: number = 0,
    guess: number = num / 2,
    div: number = num / Math.pow(guess, root - 1);

  while (parseFloat(div.toFixed(3)) !== parseFloat(guess.toFixed(3))) {
    guess = (guess * (root - 1) + div) / root;
    div = num / Math.pow(guess, root - 1);
  }
  return div;
}
