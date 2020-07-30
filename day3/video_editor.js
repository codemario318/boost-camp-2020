class VideoEditor {
    constructor(data = {}) {
        this.clip = require('./video_clip')
        this.files = data
    }

    readCmd(cmd) {
        if (cmd[0] === 'add' && cmd.length === 2) {
            this.clipAdd(cmd[1]);
        } else if (cmd[0] === 'insert' && cmd.length === 3) {
            this.clipInsert(cmd[1], cmd[2]);
        } else if (cmd[0] === 'delete' && cmd.length === 2) {
            this.clipDelete(cmd[1]);
        } else if (cmd[0] === 'render') {
            this.clipRender();
        } else {
            console.error('잘못된 입력');
        }
        console.log(this.clip.display());
    }

    clipAdd(id) {
        if (this._dataCheck(id)) console.error("존재하지 않는 데이터");
        else {
            const video = this.files[id];
            this.clip.add(video);
        }
    }

    clipInsert(id, pos) {
        if (this._dataCheck(id)) console.error("존재하지 않는 데이터");
        else {
            const video = this.files[id];
            this.clip.insert(video, pos);
        }
    }

    clipDelete(id) {
        if (this._dataCheck(id)) console.error("존재하지 않는 데이터");
        else {
            const video = this.files[id];
            this.clip.delete(video);
        }
    }

    clipRender() {
        console.log(this.clip.render());
    }

    _dataCheck(id) {
        return !this.files.hasOwnProperty(id);
    }
}

module.exports = new VideoEditor();