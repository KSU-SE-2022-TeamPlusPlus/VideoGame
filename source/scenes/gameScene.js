import { AbstractScene } from "./abstractScene.js";
import { TitleScene } from "./titleScene.js";

// Utility
import { DepthSort } from "../depthSort.js";
import { WORLD } from "../world.js";

// Game Objects
import { Backdrop } from "../backdrop.js";
import { Runner } from "../dogFollower.js";
import { Player } from "../player.js";
import { Barrier } from "../barrier.js";
import { BarrierManager } from "../barrierManager.js";
import { ScoreTracker } from "../scoreTracker.js";
import { EndScene } from "./endScene.js";

export class GameScene extends AbstractScene {
	static gfxBackground;
	static sfxExplode;
	
	static preload() {
		// Preload background		
		Backdrop.preload();
		
		// Preload player / runner graphics
		Player.preload();
		Runner.preload();
		
		// Preload all barriers (see VARIANTS in Barrier for which files)
		Barrier.preload();

		GameScene.sfxExplode = loadSound("assets/explosion.wav");
		GameScene.sfxExplode.setVolume(1/2);
		GameScene.sfxExplode.playMode("restart");
	}
	
	enter(o) {
		// How fast the game scrolls
		this.scrollSpeed = 3;
		
		// Make the backdrop
		this.backdrop = new Backdrop(new p5.Vector(width, height));
		
		// Make the player / runner
		this.player = new Player();
		this.runner = new Runner();
		
		// Make barriers
		this.barrierManager = new BarrierManager();
		this.barrierManager.pushBarrier("brickwall");
		
		// Make score tracker object
		this.scoreTracker = new ScoreTracker();
		
		// Make depth sort object
		this.depthSort = new DepthSort();
	}
	
	update(dt) {
		// Physics & Animations
		
		this.player.update(dt);
		this.runner.update(dt);
		
		// Move obstacles with background
		this.barrierManager.update(dt, this.scrollSpeed);
	
		let collision = this.barrierManager.checkAgainstBarriers(this.player.position);
		if (collision) {
			console.log("It hit " + collision.variant.name);
			return this.parent.switchScene(EndScene);
		}

		let dogCollision = this.barrierManager.checkAgainstBarriers(this.runner.position);
		if (dogCollision) {
			dogCollision.explosion();
			GameScene.sfxExplode.play();
		}
		
		// Wrapping backdrop
		this.backdrop.update(dt, this.scrollSpeed);
		
		// Step score tracker forward
		this.scoreTracker.update(dt);
	}
	
	control(dt, input) {
		this.player.control(dt, input);
	}
	
	draw() {
		// Clear screen
		background(0);
			
		// == World Objects ==
		
		// Backdrop
		this.backdrop.draw();
		
		// Perspective Debug Information
		//WORLD.dbgDrawGrid();
		
		// First, draw the shadows.
		
		this.barrierManager.drawShadow(this.depthSort);
		this.depthSort.pushDraw(() => this.runner.drawShadow(), this.runner.position.z);
		this.depthSort.pushDraw(() => this.player.drawShadow(), this.player.position.z);
		
		// Flush draw
		this.depthSort.flushDraw();
		
		// Next, draw the graphics.
		
		// Runner (Dog)
		this.depthSort.pushDraw(() => this.runner.draw(), this.runner.position.z);
		
		// Player (Ball)
		this.depthSort.pushDraw(() => this.player.draw(), this.player.position.z);
		
		// Barriers
		this.barrierManager.draw(this.depthSort);
		
		// Flush draw
		this.depthSort.flushDraw();
		
		// Barrier Debug Information
		//this.barrierManager.dbgDrawPositions();
		//this.barrierManager.dbgDrawBoxes();
		//this.barrierManager.dbgDrawClosestLine();
		
		// == Heads-Up Display ==
		
		// Score Tracker
		this.scoreTracker.draw();
	}
	
	exit() {
		return this.scoreTracker;
	}
}
