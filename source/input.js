export class Input {
	// This should be passed a table of actions with associated keycodes.
	constructor(actionsObject) {
		this.actions = actionsObject;
		
		// Initialize everything else.
		this.resetAll(false);
	}
	
	// Resets all actions to false.
	// If set to honest, it'll correctly enable the justReleased bool.
	resetAll(honest = true) {
		for (let action of Object.values(this.actions)) {
			action.justReleased = honest && action.on || false;
			action.on = false;
			action.justPressed = false;
			action.time = 0;
		}
	}
	
	// Updates each action's time and just* values.
	update(dt) {
		for (let action of Object.values(this.actions)) {
			action.justPressed = action.time == 0 && action.on;
			action.justReleased = action.time > 0 && !action.on;
			
			if (action.on) action.time += dt;
			else           action.time = 0;
		}
	}
	
	// This code is not meant to survive beyond debugging.
	debugDraw() {
		const boolBox = (b, x, y) => {
			push();
			stroke(0);
			strokeWeight(1);
			if (b) fill(0, 1, 0); else fill(1, 0, 0);
			rect(x, y - 4, 10, 10);
			pop();
		};
		
		let y = 0;
		push();
		translate(32, 32);
		rectMode(CENTER);
		for (const ACT_KEY of Object.keys(this.actions)) {
			let action = this.actions[ACT_KEY];
			
			text(ACT_KEY, 0, y);
			let x = 40;
			boolBox(action.justPressed, x, y); x += 12;
			boolBox(action.on, x, y); x += 12;
			boolBox(action.justReleased, x, y); x += 12;
			text(action.time.toFixed(2), x, y);
			
			y += 16;
		}
		pop();
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
	
	// If the action is on.
	on(action) { return this.actions[action].on; }
	
	// If the action was just pressed.
	justPressed(action) { return this.actions[action].justPressed; }
	
	// If the action was just released.
	justReleased(action) { return this.actions[action].justReleased; }
	
	// How long an action has been on for, in seconds.
	timePressed(action) { return this.actions[action].time; }
}
