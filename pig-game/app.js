var currentScore , globalScore, currentPlayer, randomNumber;

currentPlayer = 0;
currentScore = [0,0];
globalScore = [0,0];

document.querySelector('.dice').style.display='none';
document.getElementById('score-0').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function(){
    randomNumber = Math.floor(Math.random() * 6) + 1;
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + randomNumber + '.png';
    if (randomNumber > 1) {
        currentScore[currentPlayer] += randomNumber;
        document.getElementById('current-' + currentPlayer).textContent = currentScore[currentPlayer];
    }
    else {
        nextPlayer();
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    globalScore[currentPlayer] += currentScore[currentPlayer];
    document.querySelector('#score-' + currentPlayer).textContent = globalScore[currentPlayer];
    if(globalScore[currentPlayer] >= 20) {
        document.querySelector('#name-' + currentPlayer).textContent = 'Winner';
        document.querySelector('.player-' + currentPlayer + '-panel').classList.toggle('active');
        document.querySelector('.player-' + currentPlayer + '-panel').classList.add('winner');
    } else {
        nextPlayer();
    }
    document.querySelector('.dice').style.display = 'none';
});

function nextPlayer() {
    currentScore[currentPlayer] = 0;
    document.querySelector('#current-' + currentPlayer).textContent = currentScore[currentPlayer];
    document.querySelector('.player-' + currentPlayer + '-panel').classList.toggle('active');

    currentPlayer = currentPlayer === 0 ? 1 : 0;
    document.querySelector('.player-' + currentPlayer + '-panel').classList.toggle('active');
}