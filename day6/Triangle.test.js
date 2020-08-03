const Triangle = require('./Triangle');
const Point = require('./Point');

let triangle, p1, p2, p3;

beforeEach(() => {
    p1 = new Point(20, 8);
    p2 = new Point(10, 10);
    p3 = new Point(14, 15);
    triangle = new Triangle([p1, p2, p3]);
})

test("정상 입력 확인", () => {
    expect(triangle.points).toEqual([p2, p3, p1]);
})

test("넓이 계산 결과 확인", () => {
    expect(triangle.getArea()).toEqual("29.0");
})
