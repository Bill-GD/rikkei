type Names = Array<string>;

const studentNames: Names = ['John', 'Jane', 'Doe'];

console.table(studentNames);
// for (const n of studentNames) {
//   console.log(n);
// }

type Person = {
  name: string,
  age: number,
  hobbies: string[],
  gender: boolean
};

const person1: Person = {
  name: 'John',
  age: 19,
  hobbies: ['Reading books'],
  gender: true,
};
