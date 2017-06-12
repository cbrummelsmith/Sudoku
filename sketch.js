var cell;
var canvas;
var grid;
var SIZE = 55;
var white = 255;
var dgrey = 210;
var grey = 238;
var black = 0;
var BACKSPACE = 8;  // backspace key code
var gridPath = 'boardValuesOneLine'
var solPath = 'Solutions'
var initValStr;
var solValStr;
var solvedTxt;
var boardFilenames;
var allBoards;
var allDifficulties
var selectDifficulty;
var newBoardButton;
var solveButton;
var difficulty;
var numDifficulty;
var allBoardsHash = {};
var allSolutionsHash = {};

function preload() {
	allBoards = loadStrings('allBoardValuesOneLine.txt');
	allSolutions = loadStrings('allSolutions.txt');
	allDifficulties = loadStrings('allDifficulties.txt');
}

function setup() {
	canvas = createCanvas(9*SIZE+1,9*SIZE+1);
	selectDifficulty = createSelect(50,50,50);
	newBoardButton   = createButton("New Board");
	solveButton = createButton("Solve")
	selectDifficulty.option("Very Easy");
	selectDifficulty.option("Easy");
	selectDifficulty.option("Moderate");
	selectDifficulty.option("Hard");
	selectDifficulty.option("Very Hard");
	selectDifficulty.option("Extremely Hard");

	selectDifficulty.position(6, canvas.height+15)
	newBoardButton.position(120, canvas.height+15)
	solveButton.position(width-solveButton.width+10, canvas.height+15)

	newBoardButton.mousePressed(initializeSudoku);
	solveButton.mousePressed(solve);

	numDifficulty = countOccurances(allDifficulties);

	allBoardsHash["Very Easy"] = []
	allBoardsHash["Easy"] = []
	allBoardsHash["Moderate"] = []
	allBoardsHash["Hard"] = []
	allBoardsHash["Very Hard"] = []
	allBoardsHash["Extremely Hard"] = []
	
	allSolutionsHash["Very Easy"] = []
	allSolutionsHash["Easy"] = []
	allSolutionsHash["Moderate"] = []
	allSolutionsHash["Hard"] = []
	allSolutionsHash["Very Hard"] = []
	allSolutionsHash["Extremely Hard"] = []

	// add each board to an assosiative array where key is difficulty
	console.log(allBoardsHash)
	for(var i = 0; i < allBoards.length; i++){
		allBoardsHash[allDifficulties[i]].push([allBoards[i]])
		allSolutionsHash[allDifficulties[i]].push([allSolutions[i]])
	}	

	var sudokuIndx = 0;
	var Board = allBoards[sudokuIndx];

	initValStr = "000000000000000000000000000000000000000000000000000000000000000000000000000000000"
	solValStr  = "100000000000000000000000000000000000000000000000000000000000000000000000000000000"
	grid = new Grid();
	grid.load();
	solvedTxt = createP('');

}

function draw() {
	background(200);
	grid.show();

	if (grid.checkSolved()) {
		solvedTxt.html("<br/>Solved!");
	}

}

function mouseClicked() {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			cell = grid.cells[i][j];
			if (cell.inCell(mouseX, mouseY)) {
				cell.toggleClicked();
			}
			else {
				cell.clicked = false;
			}
		}
	}
}

function keyPressed() {
	// Check for user input. Update clicked cell value
	// with value from keyboard input.
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			cell = grid.cells[i][j];
			if (cell.clicked && (!isNaN(key) || keyCode == BACKSPACE) && !cell.locked) {
				if (!cell.locked) {
					cell.val = key;
				}
			}
		}
	}
}
function keyReleased() {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			cell = grid.cells[i][j];
			if (!cell.locked) {
				cell.clicked = false;
			}
		}
	}		
}

function initializeSudoku() {
	difficulty = selectDifficulty.value();
	indx = int(random(numDifficulty[difficulty]))
	initValStr = allBoardsHash[difficulty][indx][0];
	solValStr  = allSolutionsHash[difficulty][indx][0];
	grid = new Grid();
	grid.load();
	solvedTxt.html('')
}

countOccurances = function(arr) {
	var count = {};
	for (var i = 0; i < arr.length; i++) {
		count[arr[i]] = (count[arr[i]] || 0) + 1 
	}
	return count
}

solve = function() {
	initValStr = solValStr;
	grid = new Grid();
	grid.load()
}





