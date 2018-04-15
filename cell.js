function Cell(i, j, w, character) {
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;

  this.turn = 0;
  this.reset = false;
  this.character = character;
}

Cell.prototype.show = function() {
  stroke(0);
  if (this.reset == false) {
    // fill in boxes (SETUP)
    if (this.j == 0) {
      // player 1 starting side
      fill("#58ACFA");
      rect(this.x, this.y, this.w, this.w);
      fill(0);
      text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
      this.color = "red";
    } else if (this.j == 12) {
      // player 2 starting side
      fill("#FA5858");
      rect(this.x, this.y, this.w, this.w);
      fill(0);
      text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
      this.color = "blue";
    } else {
      noFill();
      rect(this.x, this.y, this.w, this.w);
      fill(0);
      text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
      this.color = "white";
    }

    // fill in boxes (DURING GAME)
    if (this.turn == 1) {
      fill('#87CEFA');
      rect(this.x, this.y, this.w, this.w);
      fill (0);
      text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
      this.color = "lightBlue";
    } else if (this.turn == 2) {
      fill('#fa8072');
      rect(this.x, this.y, this.w, this.w);
      fill (0);
      text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
      this.color = "lightRed";
    }
  } else {
    // if reset rows are bottom row
    if (this.j == 12) {
      fill('#FA5858');
      rect(this.x, this.y, this.w, this.w);
      fill (0);
      text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
      this.color = "blue";
    } else if (this.j == 0) {
      // if reset rows are top row
      fill('#58ACFA');
      rect(this.x, this.y, this.w, this.w);
      fill (0);
      text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
      this.color = "red";
    }else {
      // if reset rows are in between top and bottom
      fill('#FFFFFF');
      rect(this.x, this.y, this.w, this.w);
      fill (0);
      text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
      this.color = "white";
    }
  } 
}

Cell.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.colorIn = function(turn) {
  this.reset = false;
  this.turn = turn;
}

Cell.prototype.resetColor = function() {
  this.reset = true;
}