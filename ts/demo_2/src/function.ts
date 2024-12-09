const numbers: Array<number> = [1, 2, 3, 4, 5];

console.log(numbers.map((e: number) => e > 3));
console.log(numbers.map(function (num: number) {
  return num * 2;
}));

function map(arr: number[], fn: (value: number, index: number) => number): number[] {
  const newArr: number[] = [];
  for (const i in arr) {
    newArr.push(fn(arr[i], +i));
  }
  return newArr;
}

console.log(map(numbers, (v) => v * v));
