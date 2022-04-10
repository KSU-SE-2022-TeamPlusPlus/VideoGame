// to be completed in later card

import { AbstractScene } from "./scenes.js";

class gameWin extends AbstractScene {
    preload() {
      gameWin.imageBackground = loadImage("blah");
    }
    draw() { image(gameWin.imageBackground, 0, 0); }

    enter() {} // -> called when switched into this state
    exit() {} // -> called when switching away from this state
  }