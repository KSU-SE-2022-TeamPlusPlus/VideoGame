import { AbstractScene } from "./abstractScene.js";
import { GameScene } from "./gameScene.js";

export class TitleScene extends AbstractScene {
	static TITLE_IMAGE = null;
	
	static preload() {
		this.TITLE_IMAGE = loadImage("../assets/backyard2.png");
		
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
		image(TitleScene.TITLE_IMAGE, 0, 0);
	}

	enter() {
		//button initialization here, also local variables
	}
	
	exit() {
		//return variable that gets sent to enter of the next scene
	}
}

