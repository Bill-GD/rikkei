function multTable() {
  let str = '';
  for (let num = 1; num <= 10; num++) {
    str += '----------\n';
    for (let mult = 1; mult <= 10; mult++) {
      str += `${num} * ${mult} = ${num * mult}\n`;
    }
  }
  str += '----------';
  console.log(str);
}