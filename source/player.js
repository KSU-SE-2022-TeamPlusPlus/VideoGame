import { Runner } from "./runner.js";
import { Timer } from "./timer.js";

import { WORLD } from "./world.js";

const PLAYER_HOME = new p5.Vector(225, 333); // bottom center
const PLAYER_SIZE = new p5.Vector(40, 40); // sprite size
// in world-space, the player is 1/4th of a unit

const PLAYER_SHADOW = 0.25;

export class Player {
	static image;
	
	static sfxBoing;
	
	static preload() {
		Player.image = loadImage("assets/rolling_ball.gif");
		
		Player.sfxBoing = loadSound("assets/boing.mp3");
		Player.sfxBoing.setVolume(0.9);
	}
	
	constructor() {
		this.position = new p5.Vector();
		this.velocity = new p5.Vector();
		
		this.rotation = 0;
		
		this.grounded = true;
		
		this.currentLane = 0;
		this.laneSwitchRepeat = new Timer(1/6);
	}
	
	// Controls the player with an Input object.
	control(dt, input) {
		if (this.grounded) {
			// Jump if ball on ground.
			if (input.on('jump')) {
				this.velocity.y = 5;
				this.grounded = false;
				
				// Play the jump sound effect too.
				if (WORLD.soundsEnabled) {
					Player.sfxBoing.play();
				}
			}
		
			// Ignore inputs if both are pressed at once.
			if (input.on('up') != input.on('down')) {
				if (input.justPressed('up') || input.justPressed('down')) {
					this.laneSwitchRepeat.reset();
				} else {
					this.laneSwitchRepeat.step(dt);
				}
				
				if (input.on('up')) {
					if (input.justPressed('up')
					||  this.laneSwitchRepeat.isTicked()) {
						if (this.currentLane > -1) {
							this.currentLane--;
						}
					}
				}
				if (input.on('down')) {
					if (input.justPressed('down')
					||  this.laneSwitchRepeat.isTicked()) {
						if (this.currentLane < 1) {
							this.currentLane++;
						}
					}
				}
			}
		}
	}
	
	// Simulates physics and animates the player too.
	update(dt) {
		// Only simulate if you're off the ground.
		if (!this.grounded) {
			// Simulate!
			this.position.y += this.velocity.y * dt;
			this.velocity.y += WORLD.GRAVITY.y * dt;
			
			// If that put you below the ground,
			// you're grounded and you can jump again.
			if (this.position.y < 0) {
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
		
		this.position.z = this.currentLane;
	}
	
	// Draws the player.
	draw() {
		push(); // Push new transform context
		
		translate(WORLD.toScreen(this.position));
		// <- could scale() here for a bounce effect
		translate(0, -PLAYER_SIZE.y / 2);
		scale(PLAYER_SIZE);
		// rotate(this.rotation * TAU); // We're using a GIF that rotates on its own.
		
		image(Player.image, -0.5, -0.5, 1, 1);
		
		pop(); // Restore previous transform context
	}
	
	drawShadow() {
		WORLD.drawShadow(this.position, PLAYER_SHADOW);
	}
	
	dbgDrawPosition() {
		text("X Position: ", 120, 15);
		text(this.position.x, 180, 15);
		
		text("Y Position: ", 200, 15);
		text(this.position.y, 260, 15);
		
		text("test",280,15);
	}
	
}
