let turn = "X";
let isGameOver = false;

// Function to change turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
}

// Function to check win
const checkWin = () => {
    let boxtexts = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 0, 5, 5, 12], // First row
        [3, 4, 5, 0, 15, 5, 12], // Second row
        [6, 7, 8, 0, 25, 5, 12], // Third row
        [0, 3, 6, -10, 15, 90, 12], // First column
        [1, 4, 7, 0, 15, 90, 12], // Second column
        [2, 5, 8, 10, 15, 90, 12], // Third column
        [0, 4, 8, 0, 15, 45, 18], // Diagonal top-left to bottom-right
        [2, 4, 6, 0, 15, -45, 18] // Diagonal top-right to bottom-left
    ];
    wins.forEach(e => {
        if ((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && 
            (boxtexts[e[1]].innerText === boxtexts[e[2]].innerText) && 
            (boxtexts[e[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtexts[e[0]].innerText + " Won";
            isGameOver = true;
            document.querySelector('.imgbox img').style.display = "block";
            let line = document.querySelector('.line');
            line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
            line.style.width = `${e[6]}vw`;
        }
    });

    // Check for draw
    if (!isGameOver) {
        let draw = true;
        Array.from(boxtexts).forEach(box => {
            if (box.innerText === "") {
                draw = false;
            }
        });
        if (draw) {
            document.querySelector('.info').innerText = "Draw Match";
            isGameOver = true;
        }
    }
}

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isGameOver) {
            boxtext.innerText = turn;
            turn = changeTurn();
            checkWin();
            if (!isGameOver) {
                document.querySelector('.info').innerText = "Turn for " + turn;
            }
        }
    });
});

// Add onclick listener to reset button
document.getElementById('reset').addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X";
    isGameOver = false;
    document.querySelector('.info').innerText = "Turn for " + turn;
    document.querySelector('.imgbox img').style.display = "none";
    document.querySelector('.line').style.width = "0";
});
