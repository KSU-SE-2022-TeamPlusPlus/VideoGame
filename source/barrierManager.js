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
	
	dbgDrawBoxes() {
		push();
		
		noFill();
		stroke(1, 1, 1, 1/4);
		strokeWeight(4);
		
		for (const BARRIER of this.barriers) {
			BarrierManager.wiresBox(
				BARRIER.position,
				Barrier.VARIANTS[BARRIER.variant].boxSize
			);
		}
		
		pop();
	}
	
	dbgDrawClosestLine() {
		push();
		
		noFill();
		stroke(1/2, 1/4, 1, 1/4);
		strokeWeight(4);
		
		if (this.barriers.length <= 0) return;
		
		let [closestX, closestZ] =
			this.barriers
			.map(b => {
				const V = Barrier.VARIANTS[b.variant];
				return [b.position.x - V.boxSize.x / 2, b.position.z];
			})
			.filter(d => d[0] >= 0)
			.sort((d1, d2) => d1[0] - d2[0])[0];
		
		let pos0 = WORLD.toScreen({ x: 0, y: 0, z: closestZ });
		let posD = WORLD.toScreen({ x: closestX, y: 0, z: closestZ });
		line(pos0.x, pos0.y, posD.x, posD.y);
		
		pop();
	}
	
	// oh gosh
	static wiresBox(bottomCenter, size) {
		let size2 = size.copy().div(2);
		let center = new p5.Vector(
			bottomCenter.x,
			bottomCenter.y + size2.y,
			bottomCenter.z
		);
		
		let bottomLeft = center.copy().sub(size2);
		let topRight = center.copy().add(size2);
		
		// draw top / bottom of cube
		beginShape(QUADS);
		for (let i = 0; i < 2; i++) {
			for (let j = 0; j < 4; j++) {
				// foolish zig-zag index fix
				let indX = (j >= 2 ? (5 - j) : j) & 1;
				let indZ = ((j >= 2 ? (5 - j) : j) & 2) >> 1;
				
				let scr = WORLD.toScreen(new p5.Vector(
					[bottomLeft.x, topRight.x][indX],
					[bottomLeft.y, topRight.y][i],
					[bottomLeft.z, topRight.z][indZ],
				));
				vertex(scr.x, scr.y);
			}
		}
		endShape(CLOSE);
		
		// draw middle connecting lines
		beginShape(LINES);
		for (let j = 0; j < 4; j++) {
			let indX = j & 1;
			let indZ = (j & 2) >> 1;
			
			for (let i = 0; i < 2; i++) {
				let scr = WORLD.toScreen(new p5.Vector(
					[bottomLeft.x, topRight.x][indX],
					[bottomLeft.y, topRight.y][i],
					[bottomLeft.z, topRight.z][indZ],
				));
				vertex(scr.x, scr.y);
			}
		}
		endShape();
	}
}
