const { EventEmitter } = require("events");

class Manager extends EventEmitter {

  constructor(dashBoard) {
    super();
    this.on("finish", finishedBeverageInfo => {
      dashBoard.emit("update", finishedBeverageInfo);
    })
  }

  /* 주문 대기표에 주문이 있으면 true 없으면 false */
  checkOrderQueue(orderQueue) {
    if (orderQueue.orders.length) {
      return true
    }
    return false;
  }

  /* 놀고 있는 바리스타에게 주문을 전달 */
  sendOrderToBarista(barista, order) {
    barista.emit("order", order);
  }
}

module.exports = Manager;