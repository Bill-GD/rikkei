export function swap<T>(input: T[]): T[] {
  if (input.length !== 2) throw Error('Input must only have 2 elements');
  return [input[1], input[0]];
}

export function getFirstElement<T>(input: T[]): T {
  return input[0];
}

export function mergeObj<T extends object, K extends object>(a: T, b: K): T & K {
  return Object.assign(a, b);
}

export function pluck<U extends Object, K extends keyof U>(objectList: U[], key: K): U[K][] {
  return objectList.map(e => e[key]);
}

export function filterByProperty<O extends Object, K extends keyof O, V>(objectList: O[], key: K, value: V): O[] {
  return objectList.filter(e => e[key] === value);
}

export function sumByProperty<O extends Object, K extends keyof O>(objectList: O[], key: K): number {
  return objectList.reduce((p, c) => p += c[key] as number, 0)
}
