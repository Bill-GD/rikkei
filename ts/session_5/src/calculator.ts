class Calculator {
  // - Tính tổng hai số.
  static add(a: number, b: number): number {
    return a + b;
  }

  // - Tính hiệu hai số.
  static subtract(a: number, b: number): number {
    return a - b;
  }

  // - Tính tích hai số.
  static multiply(a: number, b: number): number {
    return a * b;
  }

  // - Tính thương hai số (tránh chia cho 0).
  static divide(a: number, b: number): number {
    return a / b;
  }
}

enum CalcInput {add = 1, sub, mul, div, end}

class CalcMain {
  run(): void {
    let input: number;
    let errorText: string = '';

    while (true) {
      input = Number(prompt(
        'Task manager\n\n' +
        (errorText.length > 0 ? errorText + '\n\n' : '') +
        `${CalcInput.add}. Cộng hai số.\n` +
        `${CalcInput.sub}. Trừ hai số.\n` +
        `${CalcInput.mul}. Nhân hai số.\n` +
        `${CalcInput.div}. Chia hai số.\n` +
        `${CalcInput.end}. Dừng chương trình.\n`,
      ));

      errorText = '';
      let a: number, b: number;

      switch (input) {
        case CalcInput.add:
          a = Number(prompt('Enter first number'));
          b = Number(prompt('Enter second number'));
          if (isNaN(a) || isNaN(b)) {
            errorText = `Input is invalid. Enter again.`;
            break;
          }
          console.log(Calculator.add(a, b));
          break;
        case CalcInput.sub:
          a = Number(prompt('Enter first number'));
          b = Number(prompt('Enter second number'));
          if (isNaN(a) || isNaN(b)) {
            errorText = `Input is invalid. Enter again.`;
            break;
          }
          console.log(Calculator.subtract(a, b));
          break;
        case CalcInput.mul:
          a = Number(prompt('Enter first number'));
          b = Number(prompt('Enter second number'));
          if (isNaN(a) || isNaN(b)) {
            errorText = `Input is invalid. Enter again.`;
            break;
          }
          console.log(Calculator.multiply(a, b));
          break;
        case CalcInput.div:
          a = Number(prompt('Enter first number'));
          b = Number(prompt('Enter second number'));
          if (isNaN(a) || isNaN(b)) {
            errorText = `Input is invalid. Enter again.`;
            break;
          }
          if (b === 0) {
            errorText = `Can't divide by 0, enter another number`;
            break;
          }
          console.log(Calculator.divide(a, b));
          break;
        case CalcInput.end:
          return;
      }
    }
  }
}

const calcApp = new CalcMain();
