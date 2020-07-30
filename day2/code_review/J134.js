function dist_(sx, sy, ex, ey){
    return (Math.abs(sx - ex) + Math.abs(sy - ey));
}

function setPos_(p, i, j, d){
    if(p.d == -1 || p.d > d){
        p.x = i; p.y = j; p.d = d;
    }
}

function find_(keyboard, sx, sy, target){
    let p = { x: -1, y: -1, d: -1 };
    for(let i = 0; i < keyboard.length; i++){
        for(let j = 0; j < keyboard[i].length; j++){
            if(keyboard[i][j] != target)continue;
            let d = dist_(sx,sy,i,j);
            setPos_(p,i,j,d);
        }
    }
    return [p.x,p.y];
}

function mov_ud_(sx, ex){
    let ans = "";
    while(sx < ex){
        ans += '_';
        sx +=1;
    }
    while(sx > ex){
        ans += '^';
        sx -= 1;
    }
    return ans;
}

function mov_lr_(sy, ey){
    let ans = "";
    while(sy < ey){
        ans += '>';
        sy +=1;
    }
    while(sy > ey){
        ans += '<';
        sy -= 1;
    }
    ans += '@';
    return ans;
}

function sol_(keyboard, words){
    let pos = {x: 0, y: 0};
    let answer = "";
    for(let word of words){
        let target = find_(keyboard, pos.x, pos.y, word);
        if(target[0] == -1){
            answer += 'X';
        }else{
            answer += mov_ud_(pos.x, target[0]);
            answer += mov_lr_(pos.y, target[1]);
            pos.x = target[0]; pos.y = target[1];
        }
    }
    return answer;
}
function input(){
    const keyboard = [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
                ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
                ["A", "S", "D", "F", "G", "H", "J", "K", "L", ";"],
                ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "?"]];
    let words = ["BOOST", "HELLO,CAMPER5;", "FROM.1984"];
    for(let word of words){
        console.log(word);
        console.log(sol_(keyboard,word));
    }
}
input();