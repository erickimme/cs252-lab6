function Cell(i, j, w, character) {
  this.i = i;
  this.j = j;
  this.x = j * w;
  this.y = i * w;
  this.w = w;

  this.turn = 0;
  this.reset = false;
  this.belong = false;
  this.character = character;
  this.color = "";
  this.setColor = "";
}

Cell.prototype.show = function() {
  stroke(0);
  if (this.reset == false && this.belong == false) {
    // fill in boxes (SETUP)
    if (this.i == 0 && this.turn == 0) {
      // player 1 starting side
      fill("#58ACFA");
      rect(this.x, this.y, this.w, this.w);
      fill(0);
      text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
      this.color = "blue";
      this.setColor = "blue";
    } else if (this.i == 12 && this.turn == 0) {
      // player 2 starting side
      fill("#FA5858");
      rect(this.x, this.y, this.w, this.w);
      fill(0);
      text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
      this.color = "red";
      this.setColor = "red";
    } else if (this.turn == 0){
      noFill();
      rect(this.x, this.y, this.w, this.w);
      fill(0);
      text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
      this.color = "white";
      this.setColor = "white";
    } else if (this.turn == 1) {
      // if game has already started
      fill('#87CEFA');
      rect(this.x, this.y, this.w, this.w);
      fill (0);
      text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
      this.color = "lightBlue";
    } else if (this.turn == 2) {
      // if game has already started
      fill('#fa8072');
      rect(this.x, this.y, this.w, this.w);
      fill (0);
      text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
      this.color = "lightRed";
    }
  } else if (this.reset == true && this.belong == false) {
    // if reset rows are top row
    if (this.i == 0) {
      fill('#58ACFA');
      rect(this.x, this.y, this.w, this.w);
      fill (0);
      text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
      this.color = "blue";
      this.setColor = "blue";
    } else if (this.i == 12) {
      // if reset rows are bottom row
      fill('#FA5858');
      rect(this.x, this.y, this.w, this.w);
      fill (0);
      text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
      this.color = "red";
      this.setColor = "red";
    }else {
      // if reset rows are in between top and bottom
      if (this.setColor.localeCompare("blue") == 0) {
        fill('#58ACFA');
      } else if (this.setColor.localeCompare("red") == 0) {
        fill('#FA5858');
      } else {
        fill('#FFFFFF');
      }
      rect(this.x, this.y, this.w, this.w);
      fill (0);
      text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
      this.color = this.setColor;
    }
  } else if (this.belong == true) {
      // color in the block to blue or red depending on turn
      if (this.turn == 1) {
        fill('#58ACFA');
        rect(this.x, this.y, this.w, this.w);
        fill (0);
        text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
        this.color = "blue";
        this.setColor = "blue";
      } else if (this.turn == 2) {
        fill('#FA5858');
        rect(this.x, this.y, this.w, this.w);
        fill (0);
        text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
        this.color = "red";
        this.setColor = "red";
      }
  }
}

Cell.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.colorIn = function(turn) {
  this.reset = false;
  this.belong = false;
  this.turn = turn;
}

Cell.prototype.resetColor = function() {
  this.reset = true;
 // this.belong = false;
}

Cell.prototype.darkenColor = function(turn) {
  this.belong = true;
  this.turn = turn;
}