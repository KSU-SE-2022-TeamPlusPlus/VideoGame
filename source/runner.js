import { Timer } from "./timer.js";

const RUNNER_HOME = new p5.Vector(15, 205);

export class Runner {
	static image;
	
	static preload() {
		Runner.image = loadImage("assets/dog_runner.gif");
	}
	
	constructor() {
		this.frame = 0;
		this.walkTimer = new Timer(1/12);
	}
	
	update(dt) {
		// Nothing here yet.
	}
	
	draw() {
		image(Runner.image, RUNNER_HOME.x, RUNNER_HOME.y, 130, 130);
	}
}
