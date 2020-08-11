class File {
    constructor(name) {
        this.name = name;
        this.lastTime = this._getFileDateTime();
        this.state = 'Untracked';
    }

    update = () => {
        if (this.state === 'Unmodified') this.state = 'Modified';
        this.lastTime = this._getFileDateTime();
    }

    add = () => {
        this.state = 'Staged';
        this.lastTime = this._getFileDateTime();
    }

    commit = () => {
        this.state = 'Unmodified';
        this.lastTime = this._getFileDateTime();
    }

    getInfo = () => `${this.name} ${this.lastTime} ${this.state}`;

    _getFileDateTime = () => {
        const format = this._timeFormat;
        const now = new Date();

        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const sec = now.getSeconds();

        return `${year}-${format(month)}-${format(day)} ${format(hour)}:${format(minute)}:${format(sec)}`;
    }

    _timeFormat = (time) => (time > 9) ? time : `0${time}`
}

module.exports = File;
