function guessNumber() {
  const num = Math.floor(Math.random() * 10 + 1);
  let oldGuess = -1;
  let alertMsg = '';
  do {
    const guess = parseInt(prompt(`${alertMsg}Guess a number between 1 and 10`));
    if (guess === num) {
      alert('You guessed correctly!');
      break;
    }
    oldGuess = guess;
    alertMsg = guess < num ? 'Too low.\n' : 'Too high.\n';
  } while (oldGuess !== num);
}