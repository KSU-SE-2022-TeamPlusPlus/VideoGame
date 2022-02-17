/// <reference path="p5_definitions/p5.global-mode.d.ts" />

import { Timer } from "./timer.js";
import { Barrier } from "./barrier.js";

// Scrolling background with basketball
// Team++

let time = 0;

const CANVAS_SIZE = new p5.Vector(800, 400);

// Graphics
let gfxBall;
let gfxRunner = []; // their name is canonically chase
let gfxBackground;
let gfxWall;
let gfxChair;

// Animation
let runnerFrame = 0;
let runnerWalkTimer = new Timer(1/12);

var backgroundX = 0;

const BALL_SIZE = new p5.Vector(64, 64);

var controls;
var position = new p5.Vector(0, 0, 0);
var jumping = false;

var backgroundSpeed = 3; // how fast background moves

let wallObj = new Barrier(900,180); //sets up initial wall off screen, so it can scroll onto screen from right side

window.preload = function() {
	// Load graphics
	
	gfxBackground = loadImage("assets/backgroundsky.png");
	
	gfxBall = loadImage("assets/basketball.png");

	gfxWall = loadImage("assets/wall.png");

	gfxChair = loadImage("assets/chair.png");

		
	gfxRunner = [];
	for (let i = 0; i < 7; i++) {
		gfxRunner.push(loadImage(`assets/runner${i}.png`));
	}
}

window.setup = function() {
	// Canvas size in pixels
	createCanvas(CANVAS_SIZE.x, CANVAS_SIZE.y);
	
	time = 0; // Time in seconds
	
	controls = {
		up:    { binding: UP_ARROW,    },
		down:  { binding: DOWN_ARROW,  },
		left:  { binding: LEFT_ARROW,  },
		right: { binding: RIGHT_ARROW, },
	};
	for (let control of Object.values(controls)) {
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
	
	// high `deltaTime`s are annoying. i added a `console.log` that prints
	// every time `deltaTime >` half a second with the `deltaTime` and..
	// whenever i switch away from the tab, the browser throttles this script,
	// resulting in deltaTimes ranging from half a second to 4 seconds. this is
	// annoying because deltaTime should be close to your screen's refresh rate.
	// i have fixed issues caused by this with the following line:
	dt = Math.min(dt, 1/30);
	// the worst possible step the game can take forward is a 30th of a second.
	
	time += dt; // to seconds, for use in time
	
	// Wrap background
	backgroundX -= backgroundSpeed;
	if (backgroundX < -width) backgroundX = backgroundX % width;
	
	// Runner Animation
	// If enough time has passed...
	runnerWalkTimer.step(dt);
	if (runnerWalkTimer.isTicked()) {
		// switch the runner's frame to the next one,
		runnerFrame = (runnerFrame + 1) % gfxRunner.length;
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

window.draw = function() {
	update();
	
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

	//Create wall barrier
	image(gfxWall,wallObj.xVal,wallObj.yVal,200,200); //prints wall
	wallObj.move(backgroundSpeed); //move wall with background
}

window.keyPressed = function() {
	if (!controls) return;
	for (let control of Object.values(controls)) {
		if (keyCode === control.binding)
			control.on = true;
	}
}

window.keyReleased = function() {
	if (!controls) return;
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
