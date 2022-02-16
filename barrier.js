// Barrier class to draw walls, and barriers on the screen for player to avoid or jump over
// It will allow to move() and draw() and have collision() detection
export class Barrier{
    constructor(){
        this.x = 0; //initial values 0 for coordinates
        this.y = 0;
    }
    get x() { return this.x; } //getter
    get y() { return this.y; }

    set x(xVal){ this.x = xVal; } //setter
    set y(yVal){ this.y = yVal; }

};