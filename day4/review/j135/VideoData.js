function VideoData(id, title, playTime) {
    this.id = id;
    this.title = title;
    this.playTime = playTime;
    this.next = undefined;
  }
  
  module.exports = VideoData;