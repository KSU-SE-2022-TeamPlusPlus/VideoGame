export class AbstractScene {
	// Run once at start of entire sketch.
	static preload() {}
	
	enter(o) {}
	exit() {} // -> object to pass to next scene
	
	control(dt, input) {}
	update(dt) {}
	draw() {}
}
