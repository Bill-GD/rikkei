function findDuplicateElements(list = []) {
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

function randomNumArray(length = 5, maxValue = 10) {
  // const len = Math.floor(Math.random() * 10 + length);
  const list = [];
  for (let i = 0; i < length; i++) {
    list.push(Math.floor(Math.random() * maxValue));
  }
  return list;
}