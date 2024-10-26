console.log("script loaded");
const btn = document.querySelectorAll(".btn");
const start = document.querySelector(".start");
const msg = document.querySelector(".msg");
const end = document.querySelector(".End");
const boxes = document.querySelectorAll(".box");

const winPatterns = [
    [0, 1, 2], // Adjusted for zero-based indexing
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let turnO = true;
let count = 0;

start.addEventListener("click", () => {
    updateMsg();
    resetGame(); // Add reset functionality
});

function updateMsg() {
    msg.textContent = "Let's Start Game! All the best";
}

end.addEventListener("click", () => {
    changeMsg();
    resetGame(); // Add reset functionality
});

function changeMsg() {
    msg.textContent = "Game is Finished.";
}

function resetGame() {
    boxes.forEach(box => {
        box.textContent = ""; // Clear all boxes
        box.addEventListener("click", handleClick); // Re-add event listeners
    });
    turnO = true; // Reset turn
    count = 0; // Reset count
    msg.textContent = "Let's Start Game! All the best";
}

function handleClick(event) {
    const box = event.target;
    if (box.textContent === "") {
        box.textContent = turnO ? "O" : "X";
        count++;
        if (checkWinner()) {
            return; // Stop if there's a winner
        }
        turnO = !turnO; // Switch turn
        box.removeEventListener("click", handleClick);
    }
}

boxes.forEach(box => {
    box.addEventListener("click", handleClick);
});

function checkWinner() {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].textContent;
        let pos2val = boxes[pattern[1]].textContent;
        let pos3val = boxes[pattern[2]].textContent;

        if (pos1val !== "" && pos1val === pos2val && pos1val === pos3val) {
            showWinner(pos1val);
            return true; // A winner is found
        }
    }
    return false; // No winner
}

function showWinner(winner) {
    msg.textContent = `${winner} wins!`;
}
