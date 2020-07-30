const videos = [];

class Video{
    constructor(id, title, time, next=undefined) {
        this.id = id;
        this.title = title;
        this.time = time;
        this.next = next;
    }
}
console.log("---영상클립---");
for (let i=1; i<=13; i++){
    let title = "제목"+i;
    let id = Math.random().toString(36).substr(2,6);
    let time = Math.floor((Math.random() * 15) + 1)
    const vid = new Video(id, title, time);
    videos.push(vid);
    console.log(`${vid.title}(${vid.id}):${vid.time}`);
}


// -----LinkedLIst 자료구조 구현-------//

class Node {
    constructor(id, next = null){
        this.id = id;
        this.next = next;
    }
}

class LinkedList {
    constructor(){
        this.head = null;
        this.size = 0;
    }
    
    findIndexById(id){
        let current = this.head;
        let index = -1;

        if(!this.head){
            return -1;
        }else{
            while (current){
                index++;
                if (current.id === id){
                    return index;
                }
                current = current.next;
            }
        }
        return -1;
    }


    // Insert first node
    insertFirst(id) {
        this.head = new Node(id, this.head);
        this.size++;
    }

    // Insert last node
    insertLast(id){
        let node = new Node(id);
        let current;

        //If empty, make head
        if(!this.head){
            this.head = node;
        }else{
            current = this.head;

            while(current.next){
                current = current.next;
            }
            current.next = node;
        }
        this.size++;
    }
    // Insert at index
    insertAt(id, index){
      // If index is out of range
      if(index > 0 && index > this.size){
        return;
      }

      if(index === 0){
        this.insertFirst(id);
        return;
      }

      const node = new Node(id);
      let current, previous;

      // Set current to first
      current = this.head;
      let count = 0;

      while(count < index){
        previous = current; //Node before index
        count ++;
        current = current.next; //Node after index
      }

      node.next = current;
      previous.next = node;

      this.size++;
    }

    // Get at index
    getAt(index){
        let current = this.head;
        let count = 0;

        while(current){
            if (count == index){
                return current.id;
            }
            count++;
            current = current.next;
        }
    }

    // Remove at index
    removeAt(index){
        if(index > 0 && index > this.size){
            return;
        }
        let current = this.head;
        let previous;
        let count = 0;

        //Remove first
        if(index===0){
            this.head = current.next;
        }else{
            while(count < index){
                count ++;
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
        }
        this.size--;
    }
    // Print list data
    print(){
        let answer = "|---";
        let current = this.head;


        while(current){
            let time = findTime(current.id);
            answer += `[${current.id}, ${time}sec]---`;
            current = current.next;
        }
        answer += "[end]";
        console.log(answer);
    }
}


// -----LinkedLIst 자료구조 구현 끝------//


const ll = new LinkedList();

//아이디 값을 통해 영상길이를 return하는 함수
function findTime(id){
    for (let i=0; i<videos.length; i++){
        if (videos[i].id === id){
            return videos[i].time;
        }
    }
}

//입력, 삭제할 id가 arr에 있는지 체크하는 함수
function checkIdExist(id){
    for (let i=0; i<videos.length; i++){
        if (videos[i].id ===id){
            return true;
        }
    }
    console.log("존재하지 않는 id입니다.")
    return false;
}


function solution(command){
    let id = command[1];
    //맨뒤에 영상 추가 (존재하는 id만)
    if (command[0]==="add" && checkIdExist(id)){
        ll.insertLast(id);
        ll.print();
    }else if(command[0]==="delete" && checkIdExist(id)){
        if (ll.findIndexById(id) != -1){
            ll.removeAt(ll.findIndexById(id));
            ll.print();
        }else{
            console.log("리스트에 존재하지 않는 id입니다.")
        }
    }else if(command[0]==="insert" && checkIdExist(id)){
        let index = parseInt(command[2]);
        if (index < 0){
            console.log("올바른 index값이 아닙니다")
        }else if(index>= ll.size){
            ll.insertLast(id);
            ll.print();
        }else{
            ll.insertAt(id, index);
            ll.print();
        }
    }else if(command[0]==="render"){
        console.log("영상클립: "+ ll.size + "개");
        let timeLength = 0;
        for (let i=0; i<ll.size; i++){
            timeLength += findTime(ll.getAt(i));
        }
        console.log("전체길이: "+ timeLength + "sec");
    }
}



//명령어 길이, 형식이 올바른지 체크
function checkInput(command){
    const first = command[0];
    const reg = /^(\s|\d)+$/;
    if (first==="add" || first==="delete"){
        if (command.length !== 2){
            return false;
        }
    }else if(first==="insert"){
        if (command.length !== 3 || !reg.test(command[2])){
            return false;
        }
    }else if(first==="render"){
        if (command.length !== 1){
            return false;
        }
    }else{
        return false;
    }
    return true;
}


function input(){
    const readline = require("readline");
    const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
    });

    rl.on("line", function(line) {
        let command = line.split(' ');
        if (checkInput(command)){
            solution(command);
        }else{
            console.log("명령어를 다시 확인해주세요.");
        }
    });
}

input();