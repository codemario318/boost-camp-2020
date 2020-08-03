const Polygon = require('./Polygon');

class Rectangle extends Polygon {
    constructor(points) {
        super(points);
        if (!this._pointsValueValidation(points)) {
            throw new Error('RectanglePointsError');
        }
    }

    getArea() {
        const [p1, p2, p3, _] = this.points;
        return this._calcDist(p1, p2) * this._calcDist(p1, p3);
    }

    _pointsValueValidation() {
        const [p1, p2, p3, p4] = this.points;
        return (this._calcDist(p1, p4) === this._calcDist(p2, p3)) ? true : false;
    }
}

module.exports = Rectangle;
