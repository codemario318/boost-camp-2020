const VideoData = require('./VideoData');
const DATA_NUM = 13;
const MIN_PLAY_TIME = 1;
const MAX_PLAY_TIME = 15;
const TITLE_TEMPLATE = '제목';

// num개의 영상 데이터를 만들어 반환한다
const createVideoData = (num) => {
  const videoDataArray = [];

  for (let i = 1; i <= num; i++) {
    const vd = new VideoData(
      i + (+new Date() % 1000),
      TITLE_TEMPLATE + i,
      Math.floor(Math.random() * MAX_PLAY_TIME) + MIN_PLAY_TIME
    );
    videoDataArray.push(vd);
  }

  return videoDataArray;
};

// 영상 데이터를 배열 형태로 입력받아 영상 데이터들을 출력한다
const printVideoData = (array) => {
  console.log('---영상클립---');

  for (const video of array) {
    console.log(`${video.title}(${video.id}):${video.playTime}`);
  }
};

// printVideoData(createVideoData(DATA_NUM)); /* mission-01만 실행할 때는 주석 해제 */

module.exports = { createVideoData, printVideoData };