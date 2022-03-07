import { Timer } from "./timer.js";

const RUNNER_HOME = new p5.Vector(60, 245);

export class Runner {
	static image;
	
	static preload() {
		Runner.image = loadImage("assets/tractor.png");
	}
	
	constructor() {
		this.time = 0;
		this.yOffset = 0;
		this.walkTimer = new Timer(1/12);
	}
	
	update(dt) {
		this.time += dt;
		this.yOffset = Math.round(Math.abs(Math.sin(this.time * TAU * 16)) * 2);
	}
	
	draw() {
		image(
			Runner.image,
			RUNNER_HOME.x - 250 / 2,
			RUNNER_HOME.y - 250 / 2 + this.yOffset,
			250, 250
		);
	}
}
