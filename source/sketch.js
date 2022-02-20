/// <reference path="../p5_definitions/p5.global-mode.d.ts" />

// Utility
import { Timer } from "./timer.js";

// Game Objects
import { Runner } from "./runner.js";
import { Player } from "./player.js";
import { Barrier } from "./barrier.js";

// Runaway Ball, Roll On!! (working title???)
// Team++

// Environment
const CANVAS_SIZE = new p5.Vector(800, 400);
let time = 0;

// Graphics
let gfxBackground;
let gfxWall;
let gfxChair;

// Animation
var backgroundX = 0;
var backgroundSpeed = 3; // how fast background moves

var controls;

let player, runner;
let wallObj = new Barrier(900, 240); // sets up initial wall off screen, so it can scroll onto screen from right side

window.preload = function () {
	// Load graphics
	
	gfxBackground = loadImage("assets/backgroundsky.png");
	
	Player.preload();
	Runner.preload();
	
	gfxWall = loadImage("assets/wall.png");
	gfxChair = loadImage("assets/chair.png");
}

window.setup = function () {
	// Canvas size in pixels
	createCanvas(CANVAS_SIZE.x, CANVAS_SIZE.y);
	
	time = 0; // Time in seconds
	
	controls = {
		jump: { binding: UP_ARROW, },
		left: { binding: LEFT_ARROW, },
		right: { binding: RIGHT_ARROW, },
	};
	for (let control of Object.values(controls)) {
		control.on = false;
	}
	
	colorMode(RGB, 1); // Change color format
	// Colors are now percentages from [0, 1]
	// instead of numbers from [0, 256)
	
	player = new Player();
	runner = new Runner();
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
	dt = Math.min(dt, 1/30);
	// the worst possible step the game can take forward is a 30th of a second.
	
	time += dt; // to seconds, for use in time
	
	// Controls
	
	if (!focused) {
		for (let control of Object.values(controls)) {
			control.on = false;
		}
	}
	
	player.control(controls);
	
	// Physics & Animations
	
	player.update(dt);
	runner.update(dt);
	
	// Wrap background
	backgroundX -= backgroundSpeed;
	if (backgroundX < -width) backgroundX = backgroundX % width;
}

window.draw = function () {
	update();
	
	// Clear screen
	background(0);
	
	// Wrapping background
	image(gfxBackground, Math.round(backgroundX), 0, width, height);
	image(gfxBackground, Math.round(backgroundX + width), 0, width, height);
	
	// Runner
	runner.draw();
	
	// Ball
	player.draw();
	
	// Create wall barrier
	image(gfxWall, wallObj.xVal, wallObj.yVal, 140,140); // draws wall
	wallObj.move(backgroundSpeed); // move wall with background
}

window.keyPressed = function () {
	if (!controls) return;
	for (let control of Object.values(controls)) {
		if (keyCode === control.binding)
			control.on = true;
	}
}

window.keyReleased = function () {
	if (!controls) return;
	for (let control of Object.values(controls)) {
		if (keyCode === control.binding)
			control.on = false;
	}
}

function worldToScreen(v) {
	return new p5.Vector(
		v.x - v.z * 0.75,
		v.y - v.z * 1
	);
}
