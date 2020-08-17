const orderQueue = require('./OrderQueue');
const { EventEmitter } = require('events');

class DashBoard extends EventEmitter {
    constructor(cafe) {
        super();
        this.waitings = [];
        this.makings = [];
        this.finishs = [];
        this.orderNum = 0;
        this.cafe = cafe;

        this.on('order', (order) => {
            this.orderNum++;
            this.waitings.push(order);
            this.print();
        });

        this.on('start', (order) => {
            this.waitings = this.waitings.filter((v) => order.id !== v.id);
            this.makings.push(order);
            this.print();
        });
        
        this.on('finish', (order) => {
            this.makings = this.makings.filter((v) => order.id !== v.id);
            this.finishs.push(order);
            this.print();

            if(this.orderNum === this.finishs.length) this.cafe.emit('close');
        });
    }

    print() {
        console.log(`\n${this._waitingBoard()}${this._makingBoard()}${this._finishBoard()}`);
    }

    _waitingBoard= () => `대기중\n${this.waitings.slice(0,5).filter(v => v.state === 'waiting').map(v => v.stringify()).join(', ')}\n`;
    _makingBoard = () => `제작중\n${this.makings.slice(this.makings.length-5).map(v => v.stringify()).join(', ')}\n`;
    _finishBoard = () => `완료됨\n${this.finishs.slice(this.finishs.length-5).join(', ')}\n`;
}

module.exports = DashBoard;
