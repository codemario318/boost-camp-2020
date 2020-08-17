const AMERICANO = 1;
const LATTE = 2;
const FRAPPUCCINO = 3;

const WAITING = "waiting";
const MAKING = "making";
const FINISH = "finish";

const customerProps = {
  name: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz가나다라마바사아자차카타파하",
  idx: 0,
  MOD: (26 + 26 + 14)
}

const setNextCustomer = (customerProps) => {
  customerProps.idx = (customerProps.idx + 1) % customerProps.MOD;
}

module.exports = {
  AMERICANO, LATTE, FRAPPUCCINO, customerProps, setNextCustomer,
  WAITING,
  MAKING,
  FINISH
};