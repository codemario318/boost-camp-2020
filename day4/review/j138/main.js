const dataSet = [];
let head = new infoData;
let tail = new infoData;
let count = 0;

function infoData() {
    this.id = undefined;
    this.title = undefined;
    this.time = undefined;
    this.next = undefined;
    this.prev = undefined;
}

function infoData(id, title, time) {
    this.id = id;
    this.title = title;
    this.time = time;
    this.next = undefined;
    this.prev = undefined;
}

function searchId(id) {
    for(let i = 0; i < dataSet.length; i++) {
        if(id == dataSet[i].id)
            return i;
    }
    return -1;
}

function checkId(id) {
    if(dataSet.length == 0)
        return true;

    else if(searchId(id) == -1)
        return true;

    else
        return false;
}

function creatData() {
    let id;

    for(let i = 1; i <= 13; i++) {
        do {
            id = Math.random().toString(36).substr(2,8);
        } while (!checkId(id));

        let newData = new infoData(id, "제목"+i, Math.floor(Math.random()*15)+1);
        dataSet[i-1] = newData;
    }
}

function printList() {
    console.log("---영상클립---");
    for(let i = 0; i < dataSet.length; i++)
        console.log(dataSet[i].title + "(" + dataSet[i].id + "):" + dataSet[i].time);
    console.log();
}

function addFirst(newData) {
    head.next = newData;
    newData.prev = head;
    newData.next = tail;
    tail.prev = newData;
}

function addLast(newData) {
    tail.prev.next = newData;
    newData.prev = tail.prev;
    newData.next = tail;
    tail.prev = newData;
}

function addData(id) {
    let index = searchId(id);
    if(index != -1) {
        let newData = dataSet[index];
        if(head.next == undefined)
            addFirst(newData);
        else
            addLast(newData);
        count++;
    }
    printData();
}

function insertData(id, num) {
    let index = searchId(id);
    if(index != -1) {
        let newData = dataSet[index];
        if(head.next == undefined)
            addFirst(newData);
        else if(num >= count)
            addLast(newData);
        else {
            let cur = head;
            for(let i = 0; i <= num; i++)
                cur = cur.next;
            cur.prev.next = newData;
            newData.prev = cur.prev;
            newData.next = cur;
            cur.prev = newData;
        }
        count++;
    }
    printData();
}

function removeData(id) {
    let cur = head;
    while(cur != undefined) {
        if(cur.id == id) {
            cur.prev.next = cur.next;
            cur.next.prev = cur.prev;
            count--;
            break;
        }
        else
            cur = cur.next;
    }
    printData();
}

function render() {
    console.log("영상클립: " + count + "개");
    let cur = head;
    let totalTime = 0;
    while(cur != undefined) {
        if(cur.time != undefined)
            totalTime = totalTime + cur.time;
        cur = cur.next;
    }

    console.log("전체길이: " + totalTime + "sec");
}

function printData() {
    process.stdout.write("|---");
    let cur = head;
    while(cur != undefined) {
        if(cur.id != undefined)
            process.stdout.write("[" + cur.id + ", " + cur.time + "sec]---");
        cur = cur.next;
    }
    process.stdout.write("[end]");
    console.log();
    console.log();
}

function command(answer) {
    let com = answer.split(' ');

    if(com[0] == "add")
        addData(com[1]);

    else if(com[0] == "insert")
        insertData(com[1], com[2]);

    else if(com[0] == "delete")
        removeData(com[1]);

    else if(com[0] == "render")
        render();

    else
        console.log("Wrong Command");

    return com[0];
}

function solution() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    let answer = "";
    let finish = "";

    rl.setPrompt("> ");
    rl.prompt();
    rl.on('line', function(line) {
        finish = command(line);
        if(finish == "render")
            rl.close();
        rl.prompt();
    });

    rl.on('close', function() {
        process.exit();
    });
}

creatData();
printList();
solution();