const { AMERICANO, LATTE, FRAPPUCCINO, FINISH } = require("./utils");
const { EventEmitter } = require("events");

class DashBoard extends EventEmitter {

  constructor() {
    super();
    this.board = {};
    this.exitTimer = null;
    this.on("update", finishedBeverageInfo => {
      this.update(finishedBeverageInfo);
    });
  }

  /* 대시보드에 주문 추가 */
  addOrder(order) {
    const { customerName, list } = order;
    let target = this.board[customerName];
    if (target) {
      this.board[customerName] = target.concat(list);
      return;
    }
    this.board[customerName] = list;
  }

  /* 대시보드 업데이트 */
  update(finishedBeverageInfo) {
    const { customerName, item: { name, state } } = finishedBeverageInfo;
    let target = this.board[customerName].find(item => item.name === name);
    target.state = state;
    this.checkFinished();
  }

  checkFinished() {
    /* every로 체크하면 중간에 false 떴을 때 뒤에까지 확인안함
      => 나중에 주문한 고객이 먼저 완성되어도, 먼저 주문한 고객에게 먼저 제공하기 위함*/
    const allClear = Object.keys(this.board).every(customerName => {
      const list = this.board[customerName];
      let americano = 0;
      let latte = 0;
      let frappuccino = 0;
      const finished = list.every(item => {
        const { name, state } = item;
        if (name === AMERICANO) americano++;
        else if (name === LATTE) latte++;
        else if (name === FRAPPUCCINO) frappuccino++;

        return state === FINISH;
      });
      if (finished) {
        console.log("=".repeat(60));
        process.stdout.write(`고객 ${customerName} :: `)
        americano && process.stdout.write(` 아메리카노 ${americano}잔`);
        latte && process.stdout.write(` 카페라떼 ${latte}잔`);
        frappuccino && process.stdout.write(` 프라푸치노 ${frappuccino}잔`);
        console.log(' 주문 완성');
        console.log("=".repeat(60));

        delete this.board[customerName];
      }

      return finished;
    });
    if (allClear) {
      console.log("모든 메뉴가 완성되었습니다.");
      this.exitAfterTimeout();
    }
  }

  /* 주문 없으면 3초뒤 종료 */
  exitAfterTimeout() {
    console.log("3초 이내에 주문이 없으면 종료됩니다.");
    this.exitTimer = setTimeout(() => {
      process.exit(0);
    }, 3000);
  }
}

module.exports = DashBoard;