function getFirstNumber(numbers: number[]) {
  return numbers[0];
}

function getFirstString(strings: string[]) {
  return strings[0];
}

console.log(getFirstNumber([1, 2, 3]));
console.log(getFirstString(['a', 'b', 'c']));

interface User {
  name?: string;
  age?: number;
}

function getFirstUser(users: User[]) {
  return users[0];
}

console.log(getFirstUser([{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }]));

// type InputType = number | string | User;
//
// function getFirst(input: InputType[]): InputType {
//   return input[0];
// }
//
// console.log(getFirst([1, 2, 3]));
// console.log(getFirst(['1', '2', '3']));
// console.log(getFirst([{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }]));

function getFirst<T>(items: T[]): Partial<T> {
  return items[0];
}

console.log(getFirst<number>([1, 2, 3]));
console.log(getFirst<string>(['1', '2', '3']));
// console.log(getFirst<>('A string'));
console.log(getFirst<User>([{ name: 'Alice', age: 30 }, { name: 'Bob', age: 25 }]));

function merge<T extends object, K extends object>(a: T, b: K): T & K {
  return Object.assign(a, b);
}

console.log(merge(
  { name: 'Name' },
  { email: 'email@gmail.com' },
).email);

interface ILength {
  length: number;
}

function count<T extends ILength>(input: T): string {
  const elementCount: number = input.length; // string & array both have a property called length
  if (elementCount <= 0) return 'No element';

  return `Got ${elementCount} element${elementCount > 1 ? 's' : ''}`;
}

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U): string {
  return `Value: ${obj[key]}`;
}

console.log(count([1, 2, 3])); // "Got 3 elements"
console.log(count([1])); // "Got 1 element"
console.log(count([])); // "No element"
console.log(count('Hello world!')); // "Got 5 elements"

console.log(extractAndConvert({ name: 'Hello', age: 18 }, 'name')); // ` Value: "Hello" `
console.log(extractAndConvert({ name: 'Hello', id: 18 }, 'id')); // ` Value: 18 `

class DataStorage<T> {
  private data: T;

  constructor(data: T) {
    this.data = data;
  }

  getData(): T {
    return this.data;
  }

  setData(data: T): void {
    this.data = data;
  }
}

const numStorage = new DataStorage(12);
console.log(numStorage.getData());
numStorage.setData(54);
console.log(numStorage.getData());

// const user: Required<User> = {};
//
// console.log(user);


import * as homework from './homework.js';
(window as any).hw = homework;
