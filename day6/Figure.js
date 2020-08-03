class Figure {
    constructor(points) {
        this.points = points;
        this.points.sort((a, b) => {
            if (a.x == b.x) return (a.y - b.y);
            else return a.x - b.x;
        });
    }

    _calcDist(p1, p2) {
        const x = Math.pow(p1.x - p2.x, 2),
            y = Math.pow(p1.y - p2.y, 2),
            res = Math.sqrt(x + y);
        return res.toFixed(6);
    }

    draw() {
        return this.points;
    }
}

module.exports = Figure;