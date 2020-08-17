const EventEmitter = require('events');

class OrderQueue extends EventEmitter {
    constructor() {
        super();
        this.orders = [];
    }

    setOrder(menu) {
        this.orders.push(menu);
    }
}

const orderQueue = new OrderQueue();
orderQueue.on('set_order', function (menu) {
    this.setOrder(menu);
})

module.exports = orderQueue;