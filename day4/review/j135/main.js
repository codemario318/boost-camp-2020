const readline = require('readline');
const LinkedList = require('./LinkedList');
const { createVideoData, printVideoData } = require('./mission-01');

const DATA_NUM = 13;
const EXIT_CODE = 0;
const QUIT_COMMAND = 'q';
const PROMPT_MSG = {
  START: `명령어를 입력해주세요.(add, insert, delete, render) 프로그램을 종료하려면 "${QUIT_COMMAND}"를 입력해주세요`,
  END: '프로그램을 종료합니다.',
  CHAR: '\n> ',
};
const ERROR_MSG = {
  WRONG_ID: '올바른 id를 입력해주세요.',
  NO_DATA: '입력한 id와 일치하는 데이터가 없습니다.',
  WRONG_POSITION: '올바른 위치를 입력해주세요.',
  WRONG_COMMAND: (command) => `${command}는 잘못된 명령어입니다.`,
};

// id에 해당하는 영상 데이터를 찾아서 리턴한다. 만약 없으면 경고 메세지를 출력하고 false를 리턴한다
const getVideo = (videoDataCollection, id) => {
  const video = videoDataCollection.find((v) => v.id === id);
  if (!video) {
    console.warn(ERROR_MSG.NO_DATA);
    return false;
  }
  return video;
};

// id가 유효한 값인지 검사한다
const isValidId = (id) => {
  if (isNaN(id)) {
    console.warn(ERROR_MSG.WRONG_ID);
    return false;
  }
  return true;
};

// position이 유효한 값인지 검사한다
const isValidPosition = (position) => {
  if (isNaN(position)) {
    console.warn(ERROR_MSG.WRONG_POSITION);
    return false;
  }
  return true;
};

const handleAdd = (videoDataCollection, linkedlist, id) => {
  const video = getVideo(videoDataCollection, id);
  if (!isValidId(id) || !video) {
    return;
  }
  linkedlist.add({ ...video });
  linkedlist.print();
};

const handleInsert = (videoDataCollection, linkedlist, id, position) => {
  const video = getVideo(videoDataCollection, id);
  if (!isValidId(id) || !isValidPosition(position) || !video) {
    return;
  }
  linkedlist.insert({ ...video }, position);
  linkedlist.print();
};

const handleDelete = (videoDataCollection, linkedlist, id) => {
  const video = getVideo(videoDataCollection, id);
  if (!isValidId(id) || !video) {
    return;
  }
  linkedlist.delete(id);
  linkedlist.print();
};

// 프로그램을 끝낼 때까지 입력을 계속 받고 처리한다
const getCommands = (videoDataCollection, linkedlist, rl) => {
  rl.on('line', (input) => {
    let [command, id, position] = input.trim().split(' ');
    id = +id;
    position = +position;

    switch (command) {
      case 'add':
        handleAdd(videoDataCollection, linkedlist, id);
        break;
      case 'insert':
        handleInsert(videoDataCollection, linkedlist, id, position);
        break;
      case 'delete':
        handleDelete(videoDataCollection, linkedlist, id);
        break;
      case 'render':
        linkedlist.render();
        break;
      case QUIT_COMMAND:
        rl.close();
        break;
      default:
        console.warn(ERROR_MSG.WRONG_COMMAND(command));
    }
    rl.prompt();
  }).on('close', () => {
    console.log(PROMPT_MSG.END);
    process.exit(EXIT_CODE);
  });
};

// 링크드리스트 인스턴스, 영상 데이터 배열, readline인터페이스를 리턴
const init = () => {
  const linkedlist = new LinkedList();
  const videoDataCollection = createVideoData(DATA_NUM);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.setPrompt(PROMPT_MSG.CHAR);
  printVideoData(videoDataCollection);

  return [videoDataCollection, linkedlist, rl];
};

const main = () => {
  // 데이터 생성
  const [videoDataCollection, linkedlist, rl] = init();

  // 시작 메세지 출력
  console.log(PROMPT_MSG.START);
  rl.prompt();

  // 커맨드 입력
  getCommands(videoDataCollection, linkedlist, rl);
};

main();