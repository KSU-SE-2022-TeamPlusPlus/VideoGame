import { Barrier } from "./barrier.js";
import { Timer } from "./timer.js";

export class BarrierManager {
	constructor() {
		this.barriers = [];
	}
	
	pushBarrier(variant, ofs = 0) {
		this.barriers.push(
			new Barrier(variant, createVector(10 + ofs, 0, Math.round(random(-1, 1))))
		);
		this.spawnRate = new Timer(2);
	}

	checkAgainstBarriers(point) {
		for (const BARRIER of this.barriers) {
			const BARRIER_V = Barrier.VARIANTS[BARRIER.variant]
			let pointRB = point.copy().sub(BARRIER.position);
			if (
				pointRB.x > -BARRIER_V.boxSize.x / 2 && pointRB.x < BARRIER_V.boxSize.x / 2
				&& pointRB.y > -BARRIER_V.boxSize.y / 2 && pointRB.y < BARRIER_V.boxSize.y / 2
				&& pointRB.z > -BARRIER_V.boxSize.z / 2 && pointRB.z < BARRIER_V.boxSize.z / 2
			) {
				return true;
			}
		}
		return false;
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
