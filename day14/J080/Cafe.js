const EventEmitter = require('events');

class Cashier extends EventEmitter { // 캐셔
    constructor(queue, dashBoard) {
        super();
        this.queue = queue;
        this.dashBoard = dashBoard;
        this.on('work', (line) => {
            setImmediate(() => {
                let result = this.checkInput(line);
                this.queue.emit('order', result);
                this.dashBoard.emit('order', result);
            })
        });
    }

    checkInput(line) { // 주문을 분석
        let orderList = line.split(",");
        let customer = orderList[0];
        let result = [];
        for (let i = 1; i < orderList.length; i++) {
            let orderToken = orderList[i].split(":").map(x => parseInt(x.trim()));
            for (let j = 0; j < orderToken[1]; j++) {
                result.push([customer, orderToken[0]]);
            }
        }
        return result;
    }
}

class Manager extends EventEmitter { // 매니저
    constructor(queue, dashBoard) {
        super();
        this.queue = queue;
        this.dashBoard = dashBoard;
        this.workingBarista = [];
        this.baristas = undefined;
        this.timer = undefined;
        this.on('finish', (baristaNum, drink) => { // 바리스타로부터 제작 완료 이벤트를 전달받았을 때
            let barista;
            if (this.workingBarista.length == 1) {
                barista = this.workingBarista.shift();
                this.baristas.push(barista);
            }
            else {
                for (let i = 0; i < this.workingBarista.length; i++) {
                    if (this.workingBarista[i].baristaNum == baristaNum && this.workingBarista[i].cur_menu == drink) {
                        barista = this.workingBarista[i];
                        this.baristas.push(barista);
                        this.workingBarista.splice(i, 1);
                        break;
                    }
                }
            }
            this.dashBoard.emit('finishlog', baristaNum, drink); // 대시보드에 제작 완료 로그를 찍도록 이벤트
        });
    }

    manage() {
        if (!this.queue.empty() && this.baristas.length) {
            let barista = this.baristas.shift();
            let drink = this.queue.pop();
            this.workingBarista.push(barista);
            barista.emit('work', drink, this.dashBoard.menuBoard[drink[1]][1]);
            this.queue.printQueue(); // 대기중인 음료 출력
            this.dashBoard.emit('startlog', barista.baristaNum, drink);
            this.printMaking(); // 제작중인 음료 출력
        }
        else if (this.queue.empty() && this.workingEmtpy()) {
            console.log("*** 모든 메뉴가 완성되었습니다 ^^");
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                console.log("*** 3초간 주문이 없으므로 마감되었습니다.");
                process.exit();
            }, 3000);
        }
        else {
            process.stdout.write(".");
        }
    }
    
    printMaking() {
        let log = "제작 중 음료 : "
        this.workingBarista.forEach(barista => {
            log += (barista.cur_menu[0] + barista.cur_menu[1] + " ");
        })
        console.log(log);
    }

    resetTimer() {
        clearInterval(this.timer);
        this.timer = setInterval(() => {
            this.manage(); // 1초마다 음료 제작 관리
        }, 1000);
    }

    workingEmtpy() { // 현재 제작중인 음료 리스트가 비어있는지 확인
        return this.workingBarista.length <= 0;
    }
}

class Barista extends EventEmitter { // 바리스타
    constructor(baristaNum, manager) {
        super();
        this.baristaNum = baristaNum;
        this.manager = manager;
        this.timer = undefined;
        this.cur_menu = undefined;
        this.on('work', (drink, len) => {
            this.cur_menu = drink;
            let sec = len * 1000;
            this.timer = setTimeout(() => {
                this.manager.emit('finish', this.baristaNum, drink);
            }, sec);
        });
    }
}

class Queue extends EventEmitter { // 음료 제작 대기 큐
    constructor() {
        super();
        this.drinkQueue = [];
        this.on('order', (drinkList) => {
            for (let drink of drinkList) {
                this.drinkQueue.push(drink);
            }
            this.printQueue();
        });
    }

    printQueue() {
        let log = "대기 중 음료 : "
        this.drinkQueue.forEach(drink => {
            log += (drink[0] + drink[1] + " ");
        })
        console.log(log);
    }

    empty() {
        return this.drinkQueue.length <= 0;
    }

    pop() {
        return this.drinkQueue.shift();
    }
}

class DashBoard extends EventEmitter { // 대시보드
    constructor(menuBoard) {
        super();
        this.menuBoard = menuBoard;
        this.customers = {};

        this.on('order', (drinkList) => {
            this.customers[drinkList[0][0]] = drinkList.length;
        });

        this.on('startlog', (baristaNum, drink) => {
            console.log("바리스타" + baristaNum + " : " + drink[0] + this.menuBoard[drink[1]][0] + " 시작");
        });

        this.on('finishlog', (baristaNum, drink) => {
            console.log("바리스타" + baristaNum + " : " + drink[0] + this.menuBoard[drink[1]][0] + " 완성");
            if (--this.customers[drink[0]] <= 0) {
                console.log("****" + drink[0] + "고객님 음료 모두 완성*****");
            }
        })
    }

    printMenu() {
        let log = "> 메뉴 = ";
        for (const [key, value] of Object.entries(this.menuBoard)) {
            log += (key + ". " + value[0] + "(" + value[1] + "s) ");
        }
        console.log(log);
    }
}

class Cafe {
    constructor(baristaNum, menuBoard) {
        this.queue = new Queue();
        this.dashBoard = new DashBoard(menuBoard);
        this.cashier = new Cashier(this.queue, this.dashBoard);
        this.manager = new Manager(this.queue, this.dashBoard, this.baristas);
        this.baristas = [];
        for (let i = 0; i < baristaNum; i++) {
            this.baristas.push(new Barista(i + 1, this.manager));
            this.baristas.push(new Barista(i + 1, this.manager));
        }
        this.manager.baristas = this.baristas;
    }

    open() {
        console.log("> 바리스타는 총 " + this.baristas.length/2 + "명 입니다.");
        this.dashBoard.printMenu();
        console.log("> 고객별로 주문할 음료 개수를 입력하세요.");
    }

    order(line) {
        this.cashier.emit('work', line);
        this.manager.resetTimer();
    }
}

const readline = require('readline');
const { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } = require('constants');
const { isUndefined } = require('util');
const { runInThisContext } = require('vm');
const { parse } = require('path');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let baristaNum;
rl.question("> 바리스타 인원을 입력해 주세요 : ", function (answer) {
    baristaNum = parseInt(answer);
    let myMenu = {
        1: ["아메리카노", 3],
        2: ["카페라떼", 5],
        3: ["프라프치노", 10]
    };

    let myCafe = new Cafe(baristaNum, myMenu);
    myCafe.open(); // 카페 오픈

    rl.setPrompt('> ');
    rl.prompt();
    rl.on("line", function (line) {
        myCafe.order(line);// 주문 시작
        rl.prompt();
    }).on("close", function () {
        process.exit();
    });
})
