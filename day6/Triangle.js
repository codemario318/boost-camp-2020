const Polygon = require('./Polygon');

class Triangle extends Polygon {
    getArea() {
        // ((x1y2+x2y3+x3y1) - (x1y3+x3y2+x2y1)) / 2
        const [p1, p2, p3] = this.points,
            res = (((p1.x * p2.y) + (p2.x * p3.y) + (p3.x * p1.y)) - ((p1.x * p3.y) + (p3.x * p2.y) + (p2.x * p1.y))) / 2;
        return Math.abs(res).toFixed(1);
    }

}

module.exports = Triangle;
