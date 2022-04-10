// to be completed in later card

import { AbstractScene } from "./scenes.js";

class gameOver extends AbstractScene {
    preload() {
      gameOver.imageBackground = loadImage("blah");
    }
    draw() { image(gameOver.imageBackground, 0, 0); }

    enter() {} // -> called when switched into this state
    exit() {} // -> called when switching away from this state
  }