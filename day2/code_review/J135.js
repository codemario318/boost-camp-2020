const UP_CHAR = '^';
const DOWN_CHAR = '_';
const LEFT_CHAR = '<';
const RIGHT_CHAR = '>';
const SELECT_CHAR = '@';
const START_POS = [0, 0];

const keyboard = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '?'],
];

// 키보드의 위치정보를 객체로 만든다
const getKeyboardPosition = (keyboard) => {
  const position = {};
  keyboard.forEach((row, rowIndex) => {
    row.forEach((char, colIndex) => {
      const character = char.toLocaleUpperCase();
      position[character] = [rowIndex, colIndex];
    });
  });
  return position;
};

// 왼쪽으로 갈 지, 오른쪽으로 갈 지를 계산한다
const getLeftRrightOutput = (rowDiff, toDown) => {
  let output = '';
  for (let i = 0; i < Math.abs(rowDiff); i++) {
    output += toDown ? DOWN_CHAR : UP_CHAR;
  }
  return output;
};

// 위로 갈 지, 밑으로 갈 지를 계산한다
const getUpDownOutput = (colDiff, toRight) => {
  let output = '';
  for (let i = 0; i < Math.abs(colDiff); i++) {
    output += toRight ? RIGHT_CHAR : LEFT_CHAR;
  }
  return output;
};

// 다음 문자의 출력값을 구한다
const getOutputOfNextCharacter = ([currentRow, currentCol], [nextRow, nextCol]) => {
  let output = '';
  const rowDiff = currentRow - nextRow;
  const colDiff = currentCol - nextCol;
  const toDown = rowDiff < 0;
  const toRight = colDiff < 0;
  // 출력값을 얻기 위해서는 먼저 위-아래 로 계산하고 좌-우 로 계산해야 한다
  output += getLeftRrightOutput(rowDiff, toDown);
  output += getUpDownOutput(colDiff, toRight);
  return output + SELECT_CHAR;
};

// 입력 문자열을 검증한다
const validateInput = (inputString) => {
  if (typeof inputString !== 'string') {
    throw new Error('문자열을 입력해주세요.');
  }
};

// 문자가 키보드에 존재하는지 검사한다
const validateCharacter = (position, character) => {
  if (!position.hasOwnProperty(character)) {
    throw new Error(`"${character}"는 키보드에 없습니다.`);
  }
};

// 입력한 문자열에 대한 출력값을 구한다
const getOutputString = (position, inputString) => {
  let currentPosition = START_POS; // 시작 지점
  return inputString.split('').reduce((acc, cur) => {
    const character = cur.toLocaleUpperCase();
    validateCharacter(position, character);
    const nextPosition = position[character];
    acc += getOutputOfNextCharacter(currentPosition, nextPosition);
    currentPosition = nextPosition;
    return acc;
  }, '');
};

const solution = (keyboard, inputString) => {
  try {
    validateInput(inputString);
    const position = getKeyboardPosition(keyboard);
    const output = getOutputString(position, inputString);
    console.log(output);
  } catch (error) {
    console.error(error);
  }
};

solution(keyboard, 'boost');
solution(keyboard, 'HELLO,CAMPER5;');
solution(keyboard, 'FROM.1984');