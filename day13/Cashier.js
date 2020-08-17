const EventEmitter = require('events');
const orderQueue = require('./OrderQueue');
const Order = require('./Order');
const menuTimes = { '1': 3, '2': 5, '3': 10 };

class Cashier extends EventEmitter {
    constructor() {
        super();
        this.orderId = 0;
    }

    decodeOrder(order) {
        const [customer, ...orders] = order.replace(/(\s*)/g, "").split(',');
        const menus = new Map(orders.map(order => order.split(':').map(v => Number(v))));
        menus.forEach((num, menu) => {
            for (let i = 0; i < num; i++) {
                const order = new Order(++this.orderId, customer, menu, menuTimes[menu]);
                orderQueue.setOrder(order);
            }
        })
    }

}

const cashier = new Cashier();
cashier.on('listen_order', function (order) {
    this.decodeOrder(order);
})
module.exports = cashier;
