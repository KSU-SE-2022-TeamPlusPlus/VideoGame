import { Barrier } from "../source/barrier.js";
import { BarrierManager } from "../source/barrierManager.js";

const TIME_AMOUNT = 1/60;

testGroup("barrier",
	test("'Loaded VARIANT[brickwall]' successfully", function() {		
		
		assert(Barrier.VARIANTS.brickwall.image="assets/brickwall.png");
	}),
	test("VARIANT[tree stump] span is set", function() {		
			assert(Barrier.VARIANTS.treeStump.span == 1 );
	})
);
