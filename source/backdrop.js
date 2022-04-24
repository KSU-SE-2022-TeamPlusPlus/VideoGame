import { WORLD } from "./world.js";

export class Backdrop {
	static gfxYard;
	
	static preload() {
		Backdrop.gfxYard = loadImage("assets/backyard pixel path.png");
	}
	
	constructor(screenSize) {
		this.screenSize = screenSize;
		this.x = 0;
	}
	
	update(dt, speed) {
		this.x -= speed * dt;
		if (this.x < -width / WORLD.UNIT)
			this.x = this.x % (width / WORLD.UNIT);
	}
	
	draw() {
		image(Backdrop.gfxYard, Math.round(this.x * WORLD.UNIT), 0, this.screenSize.x, this.screenSize.y);
		image(Backdrop.gfxYard, Math.round(this.x * WORLD.UNIT + this.screenSize.x), 0, this.screenSize.x, this.screenSize.y);
	}
}
