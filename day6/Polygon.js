const Figure = require('./Figure');

class Polygon extends Figure {
    getArea() {
        throw new Error('getArea() 구현 필요.');
    }

}

module.exports = Polygon;