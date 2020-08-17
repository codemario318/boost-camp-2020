const EventEmitter = require('events');
const manager = require('./Manager');

class Barista extends EventEmitter {
    constructor(manager, name) {
        super();
        this.name = name;
        this.manager = manager;

        this.on('take_order', (_, name, order) => {
            this.manager.emit('start_order', this, name, order);
            setTimeout(() => {
                this.manager.emit('finish_order', this, name, order);
            }, order.remainTime * 1000)
        });
    }
}
module.exports = Barista;
