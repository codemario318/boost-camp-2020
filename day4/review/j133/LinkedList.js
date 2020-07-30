var VideoData = require('./VideoData.js');
const symbolStr = {
    "START":"|",
    "END":"---[end]\n",
    "LINE":"---"
}
module.exports = class LinkedList{
    constructor(videoClip){
        this.head = null;
        this.tail = null;
        this.videoClip = videoClip;
        this.clipCount = 0;
        this.totalPlayingTime = 0;
    }

    increaseClipCount(){
        this.clipCount++;
    }
    increaseTotalPlayingTime(playingTime){
        this.totalPlayingTime+=playingTime;
    }

    decreaseClipCount(){
        this.clipCount--;
    }

    decreaseTotalPlayingTime(playingTime){
        this.totalPlayingTime-=playingTime;
    }
    
    showVideoListInformation(){
        console.log(`영상클립: ${this.clipCount}`);
        console.log(`전체 길이: ${this.totalPlayingTime}sec`);
    }


    add(videoID){
        let video = this.hasVideoClip(videoID);
        if (video === null) return;
        if (this.clipCount === 0) this.head = this.tail = video;
        else {
            this.tail.next = video;
            this.tail = video;
        }
        this.increaseClipCount();
        this.increaseTotalPlayingTime(video.playingTime);
    }

    
    hasVideoClip(videoID){
    for (let clip of this.videoClip){
        if(clip.id === videoID) {
            return new VideoData(clip.id, clip.title, clip.playingTime, null);
        }
    }
    return null;
}

    insert(videoID, order){
    
        let curData = this.head;
        if (order < 0)  return;
        if ((order > this.clipCount) || (this.clipCount === 0)){
            this.add(videoID);
            return;
        } 

        let video = this.hasVideoClip(videoID);
        if (video == null)  return;
        if (order === 0) {
            video.next = this.head;
            this.head = video;
        }else{
            while (--order){
                curData = curData.next;
            }
            video.next = curData.next;
            curData.next = video;

            if (video.next === null)    this.tail  = video;
        }
        this.increaseClipCount();
        this.increaseTotalPlayingTime(video.playingTime);
    }

    delete(videoID){
        let curData = this.head;
        if(this.head.id === videoID){
            this.decreaseTotalPlayingTime(this.head.playingTime)
            this.decreaseClipCount();
            this.head = this.head.next;    
            return;
        }

        while((curData.next !== null) && (curData.next.id !== videoID) ){
            curData = curData.next;
        }

        if (curData.next !== null){
            this.decreaseTotalPlayingTime(curData.next.playingTime);
            this.decreaseClipCount();
            if (curData.next.next === null) {
                this.tail = curData;
                curData.next = null;
            }
            else curData.next = curData.next.next;
        }   
    }

    print(){
        let curData = this.head;
        process.stdout.write(symbolStr.START);
        while(curData != null){
            process.stdout.write(symbolStr.LINE);
            process.stdout.write(`[${curData.id}, ${curData.playingTime} sec]`);
            curData = curData.next;
        }
        process.stdout.write(symbolStr.END);
    }
}