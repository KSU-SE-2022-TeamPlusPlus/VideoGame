import { Timer } from "./timer.js";

const RUNNER_HOME = new p5.Vector(60, 350);
const RUNNER_SIZE = new p5.Vector(150, 150);

export class Runner {
	static image;
	// static delozier;
	
	static sfxBark;
	
	static preload() {
		Runner.image = loadImage("assets/dog_runner.gif");
		// Runner.delozier = loadImage("assets/tractor.png");
		
		Runner.sfxBark = loadSound("assets/bark.mp3");
		Runner.sfxBark.setVolume(1/2);
		Runner.sfxBark.playMode('untilDone');
	}
	
	constructor() {
		this.time = 0;
		this.yOffset = 0;
		this.walkTimer = new Timer(1/12);
	}
	
	update(dt) {
		// if (WORLD.soundsEnabled) {
			Runner.sfxBark.play();
		// }
		
		this.time += dt;
		// this.yOffset = Math.round(Math.abs(Math.sin(this.time * TAU * 16)) * 2);
	}
	
	draw() {
		image(
			Runner.image,
			RUNNER_HOME.x - RUNNER_SIZE.x / 2,
			RUNNER_HOME.y - RUNNER_SIZE.y + this.yOffset,
			RUNNER_SIZE.x, RUNNER_SIZE.y
		);
	}
}
