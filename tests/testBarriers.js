import { Barrier } from "../source/barrier.js";
import { BarrierManager } from "../source/barrierManager.js";

const TIME_AMOUNT = 1/60;

testGroup("barrier",
	test("'Loaded VARIANT.brickwall' event fires", function() {
		Barrier.preload();
		
		assert(Barrier.VARIANTS.brickwall.image="assets/brickwall.png");
	}),
	test("'Drawn correctly' event fires", function() {
		
		
		assert(false);
	})
);
