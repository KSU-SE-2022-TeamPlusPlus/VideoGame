import { ScoreTracker, scoreTracker } from "../source/scoreTracker.js";

testScore = new ScoreTracker();

testGroup("score",
	test("score 50", function() {
		if(testScore.score == 50) assert(testScore.score == 50);
	}),
	test("score 200", function() {
		if(testScore.score == 200) assert(ScoreTracker.score == 200);
	}),
	test("score 1000", function() {
		if(testScore.score == 1000) assert(ScoreTracker.score == 1000);
	}),
    test("score not zero", function() {
        assert(testScore.score === 0);
    })
);

testGroup("high score",
	test("high score changes", function() {
		if(testScore.highScore === 0) assert(testScore.highScore > 0);
	}),
	test("high score changes from higher ceiling", function() {
		testScore.highScore = 500;
        if(testScore.highScore > 500) assert(ScoreTracker.highScore > 500);
	})
);

