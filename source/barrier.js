// Barrier class to draw walls, and barriers on the screen for player to avoid or jump over
// It will allow to move() and draw() and have collision() detection
// New barrier gets drawn automatically at a random location off screen 
// once the current barrier has moved off screen

import { WORLD } from "./world.js";

export class Barrier {
	static VARIANTS = {
		brickwall: {
			image: "assets/brickwall.png",
			// -> image path / image object
			imageSize: new p5.Vector(123, 187),
			// -> how large the sprite should be drawn
			boxSize: new p5.Vector(1.0, 1.0, 2.0),
			// -> How large the collision box is (3d)
			//  + z tells how many lanes the barrier will span (rounded up)
			offset: new p5.Vector(-16, 60),
			// -> Amount to offset the sprite (without effecting collisions)
		},
		lawnchair: {
			image: "assets/lawnchair.png",
			imageSize: new p5.Vector(100, 100),
			boxSize: new p5.Vector(1.0, 1.0, 1.0),
			offset: new p5.Vector(0, 16),
		},
		jumpEnemy: {
			image: "assets/jumper.gif",
			imageSize: new p5.Vector(40, 40),
			boxSize: new p5.Vector(0.5, 0.5, 0.8),
			offset: new p5.Vector(0, 8),
		},
		treeStump: {
			image: "assets/treestump.png",
			imageSize: new p5.Vector(50, 50),
			boxSize: new p5.Vector(0.8, 0.8, 1.0),
			offset: new p5.Vector(0, 16),
		},
	};
	
	static preload() {
		for (let variant_k of Object.keys(Barrier.VARIANTS)) {
			let variant = Barrier.VARIANTS[variant_k];
			
			// Oops, we're missing out on the key string.
			// Here's a quick hack.
			variant.name = variant_k;
			
			// if not already a p5 Image, convert it to one.
			// this is the "loading" part of the preload.
			if (typeof variant.image == "string")
				variant.image = loadImage(variant.image);
			
			// nobody else should mutate this table.
			Object.freeze(variant);
		}
	}
	
	constructor(variant = "brickwall", startPos) {
		if (typeof variant == "string")
			variant = Barrier.VARIANTS[variant];
		
		this.variant = variant;
		this.position = startPos || new p5.Vector();
	}
	 
	// Move the barrier horizontally a specified amount.
	// Barriers should move at the same speed as the background's.
	move(dt, amount) {
		this.position.x = this.position.x - amount * dt;
	}
	
	// Draw the barrier at its position.
	draw() {
		push();
		translate(WORLD.toScreen(this.position));
		translate(this.variant.offset);
		translate(-this.variant.imageSize.x / 2, -this.variant.imageSize.y);
		image(this.variant.image, 0, 0, this.variant.imageSize.x, this.variant.imageSize.y);
		pop();
	}
};
