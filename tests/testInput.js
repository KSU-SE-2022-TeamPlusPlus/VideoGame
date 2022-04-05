import { Input } from "../source/input.js";

const TIME_AMOUNT = 1/60;

testGroup("input",
	test("'just pressed' event fires", function() {
		let i = new Input({ foo: { binding: 1 } });
		
		// Push the button.
		i.pressKey(1);
		i.update(TIME_AMOUNT);
		
		assert(i.justPressed('foo'));
	}),
	test("'just released' event fires", function() {
		let i = new Input({ foo: { binding: 1 } });
		
		// Push the button.
		i.pressKey(1);   i.update(TIME_AMOUNT);
		i.releaseKey(1); i.update(TIME_AMOUNT);
		
		assert(i.justReleased('foo'));
	})
);
