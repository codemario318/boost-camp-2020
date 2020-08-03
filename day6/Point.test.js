const Point = require('./Point');

test("정상 입력 확인", () => {
    const p1 = new Point(1,2);
    const p2 = new Point(0,24);
    
    expect(p1.x).toBe(1);
    expect(p1.y).toBe(2);
    
    expect(p2.x).toBe(0);
    expect(p2.y).toBe(24);
    
    expect(() => (new Point(-1,24)).toThrow("pointValueError"));
    expect(() => (new Point(0,25)).toThrow("pointValueError"));
})