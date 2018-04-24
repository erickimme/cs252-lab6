function make2DArray(cols, rows) {
  var arr = new Array(rows);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

function prepGame() {
	console.log("in prep game");
	longestWord = "";
	totalLength = 0;
	numWords = 0;
	var afterGame = document.getElementById("afterGame");
  	afterGame.style.display = "none";
  	var forGame = document.getElementById("duringGame");
  	forGame.style.display = "block";
}

function prepFinish() {
	console.log("in prep finish");
  	var forGame = document.getElementById("duringGame");
  	forGame.style.display = "none";
  	var afterGame = document.getElementById("afterGame");
  	afterGame.style.display = "block";
}

var grid;	// 13 rows by 11 cols
var cols;	// default of 11
var rows;	// default of 13
var w = 50;
var turn = 1; // player 1's turn first
var word = ""; // word the player is forming
var wordCoords = []; // indexes of the word the player is forming
var longestWord = "";
var totalLength = 0;
var numWords = 0;

var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M',
	'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var frequencies = [10.167, 1.492, 2.782, 4.253, 12.702, 2.228, 2.015, 
	5.094, 7.966, 0.153, 0.772, 4.025, 2.406, 6.749, 8.507, 1.929, 0.095, 
	5.987,6.327, 6.056, 2.758, 0.978, 2.360, 0.150, 1.974, 0.074];
var cumFrequencies = []; // populated in setup

function setup() {
  prepGame();
  createCanvas(551, 651);

  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);
  // calculate cumulative frequencies
  var cum = 0;
  for (var i = 0; i < frequencies.length; i++) {
  	cumFrequencies[i] = frequencies[i] + cum;
  	cum = cum + frequencies[i];
  }

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
    	var character = getChar();
    	grid[i][j] = new Cell(i, j, w, character);
    }
  }

  // reset word, wordCoords, turn
  word = "";
  resetWordField();
  wordCoords = [];
  turn = 1;
}

function draw() {
  background(255);
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      	grid[i][j].show();
    }
  }
}

// generate random char from alphabet using the frequencies array
function getChar() {
	// generate random number from 0->max
	var random = Math.random() * cumFrequencies[cumFrequencies.length - 1];

	// binary search to find first value greater than or less than value of random
	var minIndex = 0;
	var maxIndex = cumFrequencies.length - 1;
	var currentElement;
	var currentIndex;

	var foundIndex = -1;

	while (minIndex <= maxIndex) {
		currentIndex = (minIndex + maxIndex) / 2 | 0;
		currentElement = cumFrequencies[currentIndex];

		if (currentElement < random) {
			if (currentIndex < cumFrequencies.length) {
				if (cumFrequencies[currentIndex + 1] > random) {
					foundIndex = currentIndex + 1;
					break;
				} 
			}
			minIndex = currentIndex + 1;
		} else if (currentElement > random) {
			maxIndex = currentIndex - 1;
		} else {
			foundIndex = currentIndex;
			break;
		}
	}

	if (foundIndex == -1) {
		foundIndex = 0;
	}

	return alphabet[foundIndex];
}


function isGameOver(turn) {
	/** check if there is red in blue starting area or blue
	 in red starting area depending on which turn it is **/
	 var checkColor;
	 var checkRow;
	 if (turn == 1) {
	 	checkRow = 12;
	 	checkColor = "lightBlue";
	 } else if (turn == 2) {
	 	checkRow = 0;
	 	checkColor = "lightRed";
	 }

	 for (var j = 0; j < cols; j++) {
	 	if (grid[checkRow][j].color === checkColor) {
	 		return true;
	 	}
	 }

	 return false;
}

function gameOver(turn) {
	// handle game over
	console.log("in win");
	var avgWord = (totalLength + 0.0)/ numWords;
	avgWord = avgWord.toFixed(3);

	writeData(uid, longestWord, avgWord);
	// minimize all UI components and display Game Over and return to landing page button
	prepFinish();

}

// check if two blocks are adjacent in all 8 directions
function isAdjacent(x1, y1, x2, y2) {
	if (x1 == x2 && y1 == y2) {
		clearPressIfNeeded(x1, y1);
		return false;
	}
	if (Math.abs(x1 - x2) > 1 || Math.abs(y1 - y2) > 1) {
		return false;
	}
    var dx = Math.abs(x1 - x2);
    var dy = Math.abs(y1 - y2);
    return (dx + dy <= 2);
}

// check if already visited this block before for not
function noOverlap(x, y) {
	for (var i = 0; i < wordCoords.length; i++) {
		var prev = wordCoords[i].split(" ");
		var prevX = prev[0];
		var prevY = prev[1];
		if (x == prevX && y == prevY) {
			return false;
		}
	}
	return true;
}

function mousePressed() {
	for (var x = 0; x < rows; x++) {
		for (var y = 0; y < cols; y++) {
	    	if (grid[x][y].contains(mouseX, mouseY)) {
	    		if (word.length >= 21) {
	    			alert("You have reached the max length for a word");
	    			return;
	    		}

		      	if (word.length === 0) {
		      		// if choosing first letter, must start at an already owned block
		      		if ((turn == 1 && grid[x][y].color.localeCompare("blue") == 0) ||
		      		 (turn == 2 && grid[x][y].color.localeCompare("red") == 0))  {
		      			grid[x][y].colorIn(turn);
		      			word += grid[x][y].character;
		      			var coords = x + " " + y;
		      			wordCoords.unshift(coords);
		      		}
		      	} else {
		      		// if already chosen first letter, must choose adjacent block to first value in wordCoords
		      		var recentCoords = wordCoords[0].split(" ");
		      		if (isAdjacent(x, y, recentCoords[0], recentCoords[1]) && noOverlap(x, y)) {
		      			grid[x][y].colorIn(turn);
		      			word += grid[x][y].character;
		      			var coords = x + " " + y;
		      			wordCoords.unshift(coords);
		      		}
		      	}

		      	resetWordField();
	      	}
		}
	}
}

function clearPressIfNeeded(x, y) {
	var curr = grid[x][y];
	var prevCoords = wordCoords[0].split(" ");
	// if clicked on box is the end of current word, change color back to original color
	console.log("clicked on");
	console.log(x, y);
	console.log("Previous Coord");
	console.log(prevCoords[0], prevCoords[1]);
	if(x == prevCoords[0] && y == prevCoords[1]) {
		if (y == 0 || y == 12) {
			console.log("ENTERED BASE");
			curr.resetColor();
		} else {
			curr.resetColor();
		}
		word = word.substring(0, word.length - 1);
		console.log(wordCoords.shift());
	}
}

function isValid(word) {
	// fetch("https://wordsapiv1.p.mashape.com/words/soliloquy", {
	// 	headers: {
	// 		"X-Mashape-Key":"qgGsAcowYfmsh1HPJGVMvXHOAzpHp19qyavjsnm2Kjvx78TQdl",
	// 		"Accept":"application/json",
	// 	},
	// 	"mode":"no-cors"

	// }).then(function(reponse){
	// 	return response.json();
	// }).then(function(response) {
	// 	console.log(response);
	//   //console.log(response.status, response.headers, response.body);
	// })

	getWord(word);
	

	return true;
}

// check if word is valid and switch turns if user did enter valid
function checkWord() {
	// check if length of word selected is valid
	if (word == "") {
		alert("Please select a valid word");
		return;
	}
	if (word.length <= 1) {
   		alert("Selected word must be larger than a length of one");
   		word = "";
   		wordCoords = [];
   		clearWord();
	    return;
	}

	// check if all letters of selected word is preowned or not
	var oldColor;
	var turnColor;
	if (turn == 1) {
		oldColor = "blue";
	} else if (turn == 2) {
		oldColor = "red";
	}
	for (var i = 0; i < wordCoords.length; i++) {
		var coords = wordCoords[i].split(" ");
		if (!(grid[coords[0]][coords[1]].setColor === oldColor)) {
			break;
		}
		if (i == wordCoords.length - 1) {
			// all letters selected for word are already owned
			alert("Make sure your word does not consist completely of previously owned letters");
			word = "";
   			wordCoords = [];
   			clearWord();
			return;
		}
	}

	// TODO: change checking: check if word is valid
//	var validWord = isValid(word);
	var validWord = true;

	if (validWord) {
		// change if needed, average word length + longest word
		numWords++;
		totalLength += word.length;
		if (word.length > longestWord.length) {
			longestWord = word;
		}

		var avgLength = (totalLength + 0.0)/ numWords;
		avgLength = avgLength.toFixed(3);
		console.log("average length: ");
		console.log(avgLength);
		console.log("longestWord: ");
		console.log(longestWord);

		// Change color to dark version for the current color
		for (var i = 0; i < wordCoords.length; i++) {
			var coords = wordCoords[i].split(" ");
			grid[coords[0]][coords[1]].darkenColor(turn);
		}

		// Check if any of the opponents blocks are not connected
		// Find connected components that are not linked to each person's base line
		removeIslands(turn);

		// // check if game over
		if (isGameOver(turn)) {
			gameOver(turn);
			return;
		}

		// switch user + reset word, wordcCoords, wordField
		if (turn == 1) {
			turn = 2;
		} else if(turn == 2){
			turn = 1;
		}

		// change color of player and button button highlight
		if (turn == 1) {
			document.getElementById("currentTurn").innerHTML = "PLAYER ONE";
			document.getElementById("currentTurn").setAttribute("class", " turnPos currentTurnOne helveticaLarge");
			document.getElementById("checkButton").setAttribute("class", "btn checkWordOne checkPos");
			document.getElementById("cancelButton").setAttribute("class", "btn cancelWordOne cancelPos");
		} else if (turn == 2) {
			document.getElementById("currentTurn").innerHTML = "PLAYER TWO";
			document.getElementById("currentTurn").setAttribute("class", " turnPos currentTurnTwo helveticaLarge");
			document.getElementById("checkButton").setAttribute("class", "btn checkWordTwo checkPos");
			document.getElementById("cancelButton").setAttribute("class", "btn cancelWordTwo cancelPos");
		}

		word = "";
		wordCoords = [];
		resetWordField();
	} else {
		// if not valid, let user know the word is not valid and erase the highlighed portion
		alert("\"" + word + "\" is not a valid word, please find a valid English word");
		word = "";
		wordCoords = [];
		clearWord();
	}
}

// clear previously highlighted if user clicks cancel word
 function clearWord() {
 	word = "";
 	wordCoords = [];
 	resetWordField();
 	for (var i = 0; i < rows; i++) {
 		for (var j = 0; j < cols; j++) {
 			var curr = grid[i][j];
 			if (curr.color.localeCompare("lightBlue") == 0 || curr.color.localeCompare("lightRed") == 0) {
    			curr.resetColor();
 			}
 		}
 	}
 }

 function resetWordField() {
	var display = document.getElementById("currentWord");
  	display.innerHTML = "\"" + word + "\"";
  	display.setAttribute("class", "helveticaLarge wordPos");
 }

 function isSafe(grid, i, j, visited, currConnected, turnColor) {
 	if (i < 0 || i >= rows || j < 0 || j >= cols || visited[i][j]) {
 		return false;
 	}

 	return (grid[i][j].color === turnColor);
 }

 function DFS(grid, i, j, visited, currConnected, turnColor) {
 	// populate the currConnected array with cells that are connected
 	var rowDelta = new Array(-1, -1, -1,  0, 0,  1, 1, 1);
 	var colDelta = new Array(-1,  0,  1, -1, 1, -1, 0, 1);

 	visited[i][j] = true;
 	for (var k = 0; k < 8; k++) {
 		if (isSafe(grid, i + rowDelta[k], j + colDelta[k], visited, currConnected, turnColor)) {
 			currConnected.push((i + rowDelta[k]) + " " + (j + colDelta[k]));
        	currConnected = DFS(grid, i + rowDelta[k], j + colDelta[k], visited, currConnected, turnColor);
 		}
 	}

 	return currConnected;
 }

 function containsBaseLine(component, turn) {
 	var level = -1;
 	if (turn == 1) {
 		level = 12;
 	} else if (turn == 2) {
 		level = 0;
 	}


 	for (var i = 0; i < component.length; i++) {
 		var cellCoords = component[i].split(" ");
 		if (cellCoords[0] == level) {
 			return true;
 		}
 	}
 }

 function removeIslands(turn) {
 	var visited = [];	// array to detect if cell has been visited in search
 	var connectedComponents = [];	// array of all connected components, which are arrays
 	for (var i = 0; i < rows; i++) {
 		visited[i] = [];
 		for (var j = 0; j < cols; j++) {
 			visited[i][j] = false;
 		}
 	}

 	var turnColor;
 	// turn color is color of opposite turn
 	if (turn == 1) {
 		turnColor = "red";
 	} else if (turn == 2) {
 		turnColor = "blue";
 	}

 	// find connected component that is not attached to the base row of the color and erase it
 	var count = 0;
 	for (var x = 0; x < rows; x++) {
 		for (var y = 0; y < cols; y++) {
 			if (visited[x][y] == false && (grid[x][y].color === turnColor)) {
 				visited[x][y] = true;
 				var currConnected = [];
 				currConnected.push(x + " " + y);
 				currConnected = DFS(grid, x, y, visited, currConnected, turnColor);
 				connectedComponents.push(currConnected);
 				count++;
 			}
 		}
 	}

 	// print out all conneted components to console
 	// for (var first = 0; first < connectedComponents.length; first++) {
 	// 	for (var sec = 0; sec < connectedComponents[first].length; sec++) {
 	// 		console.log(connectedComponents[first][sec]);
 	// 	}
 	// }

 	// if there is more than one connected component of that color
 	if (count > 1) {
 		// get rid of all conected components not connected to base
 		for (var i = 0; i < connectedComponents.length; i++) {
 			// change all blocks in the connected componenet to white
 			if (!containsBaseLine(connectedComponents[i], turn)) {
	 			for (var j = 0; j < connectedComponents[i].length; j++) {
	 				var cellCoords = connectedComponents[i][j].split(" ");
					var coordsX = cellCoords[0];
					var coordsY = cellCoords[1];

					var islandCell = grid[coordsX][coordsY];
					islandCell.colorIn(0);
	 			}
 			}
 		}
 	}
 }

 // module.exports = {
 // 	getCurrWord: function() {
 // 		return word;
 // 	}
 // };
