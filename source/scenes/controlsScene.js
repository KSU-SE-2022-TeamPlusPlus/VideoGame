import { AbstractScene } from "./abstractScene.js";
import { GameScene } from "./gameScene.js";
import { TitleScene } from "./titleScene.js";

export class ControlsScene extends AbstractScene {
	static CONTROLS_IMAGE = null;
	
	static preload() {
		ControlsScene.CONTROLS_IMAGE = loadImage("assets/controls.png");
	}
	
	control(dt, input) {
		if (input.justPressed('jump')) {
			this.parent.switchScene(GameScene);
			return;
		} else if (input.justPressed('title')) {
			this.parent.switchScene(TitleScene);
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

