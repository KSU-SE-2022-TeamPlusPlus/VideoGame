class AbstractScene {
    preload() {} // -> define the assets here etc.
    setup() {} // -> don't actually know what the difference between this and a constructor would be...
    update(dt) {} // -> gotta include that delta time
    draw() {} // -> adoiasdlkasfjslawdadwaopk
    
    // maybe keyPressed and keyReleased should be given to states too?
    //...
    
    // and then some special ones like
    enter() {} // -> called when switched into this state
    exit() {} // -> called when switching away from this state
}

export class SceneManager {
    constructor() {
        this.scenes = [];
        this.currentScene = "menu";
    }

    pushScene(scene) {
        this.currentScene = scene.indicator;
        this.scenes.push(scene);
    }

    draw() {
        scenes
    }
}
