const Rectangle = require('./Rectangle');
const Point = require('./Point');

let rectangle, p1, p2, p3, p4;

beforeEach(() => {
    p1 = new Point(22, 10);
    p2 = new Point(10, 10);
    p3 = new Point(22, 18);
    p4 = new Point(10, 18);
    p5 = new Point(10, 14);
    rectangle = new Rectangle([p1, p2, p3, p4]);
})

test("정상 입력 확인", () => {
    expect(rectangle.points).toEqual([p2, p4, p1, p3]);
})

test("비정상 입력 확인", () => {
    expect(() => (new Rectangle([p1, p2, p3, p5])).toThrow('RectanglePointsError'));
})

test("넓이 계산 결과 확인", () => {
    expect(rectangle.getArea()).toEqual(96);
})

