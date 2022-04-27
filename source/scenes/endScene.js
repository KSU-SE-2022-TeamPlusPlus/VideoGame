import { AbstractScene } from "./abstractScene.js";
import { TitleScene } from "./titleScene.js";
import { GameScene } from "./gameScene.js";

export class EndScene extends AbstractScene {
	static END_GAME_IMAGE = null;
	
	static preload() {
		this.END_GAME_IMAGE = loadImage("assets/gameOverScreen.png");
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
		image(EndScene.END_GAME_IMAGE, 0, 0, width, height);
		
	}

	enter() {
		//button initialization here, also local variables
	}
	
	exit() {
		//return variable that gets sent to enter of the next scene
	}
}

