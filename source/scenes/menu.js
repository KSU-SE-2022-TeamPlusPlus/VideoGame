import { AbstractScene } from "./scenes.js";

class Menu extends AbstractScene {
    preload() {
      Menu.imageBackground = loadImage("../../assets/backyard2.png"); 
      Menu.indicator = "menu";
    }
    draw() { image(Menu.imageBackground, 0, 0); }

    enter() {
        pushScene(new Menu);
    } // -> called when switched into this state
    exit() {
        //deallocate????
    } // -> called when switching away from this state
  }