const EventEmitter = require('events');
const Barista = require('./Barista');
// const orderQueue = require('./OrderQueue');
// const dashBoard = require('./DashBoard');

class Manager extends EventEmitter {
    constructor(orderQueue, dashBoard, baristaNum) {
        super();
        this.orderQueue = orderQueue;
        this.dashBoard = dashBoard;
        this.baristas = new Array(baristaNum).fill(0).map((v,i) => new Barista(this, i+1));
        this.timer = undefined;

        this.on('start_order',(barista, name, order) => {
            setImmediate(() => {
                console.log(`${barista.name}-바리스타 ${order.stringify()} 시작.`);
                this.dashBoard.emit('start', order);
            });
        });

        this.on('finish_order',(barista, name, order) => {
            setImmediate(() => {
                this.dashBoard.emit('finish', order);
                this.baristas.push(barista);
                console.log(`${barista.name}-바리스타 ${order.stringify()} 종료.`);
            });
        });
    }
    
    checkOrder() {
        if (this.orderQueue.orders.length > 0 && this.baristas.length > 0){
            const order = this.orderQueue.orders.shift();
            const barista = this.baristas.shift();
            barista.emit('take_order', order);
        }    
    }

    wakeUp() {
        clearInterval(this.timer);
        this.timer = setInterval(() => this.checkOrder(), 1000);
    }
}

// const manager = Manager;
// manager.on('wake_up', function (manager, baristas) {
//     this.wakeUp(manager, baristas);
// })
// manager.on('finish_order', function (order) {
//     this.updateOrder(order);
// })

module.exports = Manager;
