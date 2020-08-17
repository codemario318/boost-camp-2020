const EventEmitter = require('events');
const readline = require("readline");

class Cashier extends EventEmitter {
    constructor() {
        super();
    }

    takeOrder() {
        console.log('> 메뉴  =  1. 아메리카노(3s)    2. 카페라떼(5s)    3. 프라프치노(10s)');
        console.log('> 고객별로 주문할 음료 개수를 입력하세요. 예) A고객, 아메리카노 2개, 프라프치노 1개 => A, 1:2, 3:1');

        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        this.rl.on("line", (line) => {
            if (line === "exit")
                this.rl.close();
            line = line.replace(/ /gi,"").split(',');
            const customer = line[0];
            let orderList = [];
            line = line.slice(1);
            line.map((order) => {
                order = order.split(':');
                for(let i = 0; i < order[1]; i++){
                    const menu = order[0];
                    orderList.push({customer, menu});
                }
            })
            this.emit('orderSuccess', orderList);
        }).on('close', () => {
            process.exit();
        })
    }
}

module.exports = Cashier;
