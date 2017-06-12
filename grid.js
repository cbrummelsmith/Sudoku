function Grid(){
	this.cells = [];
	this.initValues = [];
	this.solution = [];

	// make grid of cells
    for (var i = 0; i < 9; i++) {
        this.cells[i] = [];
        for (var j = 0; j < 9; j++) {
            this.cells[i][j] = new Cell(j, i);
        }
    }     	

    // initialize cell color
    for (var i = 0; i < 9; i++) {
		for(var j = 0; j < 9; j++) {

			if (i < 3){
				if (j < 3 || j >= 6) {
					this.cells[i][j].defaultColor = grey;
				}
			}
			else if (i >= 6) {
				if ((j < 3 || j >= 6)) {
					this.cells[i][j].defaultColor = grey;
				}
			}
			else if (i >= 3 && i < 6 && j >= 3 && j < 6 ) {
				this.cells[i][j].defaultColor = grey;
			} 
    	}
   	}

	this.show = function() {
    	for (var i = 0; i< 9; i++) {
    	    for (var j = 0; j< 9; j++) {
    	        this.cells[i][j].show();
    	    }
    	}     
	}
	this.load = function () {
		for (var i = 0; i < 81; i++) {
			this.initValues[i] = initValStr[i];
			this.solution[i] = solValStr[i];
			if (this.initValues[i] == '0') {
				this.initValues[i] = '';
			}
		}	
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++) {
				var cell = this.cells[i][j]
				var index = 9*i + j;
				cell.val = this.initValues[index];
				cell.solutionVal = this.solution[index];

				if (this.initValues[index] != '') {
					cell.locked = true;
				}
			}
		}
	}
	this.checkSolved = function() {
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++) {
				var cell = this.cells[i][j];
				if(cell.val != cell.solutionVal){
					return false;
				}
			}
		}
		return true 
	}




}
