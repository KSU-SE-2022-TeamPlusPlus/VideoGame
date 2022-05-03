import { AbstractScene } from "./abstractScene.js";
import { TitleScene } from "./titleScene.js";
import { GameScene } from "./gameScene.js";

import { ScoreTracker } from "../scoreTracker.js";

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
		
		if (this.scoreTracker instanceof ScoreTracker) {
			text(`Your High Score: ${this.scoreTracker.highScore}`, 16, 16);
			if (this.scoreTracker.newHighest) {
				text("Congrats! It's a new high score!", 16, 32);
			}
		}
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

