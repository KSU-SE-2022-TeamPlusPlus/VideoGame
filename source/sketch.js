/// <reference path="../p5_definitions/p5.global-mode.d.ts" />

// Utility
import { Input } from "./input.js";
import { WORLD } from "./world.js";
import { SceneManager } from "./scenes/sceneManager.js";
import { GameScene } from "./scenes/gameScene.js";
import { TitleScene } from "./scenes/titleScene.js";

// Runaway Ball, Roll On!! (working title???)
// Team++

// Environment
const CANVAS_SIZE = new p5.Vector(800, 400);
let time = 0;

let backgroundMusic;

let input;
let sceneManager;

// Volume
let soundVol = 0.5;

window.preload = function () {
	SceneManager.preload();

	// Load & initialize audio
	// Tell p5 what file types we'll use for sounds (???)
	soundFormats('mp3');
	
	// Preload background music
	backgroundMusic = loadSound("assets/monkeys_spinning_monkeys_-_incompetech.mp3");
	backgroundMusic.setLoop(true);
	backgroundMusic.playMode('untilDone');
}

window.setup = function () {
	// Create a canvas with the specified size, returning its HTML element.
	let c = createCanvas(CANVAS_SIZE.x, CANVAS_SIZE.y).elt;
	c.tabIndex = -1; // Make the canvas focusable.
	
	time = 0; // Time in seconds
	
	// Turns out that many of the key values are directly
	// analagous to the codepoints of the characters they represent!
	const inputKey = (key) => key.toUpperCase().codePointAt();
	// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
	
	input = new Input({
		jump: inputKey(' '), // -> Space key
		up:   UP_ARROW,
		down: DOWN_ARROW,
		mute: inputKey('M'), // -> 'M' for Mute
		volUp: inputKey('P'),
		volDown: inputKey('O'),
	});
	
	colorMode(RGB, 1); // Change color format
	// Colors are now percentages from [0, 1]
	// instead of numbers from [0, 256)


	sceneManager = new SceneManager();
	sceneManager.switchScene(TitleScene);	
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
		// Start/stop music
		WORLD.soundsEnabled = !WORLD.soundsEnabled;
		if (WORLD.soundsEnabled) {
			backgroundMusic.play();
		} else {
			backgroundMusic.pause();
		}
	}
	
	if (input.justPressed('volUp')) {
		if (soundVol < 0.9) {
			soundVol += 0.1;
			outputVolume(soundVol);
		}
	}
	if (input.justPressed('volDown')) {
		if (soundVol > 0.1) {
			soundVol -= 0.1;
			outputVolume(soundVol);
		}
	}

	sceneManager.currentScene.control(dt, input);
	sceneManager.currentScene.update(dt);
}

window.draw = function () {
	update();
	console.log(width);
	sceneManager.currentScene.draw();

	input.debugDraw();

	text("Volume: ", 730, 380);
	text(soundVol.toFixed(1) * 10, 775, 380);
}

window.keyPressed = function () {
	if (input) input.pressKey(keyCode);
}

window.keyReleased = function () {
	if (input) input.releaseKey(keyCode);
}
