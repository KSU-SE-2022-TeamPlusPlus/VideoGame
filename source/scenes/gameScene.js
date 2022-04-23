import { AbstractScene } from "./abstractScene.js";

// Utility
import { DepthSort } from "../depthSort.js";
import { WORLD } from "../world.js";

// Game Objects
import { Runner } from "../runner.js";
import { Player } from "../player.js";
import { Barrier } from "../barrier.js";
import { BarrierManager } from "../barrierManager.js";
import { ScoreTracker } from "../scoreTracker.js";

export class GameScene extends AbstractScene {
    
    static gfxBackground;

	static preload() { 
        GameScene.gfxBackground = loadImage("assets/backyard pixel path.png");

        // Preload player / runner graphics
        Player.preload();
        Runner.preload();
        
        // Preload all barriers (see VARIANTS in Barrier for which files)
        Barrier.preload();
    }

    enter(o) {
        // Animation
        this.backgroundX = 0;
        this.backgroundSpeed = 3; // how fast background moves   
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
        this.barrierManager.update(dt, this.backgroundSpeed);
    
        let collision = this.barrierManager.checkAgainstBarriers(this.player.position); 
        if (collision) {
            console.log("It hit " + collision.variant.name);
        }
        
        // Wrap background
        // TODO: code smell
        this.backgroundX -= this.backgroundSpeed * dt;
        if (this.backgroundX < -width / WORLD.UNIT)
            this.backgroundX = this.backgroundX % (width / WORLD.UNIT);
        
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

        // Wrapping background
        image(GameScene.gfxBackground, Math.round(this.backgroundX * WORLD.UNIT), 0, width, height);
        image(GameScene.gfxBackground, Math.round(this.backgroundX * WORLD.UNIT + width), 0, width, height);

        // Perspective Debug Information
        WORLD.dbgDrawGrid();

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
        this.barrierManager.dbgDrawPositions();
        this.barrierManager.dbgDrawBoxes();
        this.barrierManager.dbgDrawClosestLine();

        // == Heads-Up Display ==

        // Score Tracker
        this.scoreTracker.draw();

    }

	exit() {
        return this.scoreTracker;
    }
}

