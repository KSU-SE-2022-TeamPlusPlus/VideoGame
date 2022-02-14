/// <reference path="p5_definitions/p5.global-mode.d.ts" />

// Scrolling background with basketball
// Team++

let time = 0;

const CANVAS_SIZE = new p5.Vector(800, 400);

// Graphics
let gfxBall;
let gfxRunner = []; // their name is canonically chase
let gfxBackground;

// Animation
const RUNNER_WAIT_INT = 1/12; // Every 12th of a second, switch to next frame.
let runnerFrame = 0;
let runnerWait = RUNNER_WAIT_INT;

var backgroundX = 0;

const BALL_SIZE = new p5.Vector(64, 64);

var controls;
var position = new p5.Vector(0, 0, 0);

var backgroundSpeed = 3; // how fast background moves

function preload() {
	// Load graphics
	
	gfxBackground = loadImage("assets/backgroundsky.png");
	
	gfxBall = loadImage("assets/basketball.png");
	
	gfxRunner = [];
	for (let i = 0; i < 7; i++) {
		gfxRunner.push(loadImage(`assets/runner${i}.png`));
	}
}

function setup() {
	// Canvas size in pixels
	createCanvas(CANVAS_SIZE.x, CANVAS_SIZE.y);
	
	time = 0; // Time in seconds
	
	controls = {
		up:    { binding: UP_ARROW,    },
		down:  { binding: DOWN_ARROW,  },
		left:  { binding: LEFT_ARROW,  },
		right: { binding: RIGHT_ARROW, },
	};
	for (let control in Object.values(controls)) {
		control.on = false;
	}
	
	colorMode(RGB, 1); // Change color format
	// Colors are now percentages from [0, 1]
	// instead of numbers from [0, 256)
}

// This isn't necessarily required, but it does help separate state changes
// and drawing instructions -- leading to cleaner code.
function update() {
	let dt = deltaTime / 1000; // convert deltaTime from milliseconds
	time += dt; // to seconds, for use in time
	
	// Wrap background
	backgroundX -= backgroundSpeed;
	if (backgroundX < -width) backgroundX = backgroundX % width;
	
	// Runner Animation
	// If enough time has passed...
	if (runnerWait <= 0) {
		// switch the runner's frame to the next one,
		runnerFrame = (runnerFrame + 1) % gfxRunner.length;
		// and reset the timer.
		runnerWait = (runnerWait % RUNNER_WAIT_INT) + RUNNER_WAIT_INT;
	} else {
		// Otherwise, tick down the timer.
		runnerWait -= dt;
	}
	
	// Controls
	
	if (!focused) {
		for (let control of Object.values(controls)) {
			control.on = false;
		}
	}
	
	if (controls.left.on) position.x -= 1;
	if (controls.right.on) position.x += 1;
	
	if (controls.up.on) {
		jumping = true;
		position.y -= 1;
	}
	if (controls.down.on) {
		jumping = false;
		position.y += 1;
	}
}

function draw() {
	update();
	
	// TODO: a seam appears in the wrapping background
	background(0);
	
	// Wrapping background
	image(gfxBackground, Math.round(backgroundX), 0, width, height);
	image(gfxBackground, Math.round(backgroundX + width), 0, width, height);
	
	// Runner animation and drawing
	image(gfxRunner[runnerFrame], 15, 205, 130, 130);
	
	// Ball animation and drawing
	push(); // Push new transform context
	translate(225 + position.x, 333 - BALL_SIZE.y / 2 + position.y);
	rotate(time * TAU); // = 1 revolution per second
	image(gfxBall, -BALL_SIZE.x / 2, -BALL_SIZE.y / 2, BALL_SIZE.x, BALL_SIZE.y);
	pop(); // Restore previous transform context
}

function keyPressed() {
	for (let control of Object.values(controls)) {
		if (keyCode === control.binding)
			control.on = true;
	}
}

function keyReleased() {
	for (let control of Object.values(controls)) {
		if (keyCode === control.binding)
			control.on = false;
	}
}

function worldToScreen(v) {
	return new p5.Vector(
		v.x + v.z * 0.75,
		v.y - v.z * 1
	);
}
