import { Timer } from "./timer.js"; 

export class ScoreTracker {
	constructor() {
		// Score & HighScore
		this.score = 0;
		this.highScore = 0;
		
		// Timer class handles delta time woes for us.
		this.timer = new Timer(1/30);
	}
	
	draw() {
		text("High Score: ", 30, 15); // Draws text "High Score: " in top left of canvas
		text(this.highScore, 95, 15); // Displays high score in top left
		
		text("Score: ", 700, 15);  // Draws text "Score: " in top right of canvas
		text(this.score, 735, 15); // Displays score in top right
	}
	
	update(dt) {
		this.timer.step(dt); // Like tracker++;
		
		// Increment score if timer has ticked.
		if (this.timer.isTicked()) // Like (tracker % 30 == 0)
			this.score++;
		
		// Set new high score if score high enough.
		if (this.score > this.highScore)
			this.highScore = this.score;
	}
}
