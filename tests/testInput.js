import { Input } from "../source/input.js";

const TIME_AMOUNT = 1/60;

testGroup("input",
	test("'just pressed'/'released' events fire", function() {
		let i = new Input({ foo: {}, bar: {} });
		
		// Push the button.
		i.pressAction('foo'); i.update(TIME_AMOUNT);
		
		assert( i.justPressed('foo'));
		assert(!i.justPressed('bar'));
		assert(!i.justReleased('foo'));
		assert(!i.justReleased('bar'));
		
		// Release the button.
		i.releaseAction('foo'); i.update(TIME_AMOUNT);
		
		assert(!i.justPressed('foo'));
		assert(!i.justPressed('bar'));
		assert( i.justReleased('foo'));
		assert(!i.justReleased('bar'));
	}),
	test("key hold time is accurate", function() {
		let i = new Input({ foo: {} });
		
		// is this a design flaw?
		// that pressed/released only update when update is called?
		// the problem is that we call update at the beginning of the frame
		// anyway, and if i were to change it such that .. p/r trigger when
		// you actually do so, the game'd miss most inputs, since the p/r
		// flags would already have been set and unset. strange catch-22.
		// i guess it's a non-problem outside of these tests.
		for (let j = 0; j < 2; j++) {
			i.pressAction('foo');
			areEqual(i.timePressed('foo'), 0);
			
			i.update(TIME_AMOUNT);
			areEqual(i.timePressed('foo'), TIME_AMOUNT);
			
			i.releaseAction('foo');
			i.update(TIME_AMOUNT);
			areEqual(i.timePressed('foo'), 0);
		}
	}),
	test("actions with same binding both react when key pressed", function() {
		let i = new Input({ foo: 1, bar: 1 });
		
		i.pressKey(1); i.update(TIME_AMOUNT);
		
		assert(i.justPressed('foo'));
		assert(i.justPressed('bar'));
	})
);
