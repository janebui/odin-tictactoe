# Odin Tic Tac Toe
by Jane Bui

This project from the Odin Project focuses on modules and factory functions.

## Relevant Code

```javascript
// factory to make players
const Player = (name, marker) => {
    return {
        name,
        marker
    };
};

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
