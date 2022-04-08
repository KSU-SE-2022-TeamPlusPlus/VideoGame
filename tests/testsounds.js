import { Player } from "../source/player.js"
import { Input }  from "../source/input.js"
import { WORLD }  from "../source/world.js"

const TIME_AMOUNT = 1/60;
testGroup("sound",
 test("'player sound effects fires", function() {
   // Player.preload();
   let player = new Player();
   WORLD.soundsEnabled = true;
   let input = new Input({
       jump: {},
       up: {}, down: {}
   });
   //push the jump button.
   input.pressAction('jump');
   input.update(TIME_AMOUNT);

   try{
       player.control(TIME_AMOUNT, input);
       assert(false)
   } 
   catch (error){
       assert(error.message.includes("play"))
   }
 })
)

