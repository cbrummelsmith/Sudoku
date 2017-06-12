function Cell(i,j){
	this.size = SIZE;
	this.i = i;
	this.j = j;
	this.x = this.i*this.size;
	this.y = this.j*this.size;
	this.defaultColor = white;
	this.color = this.defaultColor;
	this.clickedColor = dgrey
	this.defaultVal = '';
	this.val = this.defaultVal;
	this.solutionVal = ''
	this.clicked = false;
	this.locked = false;

	this.show = function() {

		if (this.clicked) {
			this.color = this.clickedColor;
		}
		else {
			this.color = this.defaultColor;
		}
		// Draw cell rect
		fill(this.color);
		rect(this.x, this.y, this.size, this.size);

		// Draw cell value
		fill(black);
		textAlign(CENTER, CENTER);
		if (this.locked) {
			textStyle(BOLD);
		}
		else{
			textStyle(NORMAL);
		}
		textSize(SIZE/2.8)
		text(this.val, this.x+3, this.y, this.size, this.size);
	}

	this.setVal = function(v) {
		this.val = v;
	}

	this.inCell = function(x, y) {
		return (x > cell.x && x < cell.x + cell.size && y > cell.y && y < cell.y + cell.size);
	}

	this.toggleClicked = function() {
		if (this.clicked) {
			this.clicked = false;
		}
		else{ 
			this.clicked = true;
		}
	}
}
