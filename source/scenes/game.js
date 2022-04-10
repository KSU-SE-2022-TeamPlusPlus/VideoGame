import { AbstractScene } from "./scenes.js";

class Game extends AbstractScene {
    preload() {
      Game.imageBackground = loadImage("../../assets/backyard pixel path.png");
      Game.indicator = "game";
    }
    draw() { image(Game.imageBackground, 0, 0); }

    enter() {  // -> called when switched into this state
        pushScene(new Game);
    }
    exit() { // -> called when switching away from this state

    } 
  }