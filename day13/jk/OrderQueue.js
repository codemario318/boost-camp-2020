const EventEmitter = require('events');

class OrderQueue extends EventEmitter {
    constructor() {
        super();
        this.orders = [];
        this.on('set_order',(order) => {
            setImmediate(()=> this.orders.push(order))
        });
    }
}

// const orderQueue = new OrderQueue();
module.exports = OrderQueue;