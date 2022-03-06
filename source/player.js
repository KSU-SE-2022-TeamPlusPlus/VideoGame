var PLAYER_HOME = new p5.Vector(225, 333); // bottom center,variable so lanes can change
const PLAYER_SIZE = new p5.Vector(64, 64);

// TODO: put somewhere else
const GRAVITY = new p5.Vector(0, 6);

export class Player {
	static image;
	
	static preload() {
		Player.image = loadImage("assets/basketball.png");
	}
	
	constructor() {
		this.position = new p5.Vector();
		this.velocity = new p5.Vector();
		
		this.rotation = 0;
		
		this.grounded = true;
	}
	
	// Controls the player with a Controls object.
	control(controls) {
		if (this.grounded) {
			if (controls.jump.on) {
				this.velocity.y = -5;
				this.grounded = false;
			}
			if (controls.up.on) {					//moves ball into other lanes
				PLAYER_HOME.y = PLAYER_HOME.y - 1;
			}
			if (controls.down.on) {
				PLAYER_HOME.y = PLAYER_HOME.y + 1;
			}			
		}
	}
	
	// Simulates physics and animates the player too.
	update(dt) {
		// Only simulate if you're off the ground.
		if (!this.grounded) {
			// Simulate!
			this.position.y += this.velocity.y;
			this.velocity.y += GRAVITY.y * dt;
			
			// If that put you below the ground,
			// you're grounded and you can jump again.
			if (this.position.y > 0) {
				this.position.y = 0;
				this.velocity.y = 0;
				this.grounded = true;
			}
			
			// Roll slowly in midair
			this.rotation += dt / 2;
		} else {
			// Roll normally
			this.rotation += dt;
		}
	}
	
	// Draws the player.
	draw() {
		push(); // Push new transform context
		
		translate(
			PLAYER_HOME.x + this.position.x,
			PLAYER_HOME.y + this.position.y
		);
		// <- could scale() here for a bounce effect
		translate(0, -PLAYER_SIZE.y / 2);
		scale(PLAYER_SIZE);
		rotate(this.rotation * TAU);
		
		image(Player.image, -0.5, -0.5, 1, 1);
		
		pop(); // Restore previous transform context
	}
}
