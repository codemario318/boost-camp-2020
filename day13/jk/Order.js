const menuNames = {1:'아메리카노', 2:'카페라떼', 3:'프라푸치노'};

class Order {
    constructor(id, owner, menu, remainTime) {
        this.id = id;
        this.owner = owner;
        this.menu = menu;
        this.remainTime = remainTime;
    }

    process = () => --this.remainTime === 0; 
    stringify = () => `${this.id}: "${this.owner}" 님의 ${menuNames[this.menu]}`;
}

module.exports = Order;
