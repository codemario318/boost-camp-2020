const keyboard = [["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
["A", "S", "D", "F", "G", "H", "J", "K", "L", ";"],
["Z", "X", "C", "V", "B", "N", "M", ",", ".", "?"]];

// 프리티어!
function ImplementKeyboard(keyboard, word) {
    let previousChar = "1"; let curRow = 0; let curColumn = 0;

    for (let curIndex = 0; curIndex < word.length; curIndex++) {

        let Position;

        if (compareTwoCharacter(previousChar, word[curIndex])) continue;

        if ((Position = searchPosition(word[curIndex], keyboard)) === false) {
            printError();
            return;
        }
        
        curRow = moveRowPosition(curRow, Position[0]);
        curColumn = moveColumnPosition(curColumn, Position[1]);

        previousChar = word[curIndex];    
    }
}

//두 문자를 비교
function compareTwoCharacter(curWord, preWord) {
    if (curWord === preWord) {
        printMoving("@");
        return true;
    }

    return false;
}

//키보드에서의 위치를 찾는다
function searchPosition(searchingCharacter, keyboard) {
    for (let i = 0; i < keyboard.length; i++) {
        for (let j = 0; j < keyboard[i].length; j++) {

            if (keyboard[i][j] == searchingCharacter)  return [i,j];
        }
    }
    return false;
}

//에러 메시지를 출력
function printError(){
    console.log("\nWrong Character!");
}

//행의 위치를 움직인다.
function moveRowPosition(curRow, changedRow){
    while (changedRow < curRow) {
        printMoving("^");
        curRow--;
    }

    while (changedRow > curRow) {
        printMoving("_")
        curRow++;
    }
    return changedRow;
}

//열의 위치를 움직인다.
function moveColumnPosition(curColumn, changedColumn){
    while (changedColumn < curColumn) {
       printMoving("<");
        curColumn--;
    }

    while (changedColumn > curColumn) {
       printMoving(">");
        curColumn++;
    }
    printMoving("@");
    return changedColumn;
}


//움직임을 출력
function printMoving(moving) {
    process.stdout.write(moving);
}

ImplementKeyboard(keyboard, "ABCDE");