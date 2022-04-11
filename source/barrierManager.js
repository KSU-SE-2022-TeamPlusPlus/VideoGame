import { Barrier } from "./barrier.js";
import { Timer } from "./timer.js";
import { WORLD } from "./world.js";

export class BarrierManager {
	constructor() {
		this.barriers = [];
		this.spawnRate = new Timer(2);
	}
	
	pushBarrier(variant, ofs = 0) {
		let laneRange = 3 - Math.ceil(Barrier.VARIANTS[variant].boxSize.z);
		let randomLane = Math.round(random(laneRange)) - laneRange / 2;
		this.barriers.push(
			new Barrier(variant, createVector(10 + ofs, 0, randomLane))
		);
	}
	
	// TODO: actually, should we accept a line between two points and
	// check if that line is in the cube? i think i know the algorithm
	// for that, then
	checkAgainstBarriers(point) {
		for (const BARRIER of this.barriers) {
			const BARRIER_V = Barrier.VARIANTS[BARRIER.variant];
			let pointRB = point.copy().sub(BARRIER.position);
			if (
				pointRB.y >= 0
				&& pointRB.y < +BARRIER_V.boxSize.y
				&& pointRB.x > -BARRIER_V.boxSize.x / 2
				&& pointRB.x < +BARRIER_V.boxSize.x / 2
				&& pointRB.z > -BARRIER_V.boxSize.z / 2
				&& pointRB.z < +BARRIER_V.boxSize.z / 2
			) {
				return BARRIER.variant;
			}
		}
		return null; // -> didn't collide with any barrier
	}
	
	// TODO: bgSpeed is strange here but whatever
	update(dt, bgSpeed) {
		for (let barrier of this.barriers) {
			barrier.move(dt, bgSpeed);
		}
		
		this.barriers = this.barriers.filter(b => b.position.x > -10);
		
		// TODO: no
		this.spawnRate.step(dt);
		if (this.spawnRate.isTicked()) {
			this.pushBarrier(random(Object.keys(Barrier.VARIANTS)), random(4));
		}
	}
	
	draw() {
		// TODO: z-sorting?
		let i = 0;
		for (const BARRIER of this.barriers) {
			++i;
			BARRIER.draw();
			text("X-Pos", 300, 20*i);
			text(BARRIER.position.x.toFixed(2), 340, 20*i);
			text("Z-Pos", 380, 20*i);
			text(BARRIER.position.z.toFixed(2), 410, 20*i);
		}
	}
}
