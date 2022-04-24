import { TitleScene } from "./titleScene.js";
import { GameScene } from "./gameScene.js";
import { EndScene } from "./endScene.js";

export class SceneManager {
	static GAME_SCENES = [
		TitleScene,
		GameScene,
		EndScene,
	];

	constructor() {}

	static preload() {
		for (let scene of SceneManager.GAME_SCENES) {
			scene.preload();
		}	
	}
	
	switchScene(NewOne) {
		let statePassed; 
		if (this.currentScene) statePassed = this.currentScene.exit();
		
		this.currentScene = new NewOne();
		this.currentScene.parent = this;
		this.currentScene.enter(statePassed);
	}
}




