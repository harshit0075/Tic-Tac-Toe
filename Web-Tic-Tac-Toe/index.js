document.addEventListener('DOMContentLoaded', () => {
    const gridCells = document.querySelectorAll('.grid-cell');
    const currentPlayer = document.querySelector('.current-player');
    const gameOverText = document.querySelector('.game-over-text');
    const restartButton = document.querySelector('.restart');
  
    let currentPlayerSymbol = 'X';
    let isGameOver = false;
  
    gridCells.forEach(cell => {
      cell.addEventListener('click', () => {
        if (!isGameOver && !cell.textContent) {
          cell.textContent = currentPlayerSymbol;
          cell.classList.add(currentPlayerSymbol.toLowerCase());
          cell.classList.add('disabled');
          currentPlayerSymbol = currentPlayerSymbol === 'X' ? 'O' : 'X';
          currentPlayer.textContent = `It's ${currentPlayerSymbol}'s turn`;
          checkGameStatus();
        }
      });
    });
  
    restartButton.addEventListener('click', restartGame);
  
    function checkGameStatus() {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
      ];
  
      const cells = Array.from(gridCells);
      let isDraw = true;
  
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
          isGameOver = true;
          cells[a].classList.add('winner');
          cells[b].classList.add('winner');
          cells[c].classList.add('winner');
          currentPlayer.textContent = '';
          gameOverText.textContent = `${cells[a].textContent} wins!`;
          break;
        }
      }
  
      if (!isGameOver) {
        for (const cell of cells) {
          if (!cell.textContent) {
            isDraw = false;
            break;
          }
        }
  
        if (isDraw) {
          isGameOver = true;
          currentPlayer.textContent = '';
          gameOverText.textContent = 'Draw!';
        }
      }
    }
  
    function restartGame() {
      gridCells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.classList.remove('disabled');
        cell.classList.remove('winner');
      });
  
      currentPlayerSymbol = 'X';
      isGameOver = false;
      currentPlayer.textContent = `It's ${currentPlayerSymbol}'s turn`;
      gameOverText.textContent = '';
    }
  });
  