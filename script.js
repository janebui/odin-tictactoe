// Player-making factory
const Player = (name, marker) => {
    return {
        name,
        marker
    };
};


// gameBoard module
const gameBoard = (function () {
    'use strict';

    const X = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve" height="80px">  <g><line class="marker x" x1="9" y1="90" x2="90" y2="9"/><line class="marker x" x1="9" y1="9" x2="90" y2="90"/></g></svg>'

    const O = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 100 100" style="enable-background:new 0 0 100 100;" xml:space="preserve" height="80px"><circle class="marker" cx="49.5" cy="49.5" r="40.5"/></svg>'

    let human = Player('Human', X);
    let computer = Player('Computer', O)
    let currentPlayer = human;
    
    let gameActive = true;
    let gameResult = 0; // 0 = no winner yet, 1 = someone won, 2 = draw

    const nameInput = document.querySelector('#name-input');
    const restartBtn = document.querySelector('#restart');

    // initialize game
    let game = new Array(9).fill('');

    // win conditions
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleName(e) {
        e.preventDefault();
        human.name = document.getElementById('name').value;
        document.getElementById('your-name').innerHTML = human.name
        this.reset();
    }

    // when a cell is clicked, check if it has been marked already, otherwise mark the cell 
    function handleCellClick(e) {
        let clickedCell = e.target;
        let clickedCellIndex = clickedCell.getAttribute('data-index');

        // check if cell has already been marked
        if (game[clickedCellIndex] !== '' || !gameActive) {
            return;
        } else { // mark the empty cell
            game[clickedCellIndex] = human.marker;
            clickedCell.innerHTML = human.marker;

            handleResultValidation();
            if (gameActive) {
                handlePlayerChange();
            }
        }
    }

    function moveComputer() {
        // find the cells that are still available
        let avail = [];
        let computerChoice;

        // record the indices of available cells into avail array
        game.reduce(function (a, c, i) {
            if (c == '') a.push(i)
            return a;
        }, avail);

        // pick a random cell from the cells that are available
        computerChoice = avail[Math.floor(Math.random() * avail.length)];

        game[computerChoice] = computer.marker;
        handleResultValidation();
        displayController.displayBoard(game);

        // if computer didn't win this turn, go to human's turn
        if (gameActive) {
            handlePlayerChange();
        }
    }

    // changes player after a player has taken a turn
    function handlePlayerChange() {
        if (currentPlayer == human) {
            currentPlayer = computer;
            moveComputer();
        } else {
            currentPlayer = human;
        }
        displayController.displayStatus(currentPlayer, gameResult);
    }

    // check if anybody won yet
    function handleResultValidation() {
        for (let i = 0; i < winConditions.length; i++) {

            const checkWin = winConditions[i]; // eg [2, 4, 6]
            let a = game[checkWin[0]];
            let b = game[checkWin[1]];
            let c = game[checkWin[2]];

            // skip win condition if not all 3 cells marked
            if (a === '' || b === '' || c === '') {
                continue;
            }

            // when all 3 cells of win condition are marked, check if the same marker
            if (a === b && b === c) {
                gameActive = false;
                gameResult = 1;
                break;
            } else if (!game.includes('')) {
                gameActive = false;
                gameResult = 2;
            }
        }
        displayController.displayStatus(currentPlayer, gameResult);
    }

    function restartGame() {
        game.fill('');
        gameActive = true;
        gameResult = 0;
        currentPlayer = human;
        displayController.displayBoard(game);
        displayController.displayStatus(human, gameResult);
    }

    nameInput.addEventListener('submit', handleName);
    restartBtn.addEventListener('click', restartGame);

    return {
        game,
        gameResult,
        currentPlayer,
        handleCellClick
    };

})();


// display module
const displayController = (function () {
    const boardDisplay = document.querySelector('#gameboard');
    const statusDisplay = document.querySelector('#game-status');
    const section = document.querySelector('section');

    const playerNode = document.createElement('p');
    const playerTextNode = document.createTextNode('');
    playerNode.appendChild(playerTextNode);
    section.appendChild(playerNode);

    function displayBoard(game) {
        boardDisplay.innerHTML = game.map((item, i) => {
            return `<div data-index="${i}" class="cell">${item}</div>`
        }).join('');

        document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', gameBoard.handleCellClick));
    };
    displayBoard(gameBoard.game);

    function displayStatus(currentPlayer, gameResult) {
        switch (gameResult) {
            case 0:
                statusDisplay.textContent = `It's ${currentPlayer.name}'s turn.`;
                break;
            case 1:
                statusDisplay.textContent = `${currentPlayer.name} wins!`;
                break;
            case 2:
                statusDisplay.textContent = "Draw";
                break;
        }
    }

    return {
        displayStatus,
        displayBoard
    }
})();