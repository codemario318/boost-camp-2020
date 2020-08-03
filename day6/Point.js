module.exports = class Point {
    _MIN = 0;
    _MAX = 24;
    constructor(x, y) {
        if (pointValueValidation(x) || pointValueValidation(y)) {
            throw new Error(`pointValueError: 좌표 허용 값은 ${_MIN} ~ ${_MAX} 입니다.`)
        }
        this.x = x;
        this.y = y;
    }

    pointValueValidation(p) {
        return (x < this._MIN || x > this._MAX)? true:false;
    }
}