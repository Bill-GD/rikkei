// const names: string[] = ['John'];
// const numbers: Array<number> = [1, 2, 3, 4, 5];
// const hashMap : Map<number, string> = {};

const studentList: string[] = ['John', 'Jane', 'Doe'];

// Add to first pos
studentList.unshift('Lane');
// Add to last pos
studentList.push('Bob');

// traditional for loop
for (let i = 0; i < studentList.length; i++) {
  console.log(studentList[i]);
}

// - C2: Sử dụng vòng lặp for...of
// -> Lấy ra toàn bộ phần tử có trong mảng (Không quan tâm đến chỉ số
// của những phần tử có trong mảng)
for (const student of studentList) {
  console.log(student);
}

// - C3: Sử dụng vòng lặp for...in
// -> Lấy ra toàn bộ phần tử có trong mảng (Làm việc được với toàn bộ
// chỉ số của các phần tử có trong mảng)
for (const idx in studentList) {
  console.log(typeof idx);
  console.log(studentList[idx]);
}

// Update
studentList[1] = 'Smith';

// Delete first element
studentList.shift();
// Delete last element
studentList.pop();
// Delete other elements
studentList.splice(2, 1);
