import { AbstractScene } from "./abstractScene.js";

export class EndScene extends AbstractScene {
	static TITLE_IMAGE = null;
	
	static preload() { /* snip */ }
	
	enter() {
		this.ui = new WidgetContainer();
		
		// snip
		this.ui.addWidget("StartButton", new WButton(
			[GRID_SPACE * 2, height - 128], [256, 96], "Play",
			// i guess you pass in the class object?
			ui => switchState(GameScene)
		));
		this.ui.addWidget("AboutButton", new WButton(
			[width - GRID_SPACE * 2 - 256, height - 128], [256, 96], "About",
			ui => switchState(AboutState)
		));
	}
	
	draw() { /* snip */ }
}

