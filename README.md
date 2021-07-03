# Odin Tic Tac Toe
by Jane Bui

This is a project from [The Odin Project](https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript/lessons/tic-tac-toe) which focuses on modules and factory functions.

## Relevant Code

```javascript
// factory to make players
const Player = (name, marker) => {
    return {
        name,
        marker
    };
};

```javascript
// module for the game logic
const gameBoard = (function () {
    // game logic here
    return {
        game,
        gameResult,
        currentPlayer,
        handleCellClick
    };
})();

```javascript
// module to display the gameboard
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
