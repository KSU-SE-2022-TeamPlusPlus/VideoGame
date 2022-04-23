export class AbstractScene {
	static preload() {}
	update(dt) {}
	draw() {}
	enter(o) {}
	exit() {}
	control() {dt, input}
}