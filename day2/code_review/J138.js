function find(keyboard, ch) {                           // keyboard 위에 ch 문자를 찾아 x, y 좌표를 업데이트
    for(var i = 0; i < keyboard.length; i++) {
        for(var j = 0; j < keyboard[0].length; j++) {
            if(ch == keyboard[i][j]) {
                x = i;
                y = j;
                return check = true;
            }
        }
    }
    return check = false;                               // 존재하지 않는 경우에 종료를 하기 위한 check 변수 변경
}

function up() {
    for(var i = 0; i < cur_x - x; i++) {
            answer = answer + '^';
    }
}

function down() {
    for(var i = 0; i < x - cur_x; i++) {
            answer = answer + '_';
    }
}

function left() {
    for(var i = 0; i < cur_y - y; i++) {
            answer = answer + '<';
    }
}

function right() {
    for(var i = 0; i < y - cur_y; i++) {
            answer = answer + '>';
    }
}

function UpDownCheck() {                // keyboard에서 문자가 위인지 아래인지 확인
    if(cur_x > x) {
        up();
    }

    else if(cur_x < x) {
        down();
    }

    cur_x = x;
}

function RightLeftCheck() {             // keyboard에서 문자가 오른쪽인지 왼쪽인지 확인
    if(cur_y > y) {
        left();
    }

    else if(cur_y < y) {
        right();
    }

    cur_y = y;
}

function solution(keyboard, input) {
    for(var i = 0; i < input.length; i++) {
        find(keyboard, input.charAt(i));            // input 값의 index 순서대로 keyboard위에 문자가 존재하는지 확인
        if(check == true) {                         // 존재하는 경우
            UpDownCheck();
            RightLeftCheck();
            answer = answer + '@';
        }
        else                                        // 존재하지 않는 경우
            return;
    }
}

function print() {
    console.log("input : " + input);

    if(check ==  true) {                            // input값의 모든 문자가 keyboard에 존재하는 경우
        console.log(answer);
    }
    else {                                          // input값의 문자 중 하나라도 keyboard에 존재하는 않는 경우
        console.log("input value is not correct");
    }
}

const keyboard = [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
["A", "S", "D", "F", "G", "H", "J", "K", "L", ";"],
["Z", "X", "C", "V", "B", "N", "M", ",", ".", "?"]];

const input = "BOOS T";
let x, y;
let cur_x = 0;
let cur_y = 0;
let check = true;
let answer = "";

solution(keyboard, input);
print();