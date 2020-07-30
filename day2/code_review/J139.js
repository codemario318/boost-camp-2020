const keyboard = [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
["A", "S", "D", "F", "G", "H", "J", "K", "L", ";"],
["Z", "X", "C", "V", "B", "N", "M", ",", ".", "?"]];
const word = "BOOST";
// const word = "HELLO,CAMPER5;";
// const word = "FROM.1984";
// const word = "QQ";
// const word = "";
// const word = "123123111;L";
// const word = "*_*";

const set = new Set();
const dx = [0];
const dy = [0];

let answer = "";

//최종결과값을 출력하는 함수
function printResult(){
    console.log("입력값 :", word);
    console.log("출력값 : ", answer);
}

//gapX만큼 왼쪽 혹은 오른쪽으로 이동시키는 함수
function left_right(gapX){
    if (gapX>0){
        answer += ">".repeat(gapX);
    }else{
        answer += "<".repeat(gapX*-1);
    }
}

//gapY만큼 아래 혹은 위로 이동시키는 함수
function up_down(gapY){
    if (gapY>0){
        answer += "_".repeat(gapY);
    }else{
        answer += "^".repeat(gapY*-1);
    }
}

//좌표값 비교를 통해 이동해야하는 값을 구한뒤(gapX, gapY) 이동시키는 함수
function solution(){
    for (let i=0; i<dx.length-1; i++){
        let gapX = dx[i+1] - dx[i];
        let gapY = dy[i+1] - dy[i];
        if (gapX!=0 || gapY!=0){
            up_down(gapY);
            left_right(gapX);
        }
        answer += "@";
    }
    printResult();
}

//word의 단어와 일치하는 키보드의 col, row값을 배열에 저장하는 함수
function saveColRow(keyboard,j,k,a){
    if (keyboard[j][k]===a){
        dx.push(k);
        dy.push(j);
    }
}

//word의 단어와 비교할 키보드의 col,row를 지정하는 함수
function checkColRow(keyboard, a){
    for (let j=0; j<keyboard.length; j++){
        for (let k=0; k<keyboard[j].length; k++){
            saveColRow(keyboard,j,k,a);
        }
    }
}

//word 각 단어의 위치를 저장하는 함수
function countLoc(keyboard, word){
    for (let i=0; i<word.length; i++){
        let a = word[i];
        checkColRow(keyboard, a);
    }
    solution();
}

//set에 키보드 단어들을 입력시키는 함수
function addSet(keyboard){
    for (let i=0; i<keyboard.length; i++){
        for (let j=0; j<keyboard[0].length; j++){
           set.add(keyboard[i][j]);
        }
    }
}

//키보드에 존재하지 않는 단어인지 확인하는 함수
function checkWord(keyboard, word){
    addSet(keyboard);
    for (let i=0; i<word.length; i++){
        if (!set.has(word[i])) {
            console.log("입력값 :", word);
            console.log("키보드에 존재하지 않는 단어를 입력하셨습니다.");
            return false;
        }
    }
    return true;
}

//키보드의 행의 길이가 동일한지 확인하는 함수
function checkKeyboard(keyboard){
    const row = keyboard[0].length;
    for (let i=1; i<keyboard.length; i++){
        if (keyboard[i].length !== row) return false;
    }
    return true;
}

//키보드가 조건에 맞는 경우 함수 시작
function init(keyboard){
    if (checkKeyboard(keyboard)===true){
        if (checkWord(keyboard, word) === true){
            countLoc(keyboard, word);
        }
    }else{
        console.log("입력한 키보드의 행 길이가 동일하지 않습니다.");
    }
}

init(keyboard);