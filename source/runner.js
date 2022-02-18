import { Timer } from "./timer.js";

const RUNNER_HOME = new p5.Vector(15, 205);

export class Runner {
	static image = [];
	
	static preload() {
		Runner.image = [];
		for (let i = 0; i < 7; i++) {
			Runner.image.push(loadImage(`assets/runner${i}.png`));
		}
	}
	
	constructor() {
		this.frame = 0;
		this.walkTimer = new Timer(1/12);
	}
	
	update(dt) {
		// If enough time has passed...
		this.walkTimer.step(dt);
		if (this.walkTimer.isTicked()) {
			// ...switch the runner's frame to the next one.
			this.frame = (this.frame + 1) % Runner.image.length;
		}
	}
	
	draw() {
		image(Runner.image[this.frame], RUNNER_HOME.x, RUNNER_HOME.y, 130, 130);
	}
}
