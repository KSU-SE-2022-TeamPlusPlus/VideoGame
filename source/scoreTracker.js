var tracker = 0;
var score = 0;
var highScore = 0;

export class scoreTracker{
    draw(){
        text("High Score: ", 30, 15); 	// Sets text "High Score: " in top left of canvas
        text(highScore, 95, 15);	  	// Displays high score in top left
  
        text("Score: ", 700, 15);		// Sets text "Score: " in top right of canvas
        text(score, 735, 15);			// Displays score in top right
    }
    
    update(dt){
        tracker++;

        if(tracker % 30 == 0) score++;           // Updates every 1/2 secs, can be adjusted

	    if(score > highScore) highScore = score; // Used for displaying the highest score
    }
}