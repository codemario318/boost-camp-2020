const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const { AMERICANO, LATTE, FRAPPUCCINO, setNextCustomer, customerProps, WAITING, MAKING, FINISH } = require('./utils');
const Customer = require('./Customer');
const Cashier = require('./Cashier');
const Manager = require('./Manager');
const OrderQueue = require("./OrderQueue");
const Barista = require('./Barista');
const DashBoard = require('./DashBoard');

const customers = []; /* 고객 리스트*/
const baristas = []; /* 바리스타 리스트 :: */
const baristaCount = 4; /* mission 1에서는 바리스타 1명 */

const cashier = new Cashier(); /* 캐셔 */
const dashBoard = new DashBoard(); /* 현황판 */
const manager = new Manager(dashBoard); /* 매니저 */

for (let i = 0; i < baristaCount; i++) {
  const barista = new Barista(manager, `바리스타${i + 1}`);
  baristas.push(barista);
}

const orderQueue = new OrderQueue(dashBoard); /* 주문 대기표 */

/* 타이머 */
let watchTimer = null;
let printTimer = null;

/* 주문 대기 큐 출력 */
const printQueue = () => {
  let queueList = [];
  orderQueue.orders.map(order => {
    const { customerName, list } = order;
    const beverage = [];
    list.map(({ name, state }) => {
      if (state === WAITING) beverage.push(`${customerName}${name}`)
    })
    queueList = queueList.concat(beverage);
    return;
  })
  console.log(`주문 대기표 : /${queueList.join(",")}/`);
}

/* 주문 시작 : 매니져가 주문 내역을 1초마다 체크 */
const startWatching = () => {

  /* 주문 대기표 출력 3초 간격 */
  printTimer = setInterval(printQueue, 3000);

  /* 매니저가 주문 대기표를 1초마다 확인 */
  watchTimer = setInterval(() => {
    /* 주문 대기표를 확인 후 주문이 있고, 바리스타가 놀면 주문 전송 */

    while (manager.checkOrderQueue(orderQueue)) {
      const barista = baristas.find(({ makingCount, isMaking }) => {
        return makingCount < 2 && !isMaking;
      });
      if (!barista) {
        break; // 일할 수 있는 애가 없으면 braek
      }

      const finishedOrder = orderQueue.orders[0].list.every(item => item.state === FINISH);
      if (finishedOrder) { // 해당 주문 클리어한 경우
        orderQueue.orders.shift();
      }

      let waitingOrder = null;
      let customerName = null;

      for (let i = 0; i < orderQueue.orders.length; i++) {
        const order = orderQueue.orders[i];
        waitingOrder = order.list.find(item => item.state === WAITING);
        customerName = order.customerName;
        if (waitingOrder) break;
      }
      if (!waitingOrder || !customerName) {
        break;
      }

      /* 웨이팅 상태의 주문을 바리스타에게 전송 */
      manager.sendOrderToBarista(barista, { customerName, item: waitingOrder });
    }
  }, 1000);
}

/* 주문 전송 */
const startOrder = (customer) => {

  /* 주문이 들어오면, 주문 없을 때 3초 후 종료하는 카운트를 리셋함 */
  dashBoard.exitTimer && clearTimeout(dashBoard.exitTimer);

  /* 캐셔는 주문을 받으면 주문 대기표에 주문 정보(고객 정보, 음료 정보)를 추가 */
  cashier.sendOrderToQueue({ customerName: customer.name, list: customer.orders }, orderQueue);

  /* 매니저가 1초마다 주문 대기표 체크 */
  if (!watchTimer) startWatching();

  /* 주문 대기표 출력 */
  printQueue();
}

/* 입력 유효성 체크 */
const checkInput = (beverage, count) => {
  beverage = Number(beverage);
  count = Number(count);

  /* 입력 예외 처리 */
  if (Number.isNaN(beverage) || Number.isNaN(count) || !beverage || !count) {
    throw new Error("올바르지 않은 입력입니다.");
  }
  return [beverage, count];
}


/* 주문 처리 */
const handleOrder = (customer, beverage, count) => {
  switch (beverage) {
    case AMERICANO:
      customer.orderAmericano(count);
      break;

    case LATTE:
      customer.orderLatte(count);
      break;

    case FRAPPUCCINO:
      customer.orderFrappuccino(count);
      break;

    default:
      console.log("메뉴에 없는 음료수입니다.");
      break;
  }
}

console.log(`바리스타는 총 ${baristaCount}명 입니다.`);
rl.setPrompt(`> 메뉴  ||  1. 아메리카노(3s)  ||  2. 카페라떼(5s)  ||  3. 프라푸치노(10s)  ||
> 주문할 음료를 입력하세요. 예) 아메리카노 2개 => 1:2\n`);
rl.prompt();
rl.on("line", input => {

  try {

    let [name, ...args] = input.split(", ");

    /* 고객 생성 */
    const customer = new Customer();
    customers.push(customer);

    if (args.length) { // mission 2 입력 방식 => ex) A, 1:1, 2:1

      /* 고객 정보 설정 */
      customer.setName(name);
      let beverage, count;
      for (let i = 0; i < args.length; i++) {
        [beverage, count] = args[i].split(":");

        /* 입력 예외 처리 */
        [beverage, count] = checkInput(beverage, count);

        /* 주문 처리 */
        handleOrder(customer, beverage, count);
      }
      /* 주문 전송 */
      startOrder(customer);

    } else { // mission 1 입력 방식 => ex) 1:1
      let [beverage, count] = input.split(":");

      /* 입력 예외 처리 */
      [beverage, count] = checkInput(beverage, count);

      /* 고객 정보 설정 */
      customer.setName(customerProps.name[customerProps.idx]);
      setNextCustomer(customerProps);

      /* 주문 처리 */
      handleOrder(customer, beverage, count);

      /* 주문 전송 */
      startOrder(customer);
    }

  } catch (err) {
    console.error(err.message);
  }

}).on("close", () => {
  process.exit(0);
})