let person: {
  name: string; // ; or , is fine here
  age: number;
  hobbies: string[];
  gender: boolean;
} = {
  name: 'John',
  age: 19,
  hobbies: ['Reading books'],
  gender: true,
};

let students: Array<{ id: number, name: string, age: number }> = [
  {
    id: 1,
    name: 'John',
    age: 19,
  },
  {
    id: 2,
    name: 'Joe',
    age: 18,
  },
];

console.table(students);
