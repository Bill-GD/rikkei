function smallerPrimes() {
  const num = parseInt(prompt('Enter a number'));
  if (isNaN(num)) {
    alert('Invalid input');
    return;
  }
  if (num < 2) {
    alert('There are no prime numbers smaller than 2');
    return;
  }

  const primes = [];
  for (let i = 2; i < num; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }
  console.log(primes.join(', '));
}

function allPrime() {
  const num = parseInt(prompt('Enter a number'));
  if (isNaN(num)) {
    alert('Invalid input');
    return;
  }

  const primes = [];
  let i = 2;
  while (primes.length < num) {
    if (isPrime(i)) primes.push(i);
    i++;
  }
  console.log(primes.join(', '));
}

function isPrime(n) {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}