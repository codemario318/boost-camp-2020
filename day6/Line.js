const Figure = require('./Figure');

class Line extends Figure {
    constructor(points) {
        super(points);
    }

    getDist() {
        const [p1, p2] = this.points;
        return this._calcDist(p1, p2);
    }

    draw() {
        return this.points;
    }
}

module.exports = Line;