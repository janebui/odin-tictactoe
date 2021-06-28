// You’re going to store the gameboard as an array inside of a Gameboard object, so start there! Your players are also going to be stored in objects… and you’re probably going to want an object to control the flow of the game itself.
//     Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory. Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module. If you need multiples of something (players!), create them with factories.

// Player-making factory
const Player = (name, marker) => {
  return { name, marker };
};


// gameBoard module
const gameBoard = (function () {
    'use strict';
    let gameActive = true;
    let human = Player("Jane", "X");
    let computer = Player("Computer", "O")
    let currentPlayer = human;

   
    // initialize game
    let game = [];
    (function (game) {
        for (let i = 0; i < 9; i++) {
            game.push("");
        }
        console.log(game);
    })(game);

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

    // when a cell is clicked, check if it has been marked already, otherwise mark the cell by calling markCell
    function handleCellClick(e) {
        const clickedCell = e.target;
        const clickedCellIndex = clickedCell.getAttribute('data-index');

        // check if cell has already been marked
        if(game[clickedCellIndex] !== "" || !gameActive) {
            return;
        }

        else {
            markCell(clickedCell, clickedCellIndex);
            handleResultValidation();
        }
    }

    // mark the cell that was clicked
    function markCell(clickedCell, clickedCellIndex) {
        console.log(clickedCellIndex)
        game[clickedCellIndex] = currentPlayer.marker;
        clickedCell.innerHTML = currentPlayer.marker;
    }
    function handlePlayerChange() {
    
    }
    function handleResultValidation() {
    
    }
    
    function handleRestartGame() {
    
    }
    

    return { game, currentPlayer, handleCellClick };
    // function _privateMethod() {
    //     console.log("private");
    // }

    // function publicMethod() {
    //     console.log("public")
    // }

    // return {
    //     publicMethod
    // }
})();


// display module
const displayController = (function () {
    'use strict';
    const boardDisplay = document.querySelector('#gameboard');
    const statusDisplay = document.querySelector('#game-status');
    const section = document.querySelector('section');

    const playerNode = document.createElement("p");
    const playerTextNode = document.createTextNode(`It's ${gameBoard.currentPlayer.name}'s turn.`);
    playerNode.appendChild(playerTextNode);
    section.appendChild(playerNode);



    boardDisplay.innerHTML = gameBoard.game.map((item, i) => {
        return `<div data-index="${i}" class="cell">${item}</div>`
    }).join('');

})();

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', gameBoard.handleCellClick));
// document.querySelector('#restart').addEventListener('click', handleRestartGame);



// Set up your HTML and write a JavaScript function that will render the contents of the gameboard array to the webpage (for now you can just manually fill in the array with "X"s and "O"s)



// Build the functions that allow players to add marks to a specific spot on the board, and then tie it to the DOM, letting players click on the gameboard to place their marker. Don’t forget the logic that keeps players from playing in spots that are already taken!
//     Think carefully about where each bit of logic should reside. Each little piece of functionality should be able to fit in the game, player or gameboard objects.. but take care to put them in “logical” places. Spending a little time brainstorming here can make your life much easier later!


// Build the logic that checks for when the game is over! Should check for 3-in-a-row and a tie.







// Clean up the interface to allow players to put in their names, include a button to start/restart the game and add a display element that congratulates the winning player!


// Optional - If you’re feeling ambitious create an AI so that a player can play against the computer! 