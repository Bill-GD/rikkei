import { type Users, users } from './data';

type CamelCaseUsers = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  salary: number;
} [];

// YOUR CODE HERE
function problem01(users: Users): string[] {
  // Use forEach to get first_name and last_name of all users
  // and put it an array then return that array
  const names: string[] = [];
  // users[0] - users[users.length - 1]
  users.forEach(e => names.push(`${e.first_name} ${e.last_name}`));
  return names;
}

function problem02(users: Users): Users {
  // return an array of user which is male and age is under 40
  return users.filter(e => e.age < 40 && e.gender === 'Male');
}

console.log(problem02(users));

function problem03(users: Users): string[] {
  // return an array of full name
  return users.map(e => `${e.first_name} ${e.last_name}`);
}

function problem04(users: Users): CamelCaseUsers {
  // return new array of user where the key of each ~record~ (property) in new array is camelCase
  return users.map(e => {
    let { first_name, last_name, ...camelCase } = e; // filters unwanted properties (destructuring)
    return {
      id: e.id,
      firstName: e.first_name,
      lastName: e.last_name,
      email: e.email,
      gender: e.gender,
      age: e.age,
      salary: e.salary,
    };
    // delete obj.first_name;
    // delete obj.last_name;
  });

  // return users.map((e: User) => {
  //   const obj: Map<string, any> = new Map();
  //   const keys: string[] = Object.keys(e);
  //
  //   const newKeys: string[] = keys.map(k => {
  //     if (!k.includes('_')) return k;
  //     const words: string[] = k.split('_');
  //     return words[0] + words.slice(1).map(e => e.charAt(0).toUpperCase() + e.substring(1)).join('');
  //   });
  //
  //   for (let i = 0; i < keys.length; i++) {
  //     // @ts-ignore
  //     obj.set(newKeys[i], e[keys[i]]);
  //   }
  //   return obj;
  // });
}

function problem05(users: Users): number {
  // return the average age in users
  return users.reduce((p, c) => p + c.age, 0) / users.length;
}

function problem0601(users: Users): string[] {
  // return an array of full name using Array.prototype.reduce
  return users.reduce((p, c) => {
    p.push(`${c.first_name} ${c.last_name}`);
    return p;
  }, [] as string[]);
}

function problem0602(users: Users): Users {
  // return an array of user which is male and age under 40 using Array.prototype.reduce
  return users.reduce((p, c) => {
    if (c.gender === 'Male' && c.age < 40) p.push(c);
    return p;
  }, [] as Users);
}

function problem0603(users: Users): CamelCaseUsers {
  // return new array where each record is in camelCase using Array.prototype.reduce
  return users.reduce((p, c) => {
    p.push({
      id: c.id,
      firstName: c.first_name,
      lastName: c.last_name,
      email: c.email,
      gender: c.gender,
      age: c.age,
      salary: c.salary,
    });
    return p;
  }, [] as CamelCaseUsers);
}

function problem07(users: Users) {
  // return the sorted array of user (sort by field first_name in ascending order)
  return users.sort((a, b) => a.first_name.localeCompare(b.first_name));
}

function faMap(array: number[], fn: Function) {
  // implement faMap that works like Array.prototype.map
  for (let i = 0; i < array.length; i++) {
    array[i] = fn(array[i], i);
  }
  return array;
}

// console.log(faMap([1, 2, 3], (item, index) => item += 2));

function faFilter(array: number[], predicate: Function) {
  // implement faMap that works like Array.prototype.filter
  const res: number[] = [];
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i])) res.push(array[i]);
  }
  return res;
}

function faReduce(array: number[], fn: Function, defaultValue: number) {
  let res: number = defaultValue ?? 0;
  for (let i = 0; i < array.length; i++) {
    res = fn(res, array[i], i);
  }
  return res;
}

// console.log(faReduce([1, 2, 3], (p, c, i) => p += c));

function problem1101(array: number[], fn: Function): number[] {
  // map array using faReduce
  faReduce(array, (p: number, c: number, i: number) => {
    array[i] = fn(c);
  }, 0);
  return array;
}

function problem1102(array: number[], fn: Function) {
  // filter array using faReduce
  const res: number[] = [];
  faReduce(array, (p: number, c: number, i: number) => {
    if (fn(c)) res.push(c);
  }, 0);
  return res;
}

function problem1201(array: number[]) {
  // implement sum array with faReduce
  return faReduce(array, (p: number, c: number) => p + c, 0);
}

function problem1202(array: number[]) {
  // implement product array with faReduce
  return faReduce(array, (p: number, c: number) => p * c, 1);
}

function problem1203(array: number[]) {
  // implement reverse array with faReduce
  const res: number[] = [];
  faReduce(array, (p: number, c: number, i: number) => {
    res.unshift(c);
  }, 0);
  return res;
}
