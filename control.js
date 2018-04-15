function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

var grid;
var cols;
var rows;
var w = 50;
var turn = 1; // player 1's turn first
var alphabet = ['A','B','C','D','E','F','G','H','I','J','K','L','M',
	'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
var frequencies = [10.167, 1.492, 2.782, 4.253, 12.702, 2.228, 2.015, 
	5.094, 7.966, 0.153, 0.772, 4.025, 2.406, 6.749, 8.507, 1.929, 0.095, 
	5.987,6.327, 6.056, 2.758, 0.978, 2.360, 0.150, 1.974, 0.074];

var cumFrequencies = [];

function setup() {
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

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
    	var character = getChar();
    	grid[i][j] = new Cell(i, j, w, character);
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

function gameOver() {

}

function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].colorIn(turn);
      }
    }
  }
}

function draw() {
  background(255);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}

// check if word is valid and switch turns if user did enter valid
function checkWord() {
	if (turn == 1) {
		turn = 2;
	} else if(turn == 2){
		turn = 1;
	}
}

// clear previously highlighted if user clicks clear word
 function clearWord() {
 	for (var i = 0; i < rows; i++) {
 		for (var j = 0; j < cols; j++) {
 			var curr = grid[j][i];
 			if (curr.color.localeCompare("lightBlue") == 0 || curr.color.localeCompare("lightRed") == 0) {
    			curr.resetColor();
 			}
 		}
 	}
 }






















