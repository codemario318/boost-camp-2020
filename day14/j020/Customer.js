const { AMERICANO, LATTE, FRAPPUCCINO, WAITING } = require("./utils");

class Customer {
  constructor() {
    this.orders = [];
  }
  setName(name) {
    this.name = name;
  }
  orderAmericano(count = 1) {
    while (count--) this.orders.push({ name: AMERICANO, state: WAITING });
  }
  orderLatte(count = 1) {
    while (count--) this.orders.push({ name: LATTE, state: WAITING });
  }
  orderFrappuccino(count = 1) {
    while (count--) this.orders.push({ name: FRAPPUCCINO, state: WAITING });
  }
}

module.exports = Customer;