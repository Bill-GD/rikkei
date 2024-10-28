function sortNumbers() {
  const a = parseInt(prompt('Enter a:')),
    b = parseInt(prompt('Enter b:')),
    c = parseInt(prompt('Enter c:'));

  const list = [a, b, c];

  let max = 0;
  for (let i = 1; i < list.length; i++) {
    if (list[i] > list[max]) max = i;
  }
  [list[max], list[2]] = [list[2], list[max]];

  if (list[0] > list[1]) {
    [list[0], list[1]] = [list[1], list[0]];
  }

  alert(list.join(', '));
}