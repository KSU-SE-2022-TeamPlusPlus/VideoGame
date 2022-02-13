// Scrolling background with basketball
// Team++

let time = 0;

const CANVAS_SIZE = new p5.Vector(800, 400);

// Graphics
let gfxBall = [];
let gfxRunner = []; // their name is canonically chase
let gfxBackground;

// Animation
let ballFrame = 0;
let runnerFrame = 0;

var x1 = 0;
var x2;
var left, right, up, down;
var x = 100;
var y = 100;

var scrollSpeed = 3; //how fast background moves

function preload() {
	// Load graphics
	
	gfxBackground = loadImage("assets/backgroundsky.png");
	
	gfxBall = [];
	for (let i = 1; i <= 11; i++) {
		gfxBall.push(loadImage(`assets/b${12 - i}.png`));
	}
	
	gfxRunner = [];
	for (let i = 0; i < 15; i++) {
		let paddedNumber = i.toString().padStart(3, '0');
		gfxRunner.push(loadImage(`assets/tile${paddedNumber}.png`));
	}
}

function setup() {
	// Canvas size in pixels
	createCanvas(CANVAS_SIZE.x, CANVAS_SIZE.y);
	
	// TODO: simpler impl of wrapping background
	x1 = 0; x2 = width;
	
	time = 0; // Time in seconds
	
	colorMode(RGB, 1); // Change color format
	// Colors are now percentages from [0, 1]
	// instead of numbers from [0, 256)
}

function draw() {
	// Time Step
	
	time += deltaTime / 1000; // time in seconds, deltaTime in milliseconds; gotta convert
	
	x1 -= scrollSpeed;
	x2 -= scrollSpeed;

	if (x1 < -width) { x1 = width; }
	if (x2 < -width) { x2 = width; }
	
	// Controls
	
	if (right) { x = x + 1; }
	if (left) { x = x - 1; }
	
	if (up) {
		jumping = 1;
		y = y - 1;
	}
	if (down) {
		jumping = 0;
		y = y + 1;
	}
	
	// Drawing
	
	// Wrapping background
	image(gfxBackground, x1, 0, width, height);
	image(gfxBackground, x2, 0, width, height);
	
	// Runner animation and drawing
	runnerFrame = (runnerFrame + 1) % gfxRunner.length;
	image(gfxRunner[runnerFrame], 15, 205, 130, 130);
	
	// Ball animation and drawing
	ballFrame = (ballFrame + 1) % gfxBall.length;
	image(gfxBall[ballFrame], 210, 303, 30, 30);
}

function keyPressed() {
	up    = false;
	down  = false;
	left  = false;
	right = false;
	
	if (keyCode === UP_ARROW)    { up = true;    }
	if (keyCode === DOWN_ARROW)  { down = true;  }
	if (keyCode === LEFT_ARROW)  { left = true;  }
	if (keyCode === RIGHT_ARROW) { right = true; }
}
