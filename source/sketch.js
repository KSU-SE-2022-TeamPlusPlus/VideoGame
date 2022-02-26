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
var greenJumper = []; //create array for jumping enemy image
var jumperFrame = 0;

// Animation
var backgroundX = 0;
var backgroundSpeed = 3; // how fast background moves

var controls;

let player, runner;
let objWall, objChair;

window.preload = function () {
	// Load graphics
	
	gfxBackground = loadImage("assets/backyard pixel path.png");
	
	// Preload player / runner graphics
	Player.preload();
	Runner.preload();
	
	// Preload all barriers (see VARIANTS in Barrier for which files)
	Barrier.preload();

	//put all the jumping enemy sprites into greenJumper variable
	for (let i = 0; i < 5; i++) {
		greenJumper[i] = (loadImage(`assets/gr${i}.png`));
	}
}

window.setup = function () {
	// Canvas size in pixels
	let c = createCanvas(CANVAS_SIZE.x, CANVAS_SIZE.y).elt;
	c.tabIndex = -1; // make canvas focusable
	
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
	
	// Make the player / runner
	player = new Player();
	runner = new Runner();
	
	// Make two barriers
	objWall = new Barrier("brickwall", createVector(900, 240));
	objChair = new Barrier("lawnchair", createVector(1200, 240));
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
	
	objWall.move(backgroundSpeed); // move obstacle with background
	objChair.move(backgroundSpeed); // move obstacle with background
	
	// The following works for each object by comparing its location to the
	// other objects. This should work if we are not doing more than 5-10 objects/barriers. Each new item
	// will need to get compared to the new one, and if too close, it gets re-positioned.
	
	// Reposition objects if they overlap eachother.
	// TODO: This should be an "obstacle manager"'s job.
	if (objWall.position.x < -200) { // if it goes off screen
		objWall.position.x = random(850, 2000);
		while (
			/**/((objWall.position.x - objChair.position.x) < 400)
			||  ((objChair.position.x - objWall.position.x) > -400)
		) { // if too close to other object
			objWall.position.x = random(850, 2000);
		}
	}
	if (objChair.position.x < -200) { // if it goes off screen
		objChair.position.x = random(850, 2000);
		while (
			/**/((objChair.position.x - objWall.position.x) < 400)
			||  ((objWall.position.x - objChair.position.x) > -400)
		) { // if too close to other object
			objChair.position.x = random(850, 2000);
		}
	} 
	
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
	
	// Barriers
	objWall.draw();
	objChair.draw();
	
	// needs movement added, testing stage
	image(
		greenJumper[jumperFrame],
		objChair.position.x + 130,
		objChair.position.y + 60,
		40, 40
	);
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
