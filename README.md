# Odin Tic Tac Toe
by Jane Bui

This is a project from [The Odin Project](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/tic-tac-toe) which focuses on modules and factory functions.

## Relevant Code

Factory to make the players
```javascript
const Player = (name, marker) => {
    return {
        name,
        marker
    };
};
```
Module for the game logic
```javascript
const gameBoard = (function () {
    // game logic here
    return {
        game,
        gameResult,
        currentPlayer,
        handleCellClick
    };
})();
```
Module to display the gameboard and status
```javascript
const displayController = (function () {
    // display code
    return {
        displayStatus,
        displayBoard
    }
})();
```

## Live Demo
[View Project](https://janebui.github.io/odin-tictactoe/)
