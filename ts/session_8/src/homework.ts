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
