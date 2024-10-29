function getDuplicateElements(list = []) {
  const map = new Map();
  for (const e of list) {
    map.set(e, (map.get(e) || 0) + 1);
  }

  const dupes = [];
  map.forEach((v, k) => v > 1 && dupes.push(k));
  return dupes;
}

function getSmallestMissingInteger(list = []) {
  let max = -1;
  list.forEach(e => max = e > max ? e : max);
  for (let i = 0; i <= max; i++) {
    if (!list.includes(i)) return i;
  }
}

function getCommonElements(lists) {
  const res = [];
  for (let e of lists[0]) {
    if (res.includes(e)) continue;
    let exists = true;
    for (let l of lists) {
      if (!l.includes(e)) exists = false;
    }
    if (exists) res.push(e);
  }
  return res;
}

function sortEvenOdd(list) {
  const even = [], odd = [];
  for (let e of list) {
    e % 2 === 0 ? even.push(e) : odd.push(e);
  }
  even.sort();
  odd.sort();
  return Array.from([...even, ...odd]);
}

function getAllSubtrings(str) {
  const chars = str.split('');
  const res = [];
  for (let i = 0; i < chars.length; i++) {
    let sub = '';
    for (let j = i; j < chars.length; j++) {
      sub += chars[j];
      res.push(sub);
    }
  }
  return res;
}

function shuffle(list) {
  const res = [];
  for (let e of list) {
    let pos = Math.floor(Math.random() * list.length);
    while (res[pos] !== undefined) {
      pos = Math.floor(Math.random() * list.length);
    }
    res[pos] = e;
  }
  return res;
}

const getFirstUnique = list => getUniques(list)[0];

function getUniques(list) {
  const dupes = getDuplicateElements(list);
  return list.filter(e => !dupes.includes(e));
}

function getSubListWithSum(list, sum) {
  for (let i = 0; i < list.length; i++) {
    let idx = i;
    let subSum = list[idx];
    while (subSum < sum) {
      if (idx === list.length) break;
      subSum += list[++idx];
    }
    if (subSum === sum) {
      const res = [];
      for (let start = i; start <= idx; start++) {
        res.push(list[start]);
      }
      return res;
    }
  }
  return 'No sublist satisfy the requirements';
}

function randomNumArray(length = 5, maxValue = 10) {
  // const len = Math.floor(Math.random() * 10 + length);
  const list = [];
  for (let i = 0; i < length; i++) {
    list.push(Math.floor(Math.random() * maxValue));
  }
  return list;
}