const readline = require('readline');

const Point = require("./Point");
const Line = require("./Line");
const Triangle = require("./Triangle");
const Rectangle = require("./Rectangle");
const numRegExp = /\-\d/;
const brktExp = /\(|\)/g;

const readPoints = (input) => {
    const points = input.split('-').map(ps => ps.replace(brktExp, '').split(',')).map(xy => {
        const x = Number(xy[0]),
            y = Number(xy[1]),
            point = new Point(x, y);
        return point;
    });
    return points;
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

rl.setPrompt('> 좌표를 입력하세요.\n');
rl.prompt();
rl.on('line', (read) => {
    const input = read.replace(/(\s*)/g, '');
    let points;
    if (input === 'quit') rl.close();

    if (numRegExp.test(input)) {
        console.error('음수값 입력.');
        rl.prompt();
        return;
    }

    try {
        points = readPoints(input);
    } catch (err) {
        console.error(err.name, err.messege);
        rl.prompt();
        return;
    }

    try {
        if (points.length == 1) {
            const p = points[0],
                point = new Point(p.x, p.y);
            console.log(point);
        } else if (points.length == 2) {
            const line = new Line(points);
            console.log(line.draw());
            console.log(line.getDist());
        } else if (points.length == 3) {
            const triangle = new Triangle(points);
            console.log(triangle.draw());
            console.log(triangle.getArea());
        } else if (points.length == 4) {
            const rectangle = new Rectangle(points);
            console.log(rectangle.draw());
            console.log(rectangle.getArea());
        }
    } catch (err) {
        console.error(err.name, err.messege);
    }
    rl.prompt();
})
rl.on('close', () => {
    process.exit();
});
