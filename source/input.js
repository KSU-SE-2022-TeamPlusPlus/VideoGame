export class Input {
	// This should be passed a table of actions with associated keycodes.
	constructor(actionsObject) {
		this.actions = actionsObject;
		
		// Initialize everything else.
		this.resetAll();
	}
	
	resetAll() {
		for (let action of Object.values(this.actions)) {
			action.on = false;
			action.justPressed = false;
			action.time = 0;
			action.justReleased = false;
		}
	}
	
	update(dt) {
		for (let action of Object.values(this.actions)) {
			if (action.on) {
				if (action.justPressed)
					action.justPressed = false;
				
				action.time += dt;
			} else {
				if (action.justReleased)
					action.justReleased = false;
				
				action.time = 0;
			}
		}
	}
	
	// Use inside p5's keyPressed function.
	keyPressed() {
		for (let action of Object.values(this.actions)) {
			if (keyCode == action.binding) {
				action.on = true;
			}
		}
	}
	
	// Use inside p5's keyReleased function.
	keyReleased() {
		for (let action of Object.values(this.actions)) {
			if (keyCode == action.binding) {
				action.on = false;
			}
		}
	}
	
	// Not the prettiest utility functions:
	
	on(action) { return this.actions[action].on; }
	justPressed(action) { return this.actions[action].justPressed; }
	justReleased(action) { return this.actions[action].justReleased; }
	timePressed(action) { return this.actions[action].time; }
}
