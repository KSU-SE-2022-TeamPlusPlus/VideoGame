export class Timer {
	// Makes a new timer that ticks every `intervalSeconds`
	constructor(intervalSeconds = 0.5) {
		this.timeRemaining = intervalSeconds;
		this.interval = intervalSeconds;
		this.ticked = false;
	}
	
	// Should supply the current deltaTime,
	// will push time forward for this timer.
	step(dt) {
		this.timeRemaining -= dt;
		this.ticked = this.timeRemaining <= 0;
		if (this.ticked) {
			this.timeRemaining = (this.timeRemaining % this.interval) + this.interval;
		}
	}
	
	// Returns if last step was a tick.
	isTicked() { return this.ticked; }
	
	// This preserves the progress into the timer.
	setInterval(intervalSeconds = 0.5) {
		this.timeRemaining = (this.timeRemaining / this.interval) * intervalSeconds;
		this.interval = intervalSeconds;
		this.ticked = false;
	}
};
