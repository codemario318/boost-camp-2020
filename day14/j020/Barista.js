const { LATTE, AMERICANO, FRAPPUCCINO, MAKING, FINISH } = require("./utils");
const { EventEmitter } = require("events");

class Barista extends EventEmitter {
  makingCount = 0;
  makingQueue = [];
  isMaking = false;

  constructor(manager, name) {
    super();
    this.manager = manager;
    this.name = name;
    this.on("order", order => {
      this.addOrder(order);
    });
  }


  /* 바리스타의 제작할 음료 리스트에 추가 */
  addOrder(order) {
    this.makingQueue.push(order);
    this.makingCount++;
    if (!this.isMaking) {
      this.make();
    }
  }

  /* 음료 제작 */
  make() {

    let { customerName, item: { name, state } } = this.makingQueue[0];

    /* 음료에 따른 제작 시간 설정 */
    let timeMs = 0;
    switch (name) {
      case AMERICANO:
        timeMs = 3000;
        break;
      case LATTE:
        timeMs = 5000;
        break;
      case FRAPPUCCINO:
        timeMs = 10000;
        break;
      default:
        console.error(name)
        throw new Error(`해당하는 음료수는 없습니다.`);
    }

    /* 음료수 이름 */
    const beverage = name === AMERICANO ? "아메리카노" : name === LATTE ? "카페 라떼" : "프라푸치노";
    console.log(`${this.name} - ${customerName}${beverage} 시작`);

    this.isMaking = true;
    this.makingQueue[0].item.state = MAKING; // 음료 상태 변경 : MAKING

    setTimeout(() => {
      this.makingQueue[0].item.state = FINISH; // 음료 상태 변경 : finish
      this.makingCount--;
      const finishedBeverageInfo = this.makingQueue.shift(); // 완성된 음료
      console.log(`${this.name} - ${finishedBeverageInfo.customerName}${beverage} 완성`);

      /* manager 한테 finish emit :: 완성된 음료 정보 전송 */
      this.manager.emit("finish", finishedBeverageInfo);

      /* 더 만들게 있다면 다시 호출 */
      if (this.makingQueue.length) {
        this.make();
      } else {
        this.isMaking = false;
      }
    }, timeMs);
  }
}

module.exports = Barista;