const Cashier = require('./cashier');
const OrderQueue = require('./orderQueue');
const Manager = require('./manager');
const Barista = require('./barista');
const DashBoard = require('./dashBoard');

const cashier = new Cashier();
const orderQueue = new OrderQueue();
const manager = new Manager();
const barista = new Barista(3);
const dashBoard = new DashBoard();

let endTimer = undefined;

cashier.on('orderSuccess', (orderList) => {
    orderQueue.enqueueOrder(orderList);
    manager.addDashBoard(dashBoard, orderList);
    clearTimeout(endTimer);
});

manager.on('deliverOrder', (order) => {
    barista.makeMenu(order);
});

barista.on('endMaking', (order) => {
    manager.popDashBoard(dashBoard, order);
});

dashBoard.on('allDone', () => {
    console.log('모든 메뉴가 완성되었습니다. 추가 주문이 없을 경우 3초 뒤에 종료됩니다.\n')
    endTimer = setTimeout(() => {
        process.exit(1);
    }, 3000);
});

cashier.takeOrder();
manager.checkOrder(orderQueue, barista);
dashBoard.printBoard();
