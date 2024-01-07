let tttBtns = document.querySelectorAll(".game-wrapper button");
let refreshBtn = document.querySelector('button[type="reset"]');
let mainWrapper = document.querySelector('main');

// Make computer place 'O' at random place after user's turn.
function placeO(i) {
    tttBtns[i].innerText = tttBtns[i].value = 'X';
    tttBtns[i].setAttribute('disabled', 'true');
    
    let botRandom;
    do {
        botRandom = Math.floor(Math.random() * tttBtns.length);
    } while(tttBtns[botRandom].innerText.length !== 0);
    
    tttBtns[botRandom].innerText = tttBtns[botRandom].value = 'O';
    tttBtns[botRandom].setAttribute('disabled', 'true');
}

// Check if 3 boxes have same value horizontally, vertically, or diagonally.
function checkValues() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (tttBtns[a].value && tttBtns[a].value === tttBtns[b].value && tttBtns[a].value === tttBtns[c].value) {
            return tttBtns[a].value;
        }
    }

    if ([...tttBtns].every(btn => btn.innerText.length !== 0)) {
        return 'Draw';
    }

    return null;
}

// Show verdict as per the result.
function handleResult(result) {
    let verdict;

    if (result === 'X') {
        verdict = '<h2>You Won!!</h2>';
    } else if (result === 'O') {
        verdict = '<h2>Computer Won!</h2>';
    } else {
        verdict = "<h2>It's a Draw!</h2>";
    }
    mainWrapper.innerHTML = verdict + `<button type="submit" class="play-again" onClick="location.href='/'">Play Again</button>`;
}

// This will place 'X' at the index where the user clicks and 'O' at any random empty place.
for(let i = 0; i < tttBtns.length; i++) {
    tttBtns[i].addEventListener('click', () => {
        placeO(i);
        const result = checkValues();
        if (result) {
            handleResult(result);
        }
    });
}

// To refresh the grid.
refreshBtn.addEventListener('click', () => {
    tttBtns.forEach((btn) => {
        btn.innerText = '';
        btn.removeAttribute('disabled');
        btn.removeAttribute('value');
    });
})