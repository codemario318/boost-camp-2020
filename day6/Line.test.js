const Line = require('./Line');
const Point = require('./Point');

let line,p1,p2;

beforeEach(() => {
    p1 = new Point(14,15);
    p2 = new Point(10,10);
    line = new Line([p1,p2]);
})

test("정상 입력 확인", () => {
    expect(line.points).toEqual([p2,p1]);
})

test("길이 결과 확인", () => {
    expect(line.getDist()).toEqual("6.403124");
})