<<<<<<< HEAD
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

var scrollSpeed = 2;

function preload(){
	bgImg = loadImage("backgroundsky.png");
  b1 = loadImage("b1.png");
   b2 = loadImage("b2.png");
   b3 = loadImage("b3.png");
   b4 = loadImage("b4.png");
   b5 = loadImage("b5.png");
   b6 = loadImage("b6.png");
   b7 = loadImage("b7.png");
   b8 = loadImage("b8.png");
   b9 = loadImage("b9.png");
   b10 = loadImage("b10.png");
   b11 = loadImage("b11.png");
  
}

function setup() { 
  createCanvas(800, 400);
  
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
  
  if (currentBall==1){ //image unused to make scrolling look more smooth, skips b2 and re starts when rotated back to currentball=2
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
    currentBall=1; //go back to beginning
    }
    image(character,100,255,80,80);
  temphold=temphold+1;
  if (temphold>=6){ //slows rotation of ball
  currentBall=currentBall+1; //go to next ball image to spin
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

