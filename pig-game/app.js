var currentScore , globalScore, currentPlayer, randomNumber;

currentPlayer = 0;
currentScore = [0,0];
globalScore = [0,0];

document.querySelector('.dice').style.display='none';

randomNumber = Math.floor(Math.random() * 6) + 1;
console.log(randomNumber);

document.querySelector('#current-' + currentPlayer).textContent = randomNumber;