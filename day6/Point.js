module.exports = class Point {
    constructor(x, y, min=0, max=24) {
        this.x = x;
        this.y = y;
        this.min = min;
        this.max = max;
    }
}