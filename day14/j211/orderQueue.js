const EventEmitter = require('events');

class OrderQueue extends EventEmitter {
    constructor() {
        super();
        this.queue = [];
    }

    enqueueOrder(order) {
        for(let i = 0; i < order.length; i++)
            this.queue.push(order[i]);
    }

    isEmpty() {
        return !!this.queue.length;
    }

    dequeueOrder() {
        return this.queue.shift();
    }
}

module.exports = OrderQueue;
