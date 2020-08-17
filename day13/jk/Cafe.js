const EventEmitter = require('events');
const Manager = require('./Manager');
const Chashier = require('./Chashier');
const DashBoard = require('./DashBoard');
const OrderQueue = require('./OrderQueue');

class Cafe extends EventEmitter {
    constructor(baristaNum) {
        super();
        this.dashBoard = new DashBoard();
        this.orderQueue = new OrderQueue();
        this.manager = new Manager(this.orderQueue, this.dashBoard, baristaNum);
        this.chashier = new Chashier(this.orderQueue, this.dashBoard);

        this.on('close', () => setTimeout(() => process.exit()), 3000);
    }

    open() {
        this.manager.wakeUp();
    }

    listenOrder(order) {
        this.chashier.emit('listen_order', order);
    }
}

// const baristaNum = 3;
// const cafe = new Cafe(baristaNum);

// cafe.on('order', function(order) {
//     this.listenOrder(order)
// });
// cafe.on('shut_down', function() {
//     this.close()
// });

module.exports = Cafe