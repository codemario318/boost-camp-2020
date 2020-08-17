const EventEmitter = require('events');
const orderQueue = require('./OrderQueue');
const dashBoard = require('./DashBoard');

class Manager extends EventEmitter {
    constructor() {
        super();
        this.emptyCount = 0;
    }

    openCafe(manager, baristas) {
        this.openTimer = setInterval(manager.checkOrder, 1000, manager, baristas);
    }

    checkOrder(manager, baristas) {
        const extraBaristas = baristas.filter(v => !v.isBusy());
        // console.clear();
        console.log(dashBoard.getBoard());

        if (extraBaristas.length > 0 && orderQueue.orders.length > 0) {
            if (baristas.length <= 2) {
                const order = orderQueue.orders.shift();
                const barista = extraBaristas.sort((a, b) => b.getExtra() - a.getExtra())[0];
                console.log(`${order.stringify()} 시작.`);
                order.state = 'maiking';
                dashBoard.updateWaiting(order);
                barista.emit('take_order', barista, order);
            } else {
                const tempQ = [];

                while (orderQueue.orders.length !== 0) {
                    const order = orderQueue.orders.shift();
                    const barista = extraBaristas.find((v) => v.name == order.menu);

                    if (barista !== undefined && !barista.isBusy()) {
                        console.log(`${barista.name}-바리스타 ${order.stringify()} 시작.`);
                        order.state = 'maiking';
                        dashBoard.updateWaiting(order);
                        barista.emit('take_order', barista, order);
                        break;
                    } else tempQ.push(order);
                }

                orderQueue.orders = tempQ.concat(orderQueue.orders);
            }
        } else console.log('작업 가능한 바리스타가 없습니다.');

        if (orderQueue.orders.length < 1 && baristas.filter(v => v.isFree).length === baristas.length) manager.emptyCount++;
        else manager.emptyCount = 0;

        if (manager.emptyCount === 3) {
            clearInterval(manager.openTimer);
            console.log(dashBoard.getBoard());
            process.exit();
        }
    }

    updateOrder(order) {
        dashBoard.updateFinish(order);
    }
}

const manager = new Manager();
manager.on('open_cafe', function (manager, baristas) {
    this.openCafe(manager, baristas);
})
manager.on('finish_order', function (order) {
    this.updateOrder(order);
})

module.exports = manager;
