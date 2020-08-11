class PCB {
    constructor(id, job) {
        this.id = id
        this.job = job;
        this.state = 'Ready';
        this.context = 0;
    }
}

class CPU {
    constructor() {
        this.watingQueue = [];
        this.jobPointer = 0;
    }

    wakeUp(pcbs) {
        this.watingQueue = [...pcbs].map(pcb => {
            pcb.state = 'Wating';
            return pcb
        });
    }

    disPatcher() {
        const pos = this.jobPointer;
        const process = this.watingQueue[pos];

        process.state = 'Running';
        process.context++;
    }

    timeOut() {
        const cur = this.watingQueue[this.jobPointer];
        cur.state = (cur.context === cur.job) ? 'Terminated' : 'Wating';
        this.jobPointer++;
    }

    scheduler(d = 0) {
        if (d === this.watingQueue.length) return this.jobPointer = null;

        const pos = (this.jobPointer === this.watingQueue.length) ? 0 : this.jobPointer;

        if (this._jobCheck(pos)) return this.jobPointer = pos;
        else {
            this.jobPointer = pos + 1;
            return this.scheduler(d + 1);
        }
    }

    _jobCheck(pos) {
        const cur = this.watingQueue[pos];
        return (cur.state === 'Wating' || cur.state === 'Ready') ? true : false;
    }

    print() {
        console.log(this.watingQueue.map(proc => `${proc.id}(${proc.state}), ${proc.context} / ${proc.job}sec`).join('\n'));
    }

    simulate() {
        this.sim = setInterval(() => this.processing(), 1000);
    }

    processing() {
        this.scheduler();
        if (this.jobPointer === null) {
            this.finish();
            clearInterval(this.sim);
        } else {
            this.disPatcher();
            this.print();
            this.timeOut();
            console.log();
        }
    }

    finish() {
        this.print();
        console.log('모든 프로세스가 종료되었습니다.');
    }
}

const getRandArr = (n) => {
    const numSet = new Set();
    while (numSet.size < n) numSet.add(rand(10));
    return Array(...numSet.keys());
}

const rand = (max) => Math.floor(Math.random() * (max - 1)) + 1;

module.exports = {
    CPU,
    PCB,
    getRandArr
}

if (require.main === module) {
    const cpu = new CPU();
    const ids = ['A', 'B', 'C', 'D'];
    // const jobs = [3, 5, 7, 10];
    const jobs = getRandArr(4);
    console.log(jobs)
    const pcbs = jobs.map((v, i) => new PCB(ids[i], v));

    cpu.wakeUp(pcbs);
    cpu.simulate();
}
