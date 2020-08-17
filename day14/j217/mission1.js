const readline = require('readline');
const Coffee = require('./coffee');
const EventEmitter = require('events');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let orderQueue = [];
let baristarQueue = [];
let deleteIdx = [];

function checkOrderQueue() {
    EventEmitter.call(this);
    let order = "/";
    for (let coffeeNum of orderQueue) {
        if (order != "/")
            order += ",";
        order += coffeeNum;
    }
    console.log(order += "/");

    deleteIdx = [];
    if (orderQueue.length > 0 && baristarQueue.length < 2)
        barist.startCoffee();
    for (let idx in baristarQueue) {
        if (baristarQueue[idx].totalTime < baristarQueue[idx].costTime)
            barist.makingCoffee(idx);
        if (baristarQueue[idx].costTime == baristarQueue[idx].totalTime)
            barist.endCoffee(idx);
    }
    for(let del of deleteIdx)
        baristarQueue.splice(baristarQueue[del], 1);
    // console.log(baristarQueue);
}

checkOrderQueue.prototype = new EventEmitter();
checkOrderQueue.prototype.startCoffee = function() {
    this.emit('startCoffee');
}
checkOrderQueue.prototype.makingCoffee = function(idx) {
    this.emit('makingCoffee', idx);
}
checkOrderQueue.prototype.endCoffee = function(idx) {
    this.emit('endCoffee', idx);
}
checkOrderQueue.prototype.addOrder = function(order) {
    this.emit('addOrder', order);
}

var barist = new checkOrderQueue();
barist.on('startCoffee', function() {
    let newCoffee = new Coffee(orderQueue[0]);
    newCoffee.state = "제작중"
    console.log(newCoffee.name + " 시작");
    baristarQueue.push(newCoffee);
    orderQueue.splice(0, 1);
});

barist.on('makingCoffee', function(idx) {
    baristarQueue[idx].totalTime++;
});

barist.on('endCoffee', function(idx) {
    baristarQueue[idx].state === "완료"
    console.log(baristarQueue[idx].name + " 완성");
    deleteIdx.push(idx);
});

barist.on('addOrder', function(order) {
    orderQueue.push(order);
});

console.log("메뉴  =  1. 아메리카노(3s)    2. 카페라떼(5s)    3. 프라프치노(10s)")
console.log("주문할 음료를 입력하세요. 예) 아메리카노 2개 => 1:2");

setInterval(checkOrderQueue, 1000);

rl.on('line', function(line) {
    line = line.split(":");
    line[0] = parseInt(line[0]);
    line[1] = parseInt(line[1]);
    if (line[0] < 1 || line[0] > 3 || line[0] === undefined || line[1] === undefined)
        console.log("입력값이 잘못되었습니다.")
    else
        while (line[1]--) { 
            barist.addOrder(line[0]);
        }
}).on("close", function() {
    console.log("모든 메뉴가 완성되었습니다.")
    process.exit();
});
