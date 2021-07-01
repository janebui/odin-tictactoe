// You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects… and you’re probably going to want an object to control the flow of the game itself.
//     Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.

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

    let human = Player('Human', '<span class="material-icons-outlined x">close</span>');
    let computer = Player('Computer', '<span class="material-icons-outlined">radio_button_unchecked</span>')
    let currentPlayer = human;
    let gameActive = true;
    let gameResult = 0; // 0 = no winner yet, 1 = someone won, 2 = draw

    const nameInput = document.getElementById('name-input');
    const restartBtn = document.querySelector('#restart');

    // initialize game
    let game = new Array(9).fill("");

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

        // reduce to avail array with indexes of the available cells
        game.reduce(function (a, c, i) {
            if (c == '') a.push(i)
            return a;
        }, avail);

        // pick a random cell from the cells that are available
        computerChoice = avail[Math.floor(Math.random() * avail.length)];

        game[computerChoice] = computer.marker;
        handleResultValidation();
        displayController.displayBoard(game);

        // if computer didn't win this turn, return turn to human
        if(gameActive) { 
            
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
        // console.log(currentPlayer.name)
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
                displayController.displayStatus(currentPlayer, gameResult);
                break;
            }
        }

        // Draw. All cells filled out but nobody won
        if (!game.includes('')) {
            gameActive = false;
            gameResult = 2;
            displayController.displayStatus(currentPlayer, gameResult);
        }
    }

    function restartGame() {
        game.fill("");
        gameActive = true;
        gameResult = 0;
        displayController.displayBoard(game);
        displayController.displayStatus(human, gameResult);
    }

    nameInput.addEventListener('submit', handleName);
    restartBtn.addEventListener('click', restartGame);

    return {
        game,
        handleCellClick,
        gameResult,
        currentPlayer
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


// Set up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage (for now you can just manually fill in the array with "X"s and "O"s)



// Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker. Don’t forget the logic that keeps players from playing in spots that are already taken!
//     Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, player or gameboard objects.. but take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!


// Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.







// Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!


// Optional - If you’re feeling ambitious create an AI so that a player can play against the computer! 