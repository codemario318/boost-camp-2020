const Cafe = require('./Cafe');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const cafe = new Cafe(3);

cafe.emit('order','A, 2:4, 1:7, 3:2');
console.log(cafe.orderQueue.orders);
cafe.open();
rl.prompt();

rl.on('line', (input) => {
    cafe.emit('order',input);
    rl.prompt();
})
