// Barrier class to draw walls, and barriers on the screen for player to avoid or jump over
// It will allow to move() and draw() and have collision() detection
// New barrier gets drawn automatically at a random location off screen 
// once the current barrier has moved off screen
export class Barrier {
	constructor(x, y) {
		this.x = x; //initial values 0 for coordinates
		this.y = y;
	}
	
	get xVal() { return this.x; } // return values of x and y
	get yVal() { return this.y; }
	
	set xVal(x) { this.x = x; }  //set new values for x and y
	set yVal(y) { this.y = y; }
	
	move(speed) { //moves the x position by the current speed of background movement
		this.x = this.x - speed;
		if (this.x < -200) { 				//once the barrier has already moved off screen 
			this.x = random(850, 1600);		//put a new barrier at a random location off screen
		}
	}
};
