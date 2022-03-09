import { Timer } from "./timer.js";

const PLAYER_HOME = new p5.Vector(225, 333); // bottom center
const PLAYER_SIZE = new p5.Vector(40, 40);
var bounce = new Audio('assets/boing.mp3');
var backAudio = new Audio('assets/Monkeys-Spinning-Monkeys.mp3');
var dogAudio = new Audio('assets/Large-dog-bark-sound-effect.mp3');
var soundOn = false;
dogAudio.volume = .5;
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
		
		this.currentLane = 0;
		this.laneSwitchRepeat = new Timer(1/10);
	}
	
	// Controls the player with an Input object.
	control(dt, input) {
		if (this.grounded) {
			// Jump if ball on ground.
			if (input.on('jump')) {
				bounce.play(); //jump sound effect when jumping				
				this.velocity.y = -5;
				this.grounded = false;
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
	
	// Simulates physics and animates the player too.
	update(dt) {
		backAudio.play();
		dogAudio.play();
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
		
		this.position.z = this.currentLane * 32;
	}
	
	// Draws the player.
	draw() {

		if (!soundOn){
			soundOn=true;
		}
		push(); // Push new transform context
		
		translate(
			PLAYER_HOME.x + this.position.x,
			PLAYER_HOME.y + this.position.y + this.position.z
			// TODO: real "world space" instead of this
		);
		// <- could scale() here for a bounce effect
		translate(0, -PLAYER_SIZE.y / 2);
		scale(PLAYER_SIZE);
		// rotate(this.rotation * TAU); // We're using a GIF that rotates on its own.
		
		image(Player.image, -0.5, -0.5, 1, 1);
		
		pop(); // Restore previous transform context
	}
}
