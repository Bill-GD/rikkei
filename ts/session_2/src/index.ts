function countElement(): void {
  const arr: number[] = randomNumArray(10, 15);
  console.log(`Array: ${arr}`);
  let res: string = 'Numbers >= 10: ' + arr.filter(e => e >= 10);
  console.log(res);
}

function minAndMax(): void {
  const arr: number[] = randomNumArray(10);
  console.log(`Array: ${arr}`);
  arr.sort((a, b) => a - b);
  console.log(`Min: ${arr[0]} - Max: ${arr[arr.length - 1]}`);
}

function reverseArray(): void {
  const arr: number[] = randomNumArray(10);
  console.log(`Array: ${arr}`);
  arr.reverse();
  console.log(`Reversed: ${arr}`);
}

// no built-in functions

function sortDesc(): void {
  let arr: number[] = randomNumArray(10);
  console.log(`Array: ${arr}`);
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[j] > arr[i]) {
        [arr[j], arr[i]] = [arr[i], arr[j]];
      }
    }
  }
  console.log(`Sorted array: ${arr}`);
}

function array2d(): void {
  const arr: number[][] = randomNumArray(4).map(e => randomNumArray(3));
  // console.log(`Array: ${arr}`);
  console.log(arr);
  for (const r of arr) {
    console.log(r);
    // for (const e of r) {
    //   console.log(e);
    // }
  }
}

let store: { id: number, name: string, count: number }[] = [
  { id: 1, name: 'Milk', count: 100 },
  { id: 2, name: 'Yakult', count: 100 },
  { id: 3, name: 'Butter', count: 100 },
];

let cart: Array<{ name: string, count: number }> = [];

function display(): void {
  printToCanvas(
    Section.upper,
    `STORE\n--------------\n${store.map(e => `Product: ${e.name}\nCount: ${e.count}`).join('\n--------------\n')}`,
  );
  printToCanvas(
    Section.mid,
    `--------------\nCART\n--------------\n${cart.map(e => `Product: ${e.name}\nCount: ${e.count}`).join('\n--------------\n')}`,
  );
}

async function cartManage(): Promise<void> {
  const actions: string[] = ['c', 'r', 'u', 'd', 'e'];
  let rep: string = '';

  display();
  await (new Promise(r => setTimeout(r, 100)));

  while (true) {
    display();
    await (new Promise(r => setTimeout(r, 100)));

    do {
      rep = (prompt('Enter C/R/U/D/E\n' +
                    'C – Nhập vào tên sản phẩm muốn mua.\n' +
                    'R – In ra toàn bộ các sản phẩm trong store và cart\n' +
                    'U – Update số lượng sản phẩm trong cart.\n' +
                    'D – Xóa sản phẩm trong cart.\n' +
                    'E – Thoát khỏi chương trình.',
      ) ?? '').toLowerCase();
    } while (!actions.includes(rep));

    switch (rep) {
      case 'c':
        const name: string = prompt('Nhập tên sản phẩm:') ?? '';
        const p = store.find(e => e.name === name);
        if (p === null || p === undefined) break;

        let idx: number = store.indexOf(p);
        if (store[idx].count <= 1) store.splice(idx, 1);
        else store[idx].count--;

        const c = cart.find(e => e.name === name);
        if (c === null || c === undefined) cart.push({ name: name, count: 1 });
        else cart[cart.indexOf(c)].count++;
        break;
      case 'r':
        break;
      case 'u':
        let cartIdx: number = parseInt(prompt('Nhập vị trị sản phẩm trong cart:') ?? 'a');
        if (isNaN(cartIdx) || cartIdx <= 0 || cartIdx > cart.length) break;
        cartIdx--;

        const pro = store.find(e => e.name === cart[cartIdx].name)!;

        const totalCount: number = pro.count + cart[cartIdx].count;
        const newCount: number = parseInt(prompt(`Nhập số lượng (${cart[cartIdx].name}):`) ?? 'a');
        if (isNaN(newCount) || newCount < 0 || newCount > totalCount) break;

        store[store.indexOf(pro)].count = totalCount - newCount;
        cart[cartIdx].count = newCount;
        if (cart[cartIdx].count <= 0) cart.splice(cartIdx, 1);
        break;
      case 'd':
        let pos: number = parseInt(prompt('Nhập vị trị sản phẩm trong cart:') ?? 'a');
        if (isNaN(pos) || pos <= 0 || pos > cart.length) break;
        pos--;

        const product = store.find(e => e.name === cart[pos].name)!;
        store[store.indexOf(product)].count += cart[pos].count;
        cart.splice(pos, 1);
        break;
      case 'e':
        return;
    }
  }
}

function getPairOfSum(): void {
  const arr: number[] = randomNumArray(10, 10, false);
  console.log(`Array: ${arr}`);

  const target: number = parseInt(prompt('Enter a target number:') ?? 'a');
  if (isNaN(target)) {
    console.log('Invalid input. Please enter a number');
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    const other: number = arr.indexOf(target - arr[i]);
    if (other >= 0 && other !== i) {
      console.log(`${i}, ${other}`);
      return;
    }
  }
  console.log('No pair found');
}

function validateBrackets(): void {
  const open: string[] = ['(', '{', '['], close: string[] = [')', '}', ']'];

  let str: string = '';
  for (let i = 0; i < 10; i++) {
    const type: number = Math.floor(Math.random() * 2),
      pos: number = Math.floor(Math.random() * 2);
    str += type === 0 ? open[pos] : close[pos];
  }
  console.log(str);
  checkBrackets(str);
}

function checkBrackets(str: string): void {
  const open: string[] = ['(', '{', '['], close: string[] = [')', '}', ']'];

  let openings: number[] = [];
  for (const c of str) {
    if (open.includes(c)) {
      openings.push(open.indexOf(c));
      continue;
    }
    if (openings.length < 0 || openings[openings.length - 1] !== close.indexOf(c)) {
      console.log(false);
      return;
    }
    openings.pop();
  }
  if (openings.length > 0) console.log(false);
  else console.log(true);
}

function checkPalindrome(): void {
  const str: string = (prompt('Enter any string:') ?? '').split('').filter(e => e.match(/[a-zA-Z0-9]/)).join('').toLowerCase();
  let l = 0, r = str.length - 1;
  while (l < r) {
    if (str[l] !== str[r]) {
      console.log('Is palindrome: false');
      return;
    }
    l++;
    r--;
  }
  console.log('Is palindrome: true');
}

function randomNumArray(length: number = 5, maxValue: number = 10, allowDuplicate: boolean = true): number[] {
  // const len = Math.floor(Math.random() * 10 + length);
  const list: number[] = [];
  for (let i = 0; i < length; i++) {
    const val: number = Math.floor(Math.random() * maxValue);
    if (!allowDuplicate && list.includes(val)) {
      i--;
      continue;
    }
    list.push(val);
  }
  return list;
}

enum Section { upper = 'upper', mid = 'mid', lower = 'lower'}

function printToCanvas(id: Section, content: string): void {
  const e = document.getElementById(id);
  if (e === null) {
    console.log(`Couldn't find element with ID: ${id}`);
    return;
  }
  e.innerText = content;
}
