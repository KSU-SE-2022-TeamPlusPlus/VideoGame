const PLAYER_HOME = new p5.Vector(225, 333); // bottom center
const PLAYER_SIZE = new p5.Vector(40, 40);
var delay_count = 4;

// TODO: put somewhere else
const GRAVITY = new p5.Vector(0, 6);

export class Player {
	static image;
	
	static preload() {
		Player.image = loadImage("assets/rolling_ball.gif");
	}
	
	constructor() {
		this.position = new p5.Vector();
		this.velocity = new p5.Vector();
		
		this.rotation = 0;
		
		this.grounded = true;

		this.current_lane = 1;
	}
	
	// Controls the player with a Controls object.
	control(controls) {
		if (this.grounded) {
			// Jump if ball on ground.
			if (controls.jump.on) {
				this.velocity.y = -5;
				this.grounded = false;
			}
			
			// Move ball between lanes
			if (controls.up.on) {
				if (!(this.current_lane >= 2)) {
					if(delay_count == 4){
						this.position.z = this.position.z - 50;
						++this.current_lane;
						delay_count = 0;
					}
					else { ++delay_count; }
				}	
			}
			if (controls.down.on) {
				if (!(this.current_lane <= 0)) {
					if(delay_count == 4){
						this.position.z = this.position.z + 50;
						--this.current_lane;
						delay_count = 0;
					}
					else { ++delay_count; }	
				}
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
			PLAYER_HOME.y + this.position.y + this.position.z
			// TODO: real "world space" instead of this
		);
		// <- could scale() here for a bounce effect
		translate(0, -PLAYER_SIZE.y / 2);
		scale(PLAYER_SIZE);
		//rotate(this.rotation * TAU); This function is now uncessesary due to using a gif instead 
		
		image(Player.image, -0.5, -0.5, 1, 1);
		
		pop(); // Restore previous transform context
	}
}
