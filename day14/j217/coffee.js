module.exports = class Coffee {
    constructor(number) {
        switch(number) {
            case 1:
                this.name = "아메리카노"
                this.costTime = 3;
                break;
            case 2:
                this.name = "카페라떼"
                this.costTime = 5;
                break;
            case 3:
                this.name = "프라프치노"
                this.costTime = 10;
                break;
        }
        this.totalTime = 0;
        this.state = "대기중"
    }

    printState() {
        if (this.costTime === this.totalTime)
            console.log(`${this.name} 완성`)
        else if (this.totalTime === 0)
            console.log(`${this.name} 시작`);        
    }
}
