const { videoFile } = require("./video_file");
const video_file = require("./video_file");

class VideoClip {
    constructor() {
        this.front = undefined;
        this.rear = this.front;
        this.length = 0;
        this.totalTime = 0;
    }

    add(video) {
        if (this.isOverlab(video.id)) {
            console.error("이미 사용한 영상입니다.");
            return;
        }
        if (this.rear) {
            this.rear.nextVideo = video;
            this.rear = video;
        } else {
            this.front = video;
            this.rear = video;
        }
        this.length++;
        this.totalTime += video.time;
    }

    insert(video, pos) {
        if (this.isOverlab(video.id)) {
            console.error("이미 사용한 영상입니다.");
            return;
        }
        if (this.length <= pos) {
            this.add(video);
            return;
        }
        else if (pos == 0) {
            video.nextVideo = this.front;
            this.front = video;
        } else {
            let prevVideo = this._findPrevVideoToPos(pos);
            video.nextVideo = prevVideo.nextVideo;
            prevVideo.nextVideo = video;
        }
        this.length++;
        this.totalTime += video.time;
    }

    isOverlab(id) {
        let video = this.front;

        while (video) {
            if (video.id === id) {
                return true;
            }
            video = video.nextVideo;
        }
        return false;
    }

    _findPrevVideoToPos(pos) {
        let video = this.front;

        while (pos > 1) {
            video = video.nextVideo;
            pos--;
        }

        return video
    }

    delete(video) {
        if (!this.isOverlab(video.id)) {
            console.error("사용하지 않은 영상입니다.");
            return;
        }
        if (this.length === 1) {
            this.front = undefined;
            this.rear = undefined;
        }
        else if (video.id === this.front.id) {
            this.front = this.front.nextVideo;
        }
        else {
            const prevVideo = this._findPrevVideoToId(video);
            prevVideo.nextVideo = video.nextVideo;
            if (this.rear.id === video.id) this.rear = prevVideo;
        }
        this.length--;
        this.totalTime -= video.time;
        video.nextVideo = undefined;
    }

    _findPrevVideoToId(video) {
        const id = video.id;
        let videoTemp = this.front;
        let nextVideo = videoTemp.nextVideo;

        while (nextVideo) {
            if (nextVideo.id === id) break;
            videoTemp = nextVideo;
            nextVideo = videoTemp.nextVideo;
        }
        return videoTemp;
    }

    render() {
        return `영상클립: ${this.length}개\n전체길이: ${this.totalTime}sec`;
    }

    display() {
        return `|${this._makeDisplay(this.front)}`
    }

    _makeDisplay(video) {
        return (video) ? `---[${video.id}, ${video.time}sec]${this._makeDisplay(video.nextVideo)}` : `---[end]`;
    }
}

module.exports = new VideoClip();

// const {getTestData} = require("./video_file");
// const data = getTestData(10,1,15);
// const clip = new VideoClip();

// clip.add(data[1]);
// console.log(clip.display());
// console.log(clip.front);
// console.log(clip.rear);
// clip.add(data[2]);
// console.log(clip.display());
// console.log(clip.front);
// console.log(clip.rear);
// clip.add(data[3]);
// console.log(clip.display());
// console.log(clip.front);
// console.log(clip.rear);
// clip.add(data[4]);
// console.log(clip.display());
// console.log(clip.front);
// console.log(clip.rear);
// clip.delete(data[4]);
// console.log(clip.front);
// console.log(clip.rear);
// console.log(clip.display());
// clip.delete(data[2]);
// console.log(clip.front);
// console.log(clip.rear);
// console.log(clip.display());
// clip.delete(data[1]);
// console.log(clip.front);
// console.log(clip.rear);
// console.log(clip.display());
// console.log(clip.render());