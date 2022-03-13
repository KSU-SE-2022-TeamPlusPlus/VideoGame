// Barrier class to draw walls, and barriers on the screen for player to avoid or jump over
// It will allow to move() and draw() and have collision() detection
// New barrier gets drawn automatically at a random location off screen 
// once the current barrier has moved off screen
export class Barrier {
	static VARIANTS = {
		brickwall: {
			image: "assets/brickwall.png",
			size: new p5.Vector(140, 140),
		},
		lawnchair: {
			image: "assets/lawnchair.png",
			size: new p5.Vector(100, 100),
		},
		jumpEnemy: {
			image: "assets/jumper.gif",
			size: new p5.Vector(40, 40),
		},
		treeStump: {
			image: "assets/treestump.png",
			size: new p5.Vector(50, 50),
		},
	};
	
	static preload() {
		for (let variant_k of Object.keys(Barrier.VARIANTS)) {
			const variant = Barrier.VARIANTS[variant_k];
			
			// TODO: will there be a need for fancier image types?
			// yes! the green Jumper is a barrier, but a moving one.
			if (typeof variant.image == "string")
				variant.image = loadImage(variant.image);
		}
	}
	
	constructor(variant = "brickwall", startPos) {
		const VARIANT_V = Barrier.VARIANTS[variant];
		
		this.position = startPos || new p5.Vector();
		this.image = VARIANT_V.image;
		this.size = VARIANT_V.size.copy();
	}
	 
	// Move the barrier horizontally a specified amount.
	// Barriers should move at the same speed as the background's.
	move(amount) {
		this.position.x = this.position.x - amount;
	}
	
	// Draw the barrier at its position.
	draw() {
		push();
		translate(this.position.x, this.position.y);
		image(this.image, 0, 0, this.size.x, this.size.y);
		pop();
	}
};
