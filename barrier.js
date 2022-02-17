// Barrier class to draw walls, and barriers on the screen for player to avoid or jump over
// It will allow to move() and draw() and have collision() detection
export class Barrier{
    constructor(x,y){
        this.xVal = x; //initial values 0 for coordinates
        this.yVal = y;
    }
    get x() { return this.xVal; } //getter
    get y() { return this.yVal; }

    set x(x){ this.xVal = x; } //setter
    set y(y){ this.yVal = y; }

    move(speed){    //moves the x position by the current speed of background movement
        this.xVal=this.xVal-speed;
    }
};