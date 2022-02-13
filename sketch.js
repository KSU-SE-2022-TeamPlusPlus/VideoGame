//Scrolling background with basketball
//team++
var bgImg;
var character;
var b1,b2,b3,b4,b5,b6,b7,b8,b9,b10,b11;
var x1 = 0;
var x2;
var left,right,up,down;
var x = 100;
var y = 100;
var currentBall =2;
var temphold =0;
var currun=1;

var scrollSpeed = 3; //how fast background moves

function preload(){
	bgImg = loadImage("backgroundsky.png");
  b1 = loadImage("b11.png");
   b2 = loadImage("b10.png");
   b3 = loadImage("b9.png");
   b4 = loadImage("b8.png");
   b5 = loadImage("b7.png");
   b6 = loadImage("b6.png");
   b7 = loadImage("b5.png");
   b8 = loadImage("b4.png");
   b9 = loadImage("b3.png");
   b10 = loadImage("b2.png");
   b11 = loadImage("b1.png");
  
    r1 = loadImage("tile001.png"); //images for runner
   r2 = loadImage("tile002.png");
   r3 = loadImage("tile003.png");
   r4 = loadImage("tile004.png");
   r5 = loadImage("tile005.png");
   r6 = loadImage("tile005.png");
   r7 = loadImage("tile007.png");
   r8 = loadImage("tile008.png");
   r9 = loadImage("tile009.png");
   r10 = loadImage("tile010.png");
   r11 = loadImage("tile011.png");
  r12 = loadImage("tile012.png");
   r13 = loadImage("tile013.png");
   r14 = loadImage("tile014.png");
   r15 = loadImage("tile015.png");
  
}

function setup() { 
  createCanvas(800, 400); //physical size of app
  
  x2 = width;
} 

function draw() {
  function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    left = true;
    right = false;
    up = false;
    down = false;
  }
    if (keyCode === RIGHT_ARROW) {
    right = true;
      left = false;
      up = false;
      down = false;
        }
    if (keyCode === UP_ARROW) {
    up = true;
      down = false;
      right = false;
      left = false;
    }
      if (keyCode === DOWN_ARROW) {
    down = true;
        up = false;
        right = false;
        left = false;
      }
  }
  image(bgImg, x1, 0, width, height);
  image(bgImg, x2, 0, width, height);
  
  if (currun==1){
    cha=r1;
  }
  else if (currun==2){
    cha=r2;
  }
    else if (currun==3){
    cha=r3;
  }
    else if (currun==4){
    cha=r4;
  }
    else if (currun==5){
    cha=r5;
  }
    else if (currun==6){
    cha=r6;
  }
    else if (currun==7){
    cha=r7;
  }
    else if (currun==8){
    cha=r8;
  }
    else if (currun==9){
    cha=r9;
  }
    else if (currun==10){
    cha=r10;
  }
    else if (currun==11){
    cha=r11;
  }
    else if (currun==12){
    cha=r12;
  }
    else if (currun==13){
    cha=r13;
  }
    else if (currun==14){
    cha=r14;
  }
    else if (currun==15){ //reset back to 1 after all 15 images of runner have displayed
    cha=r15;
      currun=0;
  }
   image(cha,15,205,130,130);
  currun = currun+1; //go to next image of runner
  
  
  
  
  
  if (currentBall==1){
      character = b1;
    }
    else if (currentBall==2){
      character = b1;
    }
     else if (currentBall==3){
      character = b3;
    }
     else if (currentBall==4){
      character = b4;
    }
     else if (currentBall==5){
      character = b5;
    }
     else if (currentBall==6){
      character = b6;
    }
  else if (currentBall==7){
      character = b7;
    }
  else if (currentBall==8){
      character = b8;
    }
  else if (currentBall==9){
      character = b9;
    }
  else if (currentBall==10){
      character = b10;
    }
  else if (currentBall==11){
      character = b11;
    currentBall=1;
    }
    image(character,210,303,30,30);
  temphold=temphold+1;
  if (temphold>=6){
  currentBall=currentBall+1; // go to next ball image
    temphold=0;
  }
  keyPressed();

  if (right){
    x = x + 1;
  }
   if (left){
    x = x - 1;
  }
  if (up){
    jumping=1;
    y = y - 1;
  }
  if (down){
    jumping=0;
    y = y + 1;
  }
	
  
 
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;
  
  if (x1 < -width){
    x1 = width;
  }
  if (x2 < -width){
    x2 = width;
  }
  
}