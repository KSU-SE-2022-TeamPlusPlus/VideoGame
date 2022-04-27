export const WORLD = {
	GRAVITY: new p5.Vector(0, -6),
	
	ORIGIN: new p5.Vector(225, 324),
	
	Z_COEF: new p5.Vector(3/8, -5/8),
	UNIT: 64,
	
	SHADOW_OPACITY: 0.4,
	
	// `this` == WORLD inside functions defined in WORLD.
	
	// Converts a vector to screen space.
	// Takes a 3D vector, outputs a 2D vector.
	toScreen: function(v) {
		return new p5.Vector(
			this.ORIGIN.x + (v.x + (v.z * this.Z_COEF.x)) * +this.UNIT,
			this.ORIGIN.y + (v.y + (v.z * this.Z_COEF.y)) * -this.UNIT
		);
	},
	
	// Converts a vector back to world space.
	// Takes a 2D vector, outputs... a "3D" vector.
	// Only on XZ plane, sorry. Y component'll be 0.
	toWorld: function(v) {
		throw new Error("TODO: not implemented");
		return new p5.Vector(
			v.x / +this.UNIT,
			0,
			v.y / -this.UNIT
		);
	},
	
	// Draw a shadow
	drawShadow(position, size = 1/4) {
		push(); // Push new transform context
		
		noStroke();
		fill(0, 0, 0, WORLD.SHADOW_OPACITY);
		
		translate(WORLD.toScreen({ x: position.x, y: 0, z: position.z }));
		scale(2, 0.75 - size / 4);
		scale(1 - position.y / 6, 1 - position.y / 6);
		scale(size * WORLD.UNIT);
		
		circle(0, 0, 1);
		
		pop(); // Restore previous transform context
	},
	
	// Draw a grid
	dbgDrawGrid() {
		push();
		
		noFill();
		stroke(0.125, 0.5, 0.25, 0.25);
		strokeWeight(4);
		
		// vertical lines
		for (let x = -3; x <= 8; x++) {
			let fromLine = this.toScreen( new p5.Vector( x, 0, -2 ) );
			let toLine   = this.toScreen( new p5.Vector( x, 0, +2 ) );
			
			line(fromLine.x, fromLine.y, toLine.x, toLine.y);
		}
		
		// horizontal lines
		for (let z = -1; z <= 1; z++) {
			let fromLine = this.toScreen( new p5.Vector( -3, 0, z ) );
			let toLine   = this.toScreen( new p5.Vector( +8, 0, z ) );
			
			line(fromLine.x, fromLine.y, toLine.x, toLine.y);
		}
		pop();
	}
};
