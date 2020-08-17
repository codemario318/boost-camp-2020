const EventEmitter = require('events');
const manager = require('./Manager');

class Barista extends EventEmitter {
    constructor(name, multiNum) {
        super();
        this.name = name;
        this.maxJob = multiNum;
        this.jobs = [];
    }

    isBusy() {
        return this.maxJob === this.jobs.length;
    }

    isFree() {
        return this.jobs.length === 0;
    }

    getExtra() {
        return this.maxJob - this.jobs.length;
    }

    takeOrder(barista, order) {
        barista.jobs.push(order);
        if (barista.jobs.length === 1) barista.timer = setInterval(this.work, 1000, barista);
    }

    work(barista) {
        barista.jobs.forEach(v => v.process());
        barista.jobs.filter(v => v.remainTime === 0).forEach(order => {
            console.log(`${order.stringify()} 완성`);
            order.state = 'finish';
            manager.emit('finish_order', order);
        });
        barista.jobs = barista.jobs.filter(v => v.state !== 'finish');
        if (barista.jobs.length === 0) clearInterval(barista.timer);
    }
}

function makeBarista(num) {
    const barista = new Barista(num);
    barista.on('take_order', function (barista, order) {
        this.takeOrder(barista, order);
    });
    return barista;
}

module.exports = makeBarista;
