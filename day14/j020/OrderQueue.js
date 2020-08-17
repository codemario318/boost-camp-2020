const { EventEmitter } = require("events");

class OrderQueue extends EventEmitter {
  constructor(dashBoard) {
    super();
    this.orders = [];
    this.dashBoard = dashBoard;
    this.on("order", order => {
      this.pushOrderToQueue(order);
      dashBoard.addOrder(order);
    })
  }
  pushOrderToQueue(order) {
    this.orders.push(order);
  }
}

module.exports = OrderQueue;