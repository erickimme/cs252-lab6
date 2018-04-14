function Cell(i, j, w, character) {
  this.i = i;
  this.j = j;
  this.x = i * w;
  this.y = j * w;
  this.w = w;

  this.character = character;
}

Cell.prototype.show = function() {
  stroke(0);
  // fill in boxes
  if (this.j == 0) {
    // player 1 starting side
    fill("#58ACFA");
    rect(this.x, this.y, this.w, this.w);
    fill(0);
    text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
  } else if (this.j == 12) {
    // player 2 starting side
    fill("#FA5858");
    rect(this.x, this.y, this.w, this.w);
    fill(0);
    text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
  } else {
    noFill();
    rect(this.x, this.y, this.w, this.w);
    fill(0);
    text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
  }

  if (this.turn == 2) {
    fill('#87CEFA');
    rect(this.x, this.y, this.w, this.w);
    fill (0);
    text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);

  } else if (this.turn == 1) {
    fill('#fa8072');
    rect(this.x, this.y, this.w, this.w);
    fill (0);
    text(this.character, this.x + this.w * 0.43, this.y + this.w - 20);
  }
  // if (this.revealed) {
  //   if (this.bee) {
  //     fill(127);
  //     ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
  //   } else {
  //     fill(200);
  //     rect(this.x, this.y, this.w, this.w);
  //     if (this.neighborCount > 0) {
  //       textAlign(CENTER);
  //       fill(0);
  //       text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
  //     }
  //   }
  // }
}

Cell.prototype.contains = function(x, y) {
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.colorIn = function(turn) {
  this.turn = turn;
}