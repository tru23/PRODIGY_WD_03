document.addEventListener('DOMContentLoaded', function () {
    const humanPlayer = 'X';
    const aiPlayer = 'O';
    let currentPlayer = humanPlayer;
    const cells = document.querySelectorAll('.board div');
    const statusDisplay = document.getElementById('status');

    startGame();

    function startGame() {
        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('win-animation'); // Remove win-animation class
            cell.addEventListener('click', handleClick, { once: true });
        });
        statusDisplay.textContent = `${currentPlayer}'s turn`;
    }

    function handleClick(e) {
        const cell = e.target;
        if (cell.textContent === '') {
            cell.innerText = currentPlayer;
            if (checkWin(currentPlayer)) {
                gameOver(`${currentPlayer} wins!`);
            } else if (checkTie()) {
                gameOver("It's a tie!");
            } else {
                currentPlayer = currentPlayer === humanPlayer ? aiPlayer : humanPlayer;
                statusDisplay.textContent = `${currentPlayer}'s turn`;
                if (currentPlayer === aiPlayer) {
                    setTimeout(makeAiMove, 500);
                }
            }
        }
    }

    function checkWin(player) {
        const winCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        return winCombos.some(combination => {
            return combination.every(index => {
                return cells[index].textContent === player;
            });
        });
    }

    function checkTie() {
        return [...cells].every(cell => cell.textContent !== '');
    }

    function gameOver(message) {
        statusDisplay.textContent = message;
        if (message.includes('wins')) {
            statusDisplay.style.fontSize = '3em';
            statusDisplay.style.color = 'red';
            const winCombos = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            winCombos.forEach(combination => {
                const [a, b, c] = combination;
                if (cells[a].textContent === cells[b].textContent && cells[b].textContent === cells[c].textContent && cells[a].textContent !== '') {
                    cells[a].classList.add('win-animation');
                    cells[b].classList.add('win-animation');
                    cells[c].classList.add('win-animation');
                }
            });
        }
        cells.forEach(cell => {
            cell.removeEventListener('click', handleClick);
        });
    }

    function makeAiMove() {
        const availableMoves = [...cells].filter(cell => cell.textContent === '');
        const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        move.click();
    }

    document.getElementById('reset').addEventListener('click', startGame);
});
