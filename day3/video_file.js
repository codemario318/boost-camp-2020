class VideoFile {
    constructor(id, title, time, nextVideo = undefined) {
        this.id = id;
        this.title = title;
        this.time = time;
        this.nextVideo = nextVideo;
    }
}

function getTestData(videoNum, minSec, maxSec) {
    const videoFiles = {};

    for (let i = 1; i <= videoNum; i++) {
        const time = getRandomSec(minSec, maxSec),
            title = `제목${i}`;

        videoFile = new VideoFile(i, title, time);
        videoFiles[videoFile.id] = videoFile;

        console.log(`${videoFile.title}(${videoFile.id}):${videoFile.time}`);
    }
    return videoFiles;
}

function getRandomSec(min, max) {
    return Math.floor(Math.random() * (max - min) + 1) + min;
}
module.exports = {
    videoFile: new VideoFile(),
    getTestData
}
/*
console.log(getTestData(13,1,15));
*/