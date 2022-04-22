// depthSort.js sounded better as a file name than zOrdering.js

// Instead of drawing your object directly, you pass a closure to this
// object, along with a Z value. Then, this'll draw in the correct order.

// This works generally - it's not specific to barriers or the player.

// It's really the first solution that came to my mind.
// Also, this probably isn't the standard definition of a "draw call".

export class DepthSort {
	constructor() {
		this.drawCalls = [];
	}
	
	// Give this object a new draw call.
	pushDraw(closure, z = 0) {
		this.drawCalls.push({ z, draw: closure, });
	}
	
	// Call every stored draw function, emptying this object's queue too.
	flushDraw() {
		// Nobody knows how to write a sort compare function off the top of
		// their heads. If someone tells you they do, they're lying.
		
		// Sorts each draw function, back to front.
		this.drawCalls.sort((a, b) => a.z - b.z);
		
		// Calls each draw function.
		this.drawCalls.forEach(d => d.draw());
		
		// Clears draw function list.
		this.drawCalls = [];
	}
}
