const EventEmitter = require('events');
const manager = require('./Manager');
const cashier = require('./Cashier');
const makeBarista = require('./Barista');
const dashBoard = require('./DashBoard');
const readline = require('readline');

class Cafe extends EventEmitter {
    constructor(baristaNum) {
        super();
        this.manager = manager;
        this.cashier = cashier;
        this.dashBoard = dashBoard;
        this.baristas = Array(baristaNum).fill(2).map((v, i) => makeBarista(i + 1, v));
    }

    open() {
        this.manager.emit('open_cafe', this.manager, this.baristas);
    }

    listenOrder(order) {
        this.cashier.emit('listen_order', order);
    }
}

const baristaNum = 3;
const cafe = new Cafe(baristaNum);

cafe.on('order', function (order) {
    this.listenOrder(order)
});
cafe.on('shut_down', function () {
    this.close()
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

if (require.main === module) {
    cafe.emit('order', 'A, 2:4, 1:5, 3:2');
    cafe.open();
    rl.prompt();

    rl.on('line', (input) => {
        cafe.emit('order', input);
        rl.prompt();
    })
}

module.exports = {
    Cafe,
}