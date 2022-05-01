import { AbstractScene } from "./abstractScene.js";
import { GameScene } from "./gameScene.js";

export class ControlsScene extends AbstractScene {
	static CONTROLS_IMAGE = null;
	
	static preload() {
		this.CONTROLS_IMAGE = loadImage("assets/titleScreen.png");
	}
	
	control(dt, input) {
		if (input.justPressed('jump')) {
			this.parent.switchScene(GameScene);
			return;
		}
	}

	update(dt) {

	}
	
	draw() { 
		image(ControlsScene.CONTROLS_IMAGE, 0, 0, width, height);
		
	}

	enter() {
		//button initialization here, also local variables
	}
	
	exit() {
		//return variable that gets sent to enter of the next scene
	}
}

