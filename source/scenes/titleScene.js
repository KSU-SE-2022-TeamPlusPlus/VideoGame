import { AbstractScene } from "./abstractScene.js";
import { GameScene } from "./gameScene.js";

import { ScoreTracker } from "../scoreTracker.js";

export class TitleScene extends AbstractScene {
	static TITLE_IMAGE = null;
	
	static preload() {
		this.TITLE_IMAGE = loadImage("assets/titleScreen.png");
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
		image(TitleScene.TITLE_IMAGE, 0, 0, width, height);
	}
	
	enter(st) {
		if (st instanceof ScoreTracker) {
			this.scoreTracker = st;
		}
	}
	
	exit() {
		return this.scoreTracker;
	}
}
