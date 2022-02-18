// Timer class to create a timer, which, after updated, can notify you if the timer has ticked.
// This can be used to step animations forward, or spawn in objects at a set interval.
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
	
	// Sets the timer to a new interval, preserving its percentage done.
	setInterval(intervalSeconds = 0.5) {
		this.timeRemaining = (this.timeRemaining / this.interval) * intervalSeconds;
		this.interval = intervalSeconds;
		this.ticked = false;
	}
};
