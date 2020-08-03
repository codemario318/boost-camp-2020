const Polygon = require('./Polygon');
const Point = require('./Point');

let polygon, p1, p2, p3, p4;

beforeEach(() => {
    p1 = new Point(14, 15);
    p2 = new Point(10, 10);
    p3 = new Point(0, 0);
    polygon = new Polygon([p1, p2, p3]);
})

test("정상 입력 확인", () => {
    expect(polygon.points).toEqual([p3, p2, p1]);
})
