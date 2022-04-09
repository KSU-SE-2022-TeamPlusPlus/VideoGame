import { Player } from "../source/player.js";
import { Input } from "../source/input.js";
import { WORLD } from "../source/world.js";

const TIME_AMOUNT = 1/60;

testGroup("sound",
	test("player plays jump sound effect", function () {
		// Player.preload();
		// Oh, we don't even have p5 loaded. That means no loadSound.
		// We'll have to find another way to check that the jump sound effect
		// is played. Here's a unique hack, never-before-seen!
		
		let player = new Player();
		let input = new Input({ jump: {}, up: {}, down: {} });
		
		// Push the jump button.
		input.pressAction('jump');
		input.update(TIME_AMOUNT);
		
		// Oops, V is bad at  design
		// TODO: sound settings shouldn't ever have been in world.
		// but then how do you--
		// okay fine i guess i'm making source/sound.js. coming soon
		let prevSoundsEnabled = WORLD.soundsEnabled;
		WORLD.soundsEnabled = true;
		
		try {
			// We've pressed the jump button,
			// and we should inform the player object about that.
			player.control(TIME_AMOUNT, input);
			
			// If we made it through that without erroring, the player did not
			// attempt to play the jump sound. If the above method errors when
			// trying to call `sfxBoing.play()`, we know that the player object
			// attempted to play a sound. The sound will actually be loaded in
			// the real game, so it won't error in that scenario.
			assert(false);
		}
		catch (error) {
			// Firefox gives an error about "sfxBoing"
			// Chrome gives an error about no "play" method
			
			// We just search in the error message for both these strings
			// to prove that the player *tried* to play a sound after jumping.
			
			// If this assertion fails, we know that we probably hit the
			// `assert(false)` and the `player.control` succeeded, which means
			// the player did not (attempt to) play the boing sound.
			assert(error.message.includes("sfx") || error.message.includes("play"));
		}
		
		// Reset soundsEnabled state,
		// to allow other tests to mess with it as well.
		WORLD.soundsEnabled = prevSoundsEnabled;
	})
)

