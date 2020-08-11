const { CPU, PCB, getRandArr } = require('./Process');

class ThreadPCB extends PCB {
    constructor(id, job) {
        super(id, job);
        this.threadNum = (job === 1) ? 1 : parseInt(job / 2);
    }
}

class ThreadCPU extends CPU {
    disPatcher() {
        const pos = this.jobPointer;
        const process = this.watingQueue[pos];
        const work = process.context + (process.threadNum) * 2;

        process.state = 'Running';
        process.context = (process.job > work) ? work : process.job;
    }
}

if (require.main === module) {
    const cpu = new ThreadCPU();
    const ids = ['A', 'B', 'C'];
    // const jobs = [3, 5, 7];
    const jobs = getRandArr(3);
    const pcbs = jobs.map((v, i) => new ThreadPCB(ids[i], v));

    pcbs.forEach(pcb => console.log(`${pcb.id}(${pcb.job}sec): ${pcb.threadNum}`))
    console.log();
    
    cpu.wakeUp(pcbs);
    cpu.simulate();
}
