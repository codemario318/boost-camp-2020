class Cashier {

  /* 주문 대기표에 추가 */
  sendOrderToQueue(order, orderQueue) {
    orderQueue.emit("order", order);
  }
}
module.exports = Cashier;