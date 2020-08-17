const EventEmitter = require('events');

class Manager extends EventEmitter {
    constructor() {
        super();
    }

    checkOrder(orderQueue, barista) {
        setInterval(() => {
            if(orderQueue.isEmpty() && barista.isCraftable()){
                this.emit('deliverOrder', orderQueue.dequeueOrder());
            }
        }, 1000);
    }

    addDashBoard(dashBoard, orderList) {
        dashBoard.add(orderList);
    }

    popDashBoard(dashBoard, order) {
        dashBoard.pop(order);
    }
}

module.exports = Manager;
