const EventEmitter = require("events");
const { MENU } = require("./util");

class Barista extends EventEmitter {
    constructor(cnt = 1) {
        super();
        this.cnt = cnt;
        this.idx = -1;
        this.statusList = new Array(cnt).fill(0);
        console.log(`> 바리스타는 총 ${cnt}명 입니다.`);
    }

    makeMenu(order) {
        for(let i = 0; i < this.cnt; i++){
            this.idx = (this.idx + 1) % this.cnt;
            if(this.statusList[this.idx] < 2) {
                const selected = this.idx;
                this.statusList[selected]++;
                console.log(`바리스타${selected + 1}-${order.customer}${MENU[order.menu].name} 시작`);
                this.emit("startMaking", order);
                setTimeout(() => {
                    this.statusList[selected]--;
                    console.log(`바리스타${i + 1}-${order.customer}${MENU[order.menu].name} 완성`);
                    this.emit("endMaking", order);
                }, MENU[order.menu].time * 1000);
                return;
            }
        }
    }

    isCraftable() {
        return !this.statusList.every((cnt) => {
            return cnt === 2;
        });
    }
}

module.exports = Barista;
