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
    } while (tttBtns[botRandom].innerText.length !== 0);

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

    mainWrapper.innerHTML = verdict + `<button type="submit" class="play-again" onClick="location.href='/tic-tac-toe'">Play Again</button>`;
}

// This will place 'X' at the index where the user clicks and 'O' at any random empty place.
for(let i = 0; i < tttBtns.length; i++) {

    tttBtns[i].addEventListener('click', () => {
        placeO(i);
        const result = checkValues();
        if(result === 'X') {
            // To load confetti when User wins
            tsParticles.load({
                id: "tsparticles",
                options: {
                    fullScreen: {
                        enable: true,
                        zIndex: 9,
                    },
                    interactivity: {
                        detectsOn: "window"
                    },                  
                    particles: {
                    number: {
                        value: 0,
                    },
                    color: {
                        value: ["#00FFFC", "#FC00FF", "#fffc00"],
                    },
                    shape: {
                        type: ["circle", "square"],
                        options: {},
                    },
                    opacity: {
                        value: {
                        min: 0,
                        max: 1,
                        },
                        animation: {
                        enable: true,
                        speed: 2,
                        startValue: "max",
                        destroy: "min",
                        },
                    },
                    size: {
                        value: {
                        min: 2,
                        max: 4,
                        },
                    },
                    links: {
                        enable: false,
                    },
                    life: {
                        duration: {
                        sync: true,
                        value: 5,
                        },
                        count: 1,
                    },
                    move: {
                        enable: true,
                        gravity: {
                        enable: true,
                        acceleration: 10,
                        },
                        speed: {
                        min: 10,
                        max: 20,
                        },
                        decay: 0.1,
                        direction: "none",
                        straight: false,
                        outModes: {
                        default: "destroy",
                        top: "none",
                        },
                    },
                    rotate: {
                        value: {
                        min: 0,
                        max: 360,
                        },
                        direction: "random",
                        move: true,
                        animation: {
                        enable: true,
                        speed: 60,
                        },
                    },
                    tilt: {
                        direction: "random",
                        enable: true,
                        move: true,
                        value: {
                        min: 0,
                        max: 360,
                        },
                        animation: {
                        enable: true,
                        speed: 60,
                        },
                    },
                    roll: {
                        darken: {
                        enable: true,
                        value: 25,
                        },
                        enable: true,
                        speed: {
                        min: 15,
                        max: 25,
                        },
                    },
                    wobble: {
                        distance: 30,
                        enable: true,
                        move: true,
                        speed: {
                        min: -15,
                        max: 15,
                        },
                    },
                    },
                    emitters: {
                    life: {
                        count: 0,
                        duration: 0.1,
                        delay: 0.4,
                    },
                    rate: {
                        delay: 0.1,
                        quantity: 150,
                    },
                    size: {
                        width: 0,
                        height: 0,
                    },
                    },
                },
            });
        }
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