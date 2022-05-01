import { AbstractScene } from "./abstractScene.js";
import { ControlsScene } from "./controlsScene.js";

export class TitleScene extends AbstractScene {
	static TITLE_IMAGE = null;
	
	static preload() {
		this.TITLE_IMAGE = loadImage("assets/titleScreen.png");
	}
	
	control(dt, input) {
		if (input.justPressed('jump')) {
			this.parent.switchScene(ControlsScene);
			return;
		}
	}

	update(dt) {

	}
	
	draw() { 
		image(TitleScene.TITLE_IMAGE, 0, 0, width, height);
		
	}

	enter() {
		//button initialization here, also local variables
	}
	
	exit() {
		//return variable that gets sent to enter of the next scene
	}
}

