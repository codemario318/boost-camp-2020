const EventEmitter = require('events');
const { MENU } = require("./util");

class DashBoard extends EventEmitter {
    constructor() {
        super();
        this.board = [];
        this.orderCntList = [];
        this.orderCnt = 0;
        this.menuCnt = [0, 0, 0, 0];
    }
    
    add(orderList) {
        for(let i = 0; i < orderList.length; i++)
            this.board.push(orderList[i]);
        this.orderCntList.push(orderList.length);
    }

    pop(order) {
        for(let i = 0; i < this.board.length; i++){
            if(this.board[i].customer === order.customer && this.board[i].menu === order.menu){
                this.board.splice(i, 1);
                this.menuCnt[order.menu]++;
                this.orderCnt++;
                if(this.orderCnt === this.orderCntList[0]){
                    this.orderCnt = 0;
                    this.orderCntList.shift();
                    console.log(`\n===== ${order.customer}, ${MENU[1].name}*${this.menuCnt[1]}, ${MENU[2].name}*${this.menuCnt[2]}, ${MENU[3].name}*${this.menuCnt[3]} 주문 완성\n`)
                    this.menuCnt = [0, 0, 0, 0];
                }
                if(this.board.length === 0){
                    this.emit('allDone');
                }
                return;
            }
        }
    }

    printBoard() {
        setInterval(() => {
            console.log('\n/' + this.board.map((order) => (order.customer + order.menu)).join(',') + '/\n');
        }, 3000);
    }
}

module.exports = DashBoard;
