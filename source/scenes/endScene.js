import { AbstractScene } from "./abstractScene.js";
import { TitleScene } from "./titleScene.js";
import { GameScene } from "./gameScene.js";

import { ScoreTracker } from "../scoreTracker.js";

function postJSONObject(path, object) {
	let req = new XMLHttpRequest();
	req.open('POST', path, true);
	req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	req.addEventListener("readystatechange", ()=>{
		if (req.readyState == XMLHttpRequest.DONE) {
			// let f = document.createElement("iframe");
			// let b = new Blob([req.responseText], { type: "text/html; charset=utf-8" });
			// f.src = URL.createObjectURL(b);
			// f.style.color = "black";
			// f.style.background = "white";
			// document.body.appendChild(f);
			console.log("ok it's posted");
		}
	})
	req.send(JSON.stringify(object));
}

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
			
			if (this.scoreTracker.newHighest) {
				postJSONObject("/scores/post",
					{
						name: prompt("High score! Enter your name.", "🧱"),
						score: this.scoreTracker.score.toString(),
					}
				);
			}
		}
	}
	
	exit() {
		return this.scoreTracker;
	}
}

