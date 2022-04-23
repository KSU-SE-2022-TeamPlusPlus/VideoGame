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
			shadow: "assets/brickwallShadow.png",
			// -> Either a number (size in units), an image path / image object,
			//    or just don't include this to not draw a shadow.
			spawn: true,
			// -> Should be put into spawn list.
		},
		lawnchair: {
			image: "assets/lawnchair.png",
			imageSize: new p5.Vector(100, 100),
			boxSize: new p5.Vector(1.0, 1.0, 1.0),
			offset: new p5.Vector(0, 20),
			shadow: "assets/lawnchairShadow.png",
			spawn: true,
		},
		jumpEnemy: {
			image: "assets/jumper.gif",
			imageSize: new p5.Vector(40, 40),
			boxSize: new p5.Vector(0.5, 0.5, 0.8),
			offset: new p5.Vector(0, 8),
			shadow: 1/4,
			spawn: true,
		},
		treeStump: {
			image: "assets/treestump.png",
			imageSize: new p5.Vector(50, 50),
			boxSize: new p5.Vector(0.8, 0.8, 1.0),
			offset: new p5.Vector(0, 16),
			shadow: 1/4,
			spawn: true,
		},
	};
	
	static SPAWN_LIST = [];
	
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
			
			// do the same for the shadow
			if (typeof variant.shadow == "string")
				variant.shadow = loadImage(variant.shadow);
			
			// Add this to the "spawnable variants" list.
			if (variant.spawn)
				Barrier.SPAWN_LIST.push(variant_k);
			
			// nobody else should mutate this table.
			Object.freeze(variant);
		}
	}
	
	constructor(variant = "brickwall", startPos) {
		if (typeof variant == "string")
			variant = Barrier.VARIANTS[variant];
		
		this.variant = variant;
		this.position = startPos || new p5.Vector();
		this.hit = false;
	}
	 
	// Move the barrier horizontally a specified amount.
	// Barriers should move at the same speed as the background speed.
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
	
	// Draw the barrier's shadow.
	drawShadow() {
		if (!this.variant.shadow) return;
		
		if (typeof this.variant.shadow == "number") {
			WORLD.drawShadow(this.position, this.variant.shadow);
		} else {
			push();
			translate(WORLD.toScreen(this.position));
			translate(this.variant.offset);
			translate(-this.variant.imageSize.x / 2, -this.variant.imageSize.y);
			tint(1, 1, 1, WORLD.SHADOW_OPACITY);
			image(this.variant.shadow, 0, 0, this.variant.imageSize.x, this.variant.imageSize.y);
			pop();
		}
	}
	
	// Simple collision check function.
	// Used in barrierManager, too.
	// Takes a 3D point representing the other body to collide against.
	// Returns a boolean indicating if the point and box are colliding.
	isTouching(point) {
		// the collision hitbox of this barrier.
		const BOX = this.variant.boxSize;
		
		// moves the player position into the barrier's local space
		// to make collision checks a bit easier to write / read.
		let pointLocal = point.copy().sub(this.position);
		
		// collision hitboxes are anchored at the bottom center.
		// otherwise this is a bog-standard way of checking box collision.
		return pointLocal.y >= 0     && pointLocal.y < +BOX.y
		&& pointLocal.x > -BOX.x / 2 && pointLocal.x < +BOX.x / 2
		&& pointLocal.z > -BOX.z / 2 && pointLocal.z < +BOX.z / 2;
	}
};
