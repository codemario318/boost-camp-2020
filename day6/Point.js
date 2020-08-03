class Point {
    _MIN = 0;
    _MAX = 24;
    constructor(x, y) {
        if (this.pointValueValidation(x) || this.pointValueValidation(y)) {
            throw new Error(`pointValueError`)
        }
        this.x = x;
        this.y = y;
    }

    pointValueValidation(p) {
        return (p < this._MIN || p > this._MAX)? true:false;
    }
}

module.exports = Point;