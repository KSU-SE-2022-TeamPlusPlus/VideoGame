import { Barrier } from "./barrier.js";
import { Timer } from "./timer.js";

export class BarrierManager {
	constructor() {
		this.barriers = [];
	}
	
	pushBarrier(variant, ofs = 0) {
		this.barriers.push(
			new Barrier(variant, createVector(900 + ofs, 240))
		);
		this.spawnRate = new Timer(1.5);
	}
	
	// TODO: bgSpeed is strange here but whatever
	update(dt, bgSpeed) {
		for (let barrier of this.barriers) {
			barrier.move(bgSpeed);
		}
		
		this.barriers = this.barriers.filter(b => b.position.x > -150);
		
		// TODO: no
		this.spawnRate.step(dt);
		if (this.spawnRate.isTicked()) {
			this.pushBarrier(random(Object.keys(Barrier.VARIANTS)), random(200));
		}
	}
	
	draw() {
		// TODO: z-sorting?
		for (const BARRIER of this.barriers) {
			BARRIER.draw();
		}
	}
}
