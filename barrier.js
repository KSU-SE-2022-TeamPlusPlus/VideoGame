// Barrier class to draw walls, and barriers on the screen for player to avoid or jump over
// It will allow to move() and draw() and have collision() detection
export class Barrier {
	constructor(x, y) {
		this.x = x; //initial values 0 for coordinates
		this.y = y;
	}
	
	get xVal() { return this.x; }
	get yVal() { return this.y; }
	
	set xVal(x) { this.x = x; }
	set yVal(y) { this.y = y; }
	
	move(speed) { //moves the x position by the current speed of background movement
		this.x = this.x - speed;
		if (this.x < -200) {
			this.x = random(850, 1600);
		}
	}
};
