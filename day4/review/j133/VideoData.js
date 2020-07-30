module.exports = class VideoData {
    constructor(id, title, playingTime, next) {
        this.id = id;
        this.title = title;
        this.playingTime = playingTime;
        this.next = next;
    }
}