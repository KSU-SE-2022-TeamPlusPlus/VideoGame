import { Barrier } from "./barrier.js";
import { DepthSort } from "./depthSort.js";
import { Timer } from "./timer.js";
import { WORLD } from "./world.js";

export class BarrierManager {
	constructor() {
		this.barriers = [];
		this.spawnRate = new Timer(2);
	}
	
	// push a new barrier into the internal list
	pushBarrier(variant, ofs = 0) {
		if (typeof variant == "string") variant = Barrier.VARIANTS[variant];
		
		let laneRange = 3 - Math.ceil(variant.boxSize.z);
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
			const BOX = BARRIER.variant.boxSize;
			
			// moves the player position into the barrier's local space
			// to make collision checks a bit easier to write / read.
			let pointRB = point.copy().sub(BARRIER.position);
			
			if (
				pointRB.y >= 0            && pointRB.y < +BOX.y
				&& pointRB.x > -BOX.x / 2 && pointRB.x < +BOX.x / 2
				&& pointRB.z > -BOX.z / 2 && pointRB.z < +BOX.z / 2
			) {
				return BARRIER.variant.name;
				// -> collided with this barrier
			}
		}
		return null; // -> didn't collide with any barrier
	}
	
	update(dt, scrollSpeed) {
		for (let barrier of this.barriers) {
			barrier.move(dt, scrollSpeed);
		}
		
		// Remove all barriers that move off the right side of the screen
		this.barriers = this.barriers.filter(b => b.position.x > -8);
		
		// TODO: this could be a better spawning algorithm.
		// currently it just spawns at a set interval, without regard to
		// - what last two barriers it spawned (try to add some variety)
		// - how large of a space is between previous barriers
		// for now it's good enough, tho!
		this.spawnRate.step(dt);
		if (this.spawnRate.isTicked()) {
			this.pushBarrier(random(Object.keys(Barrier.VARIANTS)), random(4));
		}
	}
	
	draw(sortObj) {
		if (sortObj instanceof DepthSort) {
			for (const BARRIER of this.barriers) {
				sortObj.pushDraw(() => BARRIER.draw(), BARRIER.position.z);
			}
		} else {
			this.barriers.forEach(b => b.draw());
		}
	}
	
	dbgDrawPositions() {
		let i = 0;
		for (const BARRIER of this.barriers) {
			++i;
			text("X-Pos", 300, 20*i);
			text(BARRIER.position.x.toFixed(2), 340, 20*i);
			text("Z-Pos", 380, 20*i);
			text(BARRIER.position.z.toFixed(2), 410, 20*i);
		}
	}
	
	// draws wireframe boxes over each barrier in the internal list
	dbgDrawBoxes() {
		push();
		
		noFill();
		stroke(1, 1, 1, 1/4);
		strokeWeight(4);
		
		for (const BARRIER of this.barriers) {
			BarrierManager.wiresBox(BARRIER.position, BARRIER.variant.boxSize);
		}
		
		pop();
	}
	
	// draws a line between the player's origin and the nearest obstacle
	dbgDrawClosestLine() {
		let nearestBarrier = this.barriers
			.filter(b => b.position.x >= 0)
			.sort((b1, b2) => b1.position.x - b2.position.x)
			[0];
		if (!nearestBarrier) return;
		
		let closestX = nearestBarrier.position.x - nearestBarrier.variant.boxSize.x / 2;
		let closestZ = nearestBarrier.position.z;
		
		let pos0 = WORLD.toScreen({ x: 0, y: 0, z: closestZ });
		let posD = WORLD.toScreen({ x: closestX, y: 0, z: closestZ });
		
		push();
		
		noFill();
		stroke(1/2, 1/4, 1, 1/4);
		strokeWeight(4);
		
		line(pos0.x, pos0.y, posD.x, posD.y);
		
		pop();
	}
	
	// well i'm not gonna make this function very pretty
	// draws a wireframe box with the specified origin point and size
	static wiresBox(bottomCenter, size) {
		const SIZE2 = size.copy().div(2);
		const CENTER = new p5.Vector(
			bottomCenter.x,
			bottomCenter.y + SIZE2.y,
			bottomCenter.z
		);
		
		const BOTTOM_LEFT = CENTER.copy().sub(SIZE2);
		const TOP_RIGHT = CENTER.copy().add(SIZE2);
		
		// draw top / bottom of cube
		beginShape(QUADS);
		for (let i = 0; i < 2; i++) {
			for (let j = 0; j < 4; j++) {
				// foolish zig-zag index fix
				let indX = (j >= 2 ? (5 - j) : j) & 1;
				let indZ = ((j >= 2 ? (5 - j) : j) & 2) >> 1;
				
				let scr = WORLD.toScreen(new p5.Vector(
					[BOTTOM_LEFT.x, TOP_RIGHT.x][indX],
					[BOTTOM_LEFT.y, TOP_RIGHT.y][i],
					[BOTTOM_LEFT.z, TOP_RIGHT.z][indZ],
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
					[BOTTOM_LEFT.x, TOP_RIGHT.x][indX],
					[BOTTOM_LEFT.y, TOP_RIGHT.y][i],
					[BOTTOM_LEFT.z, TOP_RIGHT.z][indZ],
				));
				vertex(scr.x, scr.y);
			}
		}
		endShape();
	}
}
