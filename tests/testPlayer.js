import { Player } from "../source/player.js";
import { Input } from "../source/input.js";

const TIME_AMOUNT = 1/60;

testGroup("Lane Switching",
	test("Lane Switch Up", function() {		
		let p = new Player();
        let i = new Input({ jump: {}, up: {}, down: {}});
        i.pressAction('up');
		i.update(TIME_AMOUNT);

		p.control(TIME_AMOUNT, i);

		assert(p.currentLane == -1);
	}),
	test("Lane Switch Down", function() {		
		let p2 = new Player();
		let j = new Input({ jump: {}, up: {}, down: {}});
        j.pressAction('down');
		j.update(TIME_AMOUNT);

		p2.control(TIME_AMOUNT, j);
		
		assert(p2.currentLane == 1);
	})
);