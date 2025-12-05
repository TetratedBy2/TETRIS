//zrobione z pomocą jakiegoś tutoriala

const grid = document.getElementById("grid");
let gridSquares = Array.from(document.querySelectorAll(".grid div"));
let nextUpSquares = Array.from(document.querySelectorAll(".nextTetr > div > div"));
const scoreDisplay = document.getElementById("score");

const Tetrominoes = [iTetrominoe, oTetrominoe, tTetrominoe, jTetrominoe, lTetrominoe, sTetrominoe, zTetrominoe];
const tetrColors = ["cyan", "yellow", "pink", "blue", "orange", "green", "red"];

const displayWidth = 4;
const displayTetr = [
	[1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1], // i tetr
	[displayWidth + 1, displayWidth + 2, displayWidth * 2 + 1, displayWidth * 2 + 2], // o tetr
	[displayWidth, displayWidth + 1, displayWidth + 2, displayWidth * 2 + 1], // t tetr
	[2, displayWidth + 2, displayWidth * 2 + 1, displayWidth * 2 + 2],
	[1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 2 + 2],
	[displayWidth + 1, displayWidth + 2, displayWidth * 2, displayWidth * 2 + 1],
	[displayWidth, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 2 + 2]
];

let currentRotation = 0;
let currentPos = 4;

let random = Math.floor(Math.random() * Tetrominoes.length);
let nextUpTetr = new Array(5);
let nextUpTetrColor = new Array(5);
let dispNextUpTetr = new Array(5);

let currentTetromino;
let currentColor;

function startGame() {
	for (let i = 0; i < 5; i++) {
		random = Math.floor(Math.random() * Tetrominoes.length);
		nextUpTetr[i] = Tetrominoes[random];
		nextUpTetrColor[i] = tetrColors[random];
		dispNextUpTetr[i] = displayTetr[random];
	}
	currentTetromino = nextUpTetr[0];
	currentColor = nextUpTetrColor[0];
	generateNextTetr();
	displayNextUpTetr();
}

let score = 0;

function drawTetr() {
	currentTetromino[currentRotation].forEach(index => {
		gridSquares[currentPos + index].classList.add("tetromino");
		gridSquares[currentPos + index].style.backgroundColor = currentColor;
	});
}

function undrawTetr() {
	currentTetromino[currentRotation].forEach(index => {
		gridSquares[currentPos + index].classList.remove("tetromino");
		gridSquares[currentPos + index].style.backgroundColor = "#212121";
	});
}

function moveTetrLeft() {
	undrawTetr();
	const isAtLeftEdge = currentTetromino[currentRotation].some(index => (currentPos + index) % width === 0);
	
	if (!isAtLeftEdge) currentPos--;
	
	if (currentTetromino[currentRotation].some(index => gridSquares[currentPos + index].classList.contains("taken"))) {
		currentPos++;
	}
	
	drawTetr();
}

function moveTetrRight() {
	undrawTetr();
	const isAtRightEdge = currentTetromino[currentRotation].some(index => (currentPos + index) % width === width - 1);
	
	if (!isAtRightEdge) currentPos++;
	
	if (currentTetromino[currentRotation].some(index => gridSquares[currentPos + index].classList.contains("taken"))) {
		currentPos--;
	}
	
	drawTetr();
}

function isAtLeft() {
	return currentTetromino[currentRotation].some(index => (currentPos + index) % width === 0);
}

function isAtRight() {
	return currentTetromino[currentRotation].some(index => (currentPos + index + 1) % width === 0);
}

function isOnATetr() {
	return currentTetromino[currentRotation].some(index => gridSquares[currentPos + index].classList.contains("taken"));
}

function increaseRotation() {
	currentRotation = (currentRotation + 1) % 4;
}

function decreaseRotation() {
	currentRotation--;
	if (currentRotation < 0) currentRotation = 3;
}

function checkRotatedPosition(P) {
	P = P || currentPos;
	if (isOnATetr()) {
		currentPos -= width;
		checkRotatedPosition(P);
	}
	if ((P + 1) % width < 4) {
		if (isAtRight()) {
			currentPos++;
			checkRotatedPosition(P);
		}
	} else if (P % width > 5) {
		if (isAtLeft()) {
			currentPos--;
			checkRotatedPosition(P);
		}
	}
}

function quickRotateTetr() {
	undrawTetr();
	increaseRotation();
	checkRotatedPosition();
	drawTetr();
}

function dropDownTetr() {
	freezeTetr();
	undrawTetr();
	currentPos += width;
	drawTetr();
}

function control(e) {
	if (e.keyCode === 38) {
		quickRotateTetr();
	} else if (e.keyCode === 37) {
		moveTetrLeft();
	} else if (e.keyCode === 39) {
		moveTetrRight();
	} else if (e.keyCode === 40) {
		dropDownTetr();
	}
}

document.addEventListener("keydown", control);

function freezeTetr() {
	if (currentTetromino[currentRotation].some(index => gridSquares[currentPos + index + width].classList.contains("taken"))) {
		currentTetromino[currentRotation].forEach(index => gridSquares[currentPos + index].classList.add("taken"));
		
		currentRotation = 0;
		currentPos = 4;
		
		currentTetromino = nextUpTetr[0];
		currentColor = nextUpTetrColor[0];

		generateNextTetr();
		displayNextUpTetr();
		
		drawTetr();
		addScore();
		gameOver();
	}
}

function addScore() {
	for (let i = 0; i < 199; i += width) {
		const row = [i, i + 1, i + 2, i + 3, i + 4, i + 5, i + 6, i + 7, i + 8, i + 9];
	
		if (row.every(index => gridSquares[index].classList.contains("taken"))) {
			score += 10;
			scoreDisplay.innerText = score;
			row.forEach(index => {
				gridSquares[index].classList.remove("taken");
				gridSquares[index].classList.remove("tetromino");
				gridSquares[index].style.backgroundColor = "";
			});
			const squaresRemoved = gridSquares.splice(i, width);
			gridSquares = squaresRemoved.concat(gridSquares);
			gridSquares.forEach(cell => grid.appendChild(cell));
		}
	}
}

function clearBoard() {
	gridSquares.forEach(index => {
		index.classList.remove("tetromino");
		index.style.backgroundColor = "#212121";
	});
}

function gameOver() {
	if (currentTetromino[currentRotation].some(index => gridSquares[currentPos + index].classList.contains("taken"))) {
		scoreDisplay.innerText = "END";
		clearInterval(timer);
	}
}

function generateNextTetr() {
	random = Math.floor(Math.random() * Tetrominoes.length);
	for (let i = 0; i < 4; i++) {
		nextUpTetr[i] = nextUpTetr[i + 1];
		nextUpTetrColor[i] = nextUpTetrColor[i + 1];
		dispNextUpTetr[i] = dispNextUpTetr[i + 1];
	}
	nextUpTetr[4] = Tetrominoes[random];
	nextUpTetrColor[4] = tetrColors[random];
	dispNextUpTetr[4] = displayTetr[random];
}

function displayNextUpTetr() {
	var sqr = 0;
	for (let i = 0; i < 80; i++) {
		if (i > 0 && i % 16 === 0) sqr++;
		if (dispNextUpTetr[sqr].some(index => index === i % 16)) nextUpSquares[i].style.backgroundColor = nextUpTetrColor[sqr];
		else nextUpSquares[i].style.backgroundColor = "#212121";
	}
}

startGame();

drawTetr();
