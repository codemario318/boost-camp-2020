var VideoData = require('./VideoData.js');
var LinkedList = require('./LinkedList.js');

const maxPlayingTime = 16;
const minPlayingTime = 1;

let videoClip = [];
let videoList = new LinkedList(videoClip);

function getRandomPlayingTime(){
    return Math.floor(Math.random() * (maxPlayingTime - minPlayingTime)) + minPlayingTime;
}

function init() {
    for (let i = 1; i <= 13; i++){
        videoClip.push(new VideoData(i, '제목 '+i, getRandomPlayingTime(), null));
    }
    console.log('---영상클립---');
    for (let video of videoClip)
        console.log(`${video.title}(${video.id}):${video.playingTime}`);
}


function main() {
    init();
    const readline = require('readline');

    const r = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    r.setPrompt('> ');
    r.on('line', function(line){
        if (line == 'exit')
            r.close();
        let splitString = line.split(' ');
    
        if (splitString[0] === 'add')           videoList.add(Number(splitString[1]));
        else if(splitString[0] === 'delete')    videoList.delete(Number(splitString[1]));
        else if (splitString[0] === 'insert')   videoList.insert(Number(splitString[1]), Number(splitString[2]));
        else if (splitString[0] === 'render')   videoList.showVideoListInformation();

        if(splitString[0] !== 'render') videoList.print();
        r.prompt();
    });

    r.on('close', function(){
        process.exit();
    });
}

main();