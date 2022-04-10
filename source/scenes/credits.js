// to be completed in later card

import { AbstractScene } from "./scenes.js";

class Credits extends AbstractScene {
    preload() {
      Credits.imageBackground = loadImage("blah");
    }
    draw() { image(Credits.imageBackground, 0, 0); }

    enter() {} // -> called when switched into this state
    exit() {} // -> called when switching away from this state
  }