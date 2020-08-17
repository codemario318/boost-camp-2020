const EventEmitter = require('events');
const Order = require('./Order');
const menuTimes = {1: 3, 2: 5, 3: 10};

class Chashier extends EventEmitter {
    constructor(orderQueue, dashBoard) {
        super();
        this.orderId = 0;
        this.orderQueue = orderQueue;
        this.dashBoard = dashBoard;
        this.on('order', (order) => {
            setImmediate(() => {
                const [customer, ...orders] = order.replace(/(\s*)/g, "").split(',');
                const menus = new Map(orders.map(order => order.split(':').map(v => Number(v))));
                menus.forEach((num, menu) => {
                    for (let i = 0; i < num; i++) {
                        const order = new Order(++this.orderId, customer, menu, menuTimes[menu]);
                        this.orderQueue.push(order);                
                    }
                });
            });
        });
    }
}

module.exports = Chashier;
