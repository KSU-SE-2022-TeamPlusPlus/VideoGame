/// <reference path="../p5_definitions/p5.global-mode.d.ts" />

// Utility
import { Timer } from "./timer.js";
import { Input } from "./input.js";
import { WORLD } from "./world.js";

// Game Objects
import { Runner } from "./runner.js";
import { Player } from "./player.js";
import { Barrier } from "./barrier.js";
import { BarrierManager } from "./barrierManager.js";
import { scoreTracker } from "./scoreTracker.js";

// Runaway Ball, Roll On!! (working title???)
// Team++

// Environment
const CANVAS_SIZE = new p5.Vector(800, 400);
let time = 0;

// Graphics
let gfxBackground;

// Animation
var backgroundX = 0;
var backgroundSpeed = 3; // how fast background moves

let backgroundMusic;

let input;

let player, runner;
let barrierManager;
let distance;

window.preload = function () {
	// Load graphics
	
	gfxBackground = loadImage("assets/backyard pixel path.png");
	
	// Preload player / runner graphics
	Player.preload();
	Runner.preload();
	
	// Preload all barriers (see VARIANTS in Barrier for which files)
	Barrier.preload();
	
	// Load & initialize audio
	
	// Tell p5 what file types we'll use for sounds (???)
	soundFormats('mp3');
	
	// Preload background music
	backgroundMusic = loadSound("assets/monkeys_spinning_monkeys_-_incompetech.mp3");
	backgroundMusic.setLoop(true);
}

window.setup = function () {
	// Create a canvas with the specified size, returning its HTML element.
	let c = createCanvas(CANVAS_SIZE.x, CANVAS_SIZE.y).elt;
	c.tabIndex = -1; // Make the canvas focusable.
	
	time = 0; // Time in seconds
	
	input = new Input({
		jump: { binding: 32,         }, // -> Space
		up:   { binding: UP_ARROW,   },
		down: { binding: DOWN_ARROW, },
		mute: { binding: 0x23,       }, // -> End
	});
	
	colorMode(RGB, 1); // Change color format
	// Colors are now percentages from [0, 1]
	// instead of numbers from [0, 256)
	
	// Make the player / runner
	player = new Player();
	runner = new Runner();
	
	// Make barriers
	barrierManager = new BarrierManager();
	barrierManager.pushBarrier("brickwall");

	distance = new scoreTracker();
	
	// Start music
	if (WORLD.soundsEnabled) {
		backgroundMusic.play();
	}
}

// This isn't necessarily required, but it does help separate state changes
// and drawing instructions -- leading to cleaner code.
function update() {
	let dt = deltaTime / 1000; // convert deltaTime from milliseconds
	
	// high `deltaTime`s are annoying. i added a `console.log` that prints
	// every time `deltaTime >` half a second with the `deltaTime` and..
	// whenever i switch away from the tab, the browser throttles this script,
	// resulting in deltaTimes ranging from half a second to 4 seconds. this is
	// annoying because deltaTime should be close to your screen's refresh rate.
	// i have fixed issues caused by this with the following line:
	
	// If delta time is too high, cap it at a 30th of a second.
	dt = Math.min(dt, 1/30);
	// the worst possible step the game can take forward is a 30th of a second.
	
	time += dt; // to seconds, for use in time
	
	// Controls
	
	if (focused) {
		// Update Input object
		input.update(dt);
	} else {
		// If game canvas element is not focused, release all controls.
		// This fixes "sticky controls" (where p5 misses the key release event
		// due to not having focus on its canvas) and should not impact normal play.
		input.resetAll(true);
	}
	
	if (input.justPressed('mute')) {
		WORLD.soundsEnabled = !WORLD.soundsEnabled;
		// TODO: doesn't restart bg music
	}
	
	player.control(dt, input);
	
	// Physics & Animations
	
	player.update(dt);
	runner.update(dt);
	
	// Move obstacles with background
	barrierManager.update(dt, backgroundSpeed);
	
	// Wrap background
	backgroundX -= backgroundSpeed;
	if (backgroundX < -width) backgroundX = backgroundX % width;
	
	//Score Tracker
	distance.update(dt);

}

window.draw = function () {		
	update();
	
	// Clear screen
	background(0);
	
	// Wrapping background
	image(gfxBackground, Math.round(backgroundX), 0, width, height);
	image(gfxBackground, Math.round(backgroundX + width), 0, width, height);
	
	WORLD.dbgDrawGrid();
	
	// Runner
	runner.draw();
	
	// Ball
	player.draw();
	
	// Barriers
	barrierManager.draw();

	//Score Counter
	distance.draw();
	
	input.debugDraw();
}

window.keyPressed = function () {
	if (input) input.keyPressed();
}

window.keyReleased = function () {
	if (input) input.keyReleased();
}
