const orderQueue = require('./OrderQueue');

class DashBoard {
    constructor() {
        this.finishList = [];
        this.waitingList = [];
    }

    updateFinish(order) {
        this.finishList.push(order.stringify());
    }

    updateWaiting(order) {
        this.waitingList.push(order);
        this.waitingList = this.waitingList.filter(v => v.state === 'maiking');
    }

    getBoard() {
        return `${this._waitingBoard()}${this._makingBoard()}${this._finishBoard()}`
    }

    _waitingBoard = () => `대기중\n${orderQueue.orders.slice(0, 5).filter(v => v.state === 'waiting').map(v => v.stringify()).join(', ')}\n`;
    _makingBoard = () => `제작중\n${this.waitingList.slice(this.waitingList.length - 5).map(v => v.stringify()).join(', ')}\n`;
    _finishBoard = () => `완료됨\n${this.finishList.slice(this.finishList.length - 5).join(', ')}\n`;
}

module.exports = new DashBoard();
