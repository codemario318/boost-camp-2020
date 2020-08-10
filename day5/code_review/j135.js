class HashMap {
    static ERROR_MSG = {
      ALREADY_KEY_EXIST: '이미 존재하는 key입니다.',
      BUCKET_IS_FULL: '해쉬테이블에 빈 공간이 없습니다',
      NO_KEY: '존재하지 않는 key입니다.',
      INVALID_KEY: '유효하지 않은 key입니다.',
      INVALID_VALUE: '유효하지 않은 value입니다.',
    };
  
    constructor() {
      this.LIMIT_SIZE = 100;
      this.BUCKET_SIZE = 5;
      this.array = [];
      this._size = 0;
    }
  
    clear() {
      this.array = [];
      this._size = 0;
    }
  
    hash(key) {
      let value = key.split('').reduce((acc, cur) => acc + cur.charCodeAt(), 0) % this.LIMIT_SIZE;
  
      // bucket size의 배수로 만든다
      while ((value + 1) % this.BUCKET_SIZE !== 0) {
        value++;
      }
      value -= this.BUCKET_SIZE - 1;
  
      return value;
    }
  
    searchIndex(key) {
      let hashValue = this.hash(key);
      const max = hashValue + this.BUCKET_SIZE;
  
      while (
        hashValue !== max &&
        ((this.array[hashValue] && this.array[hashValue][0] !== key) || this.array[hashValue] === null)
      ) {
        hashValue++;
      }
  
      if (hashValue === max) {
        return false;
      }
  
      return hashValue;
    }
  
    contains(key) {
      if (!this.isValidKey(key)) {
        return;
      }
      const index = this.searchIndex(key);
      if (index === false) {
        return false;
      }
      return !!this.array[index];
    }
  
    getValue(key) {
      if (!this.isValidKey(key)) {
        return;
      }
      const index = this.searchIndex(key);
      if (index === false || !this.array[index]) {
        return null;
      }
      return this.array[index][1]; // value
    }
  
    isEmpty() {
      return this._size === 0;
    }
  
    put(key, value) {
      if (!this.isValidKey(key) || !this.isValidValue(value)) {
        return;
      }
      if (this.contains(key)) {
        console.warn(HashMap.ERROR_MSG.ALREADY_KEY_EXIST);
        return;
      }
      const index = this.searchIndex(key);
      if (index === false) {
        console.warn(HashMap.ERROR_MSG.BUCKET_IS_FULL);
        return;
      }
      this.array[index] = [key, value];
      this._size++;
    }
  
    keys() {
      return this.array.filter((i) => Array.isArray(i)).map((i) => i[0]);
    }
  
    remove(key) {
      if (!this.isValidKey(key)) {
        return;
      }
      if (!this.contains(key)) {
        console.warn(HashMap.ERROR_MSG.NO_KEY);
        return;
      }
      const index = this.searchIndex(key);
      this.array[index] = null;
      this._size--;
    }
  
    replace(key, value) {
      if (!this.isValidKey(key) || !this.isValidValue(value)) {
        return;
      }
      if (!this.contains(key)) {
        console.warn(HashMap.ERROR_MSG.NO_KEY);
        return;
      }
      const index = this.searchIndex(key);
      this.array[index] = [key, value];
    }
  
    size() {
      return this._size;
    }
  
    isValidKey(key) {
      if (typeof key !== 'string') {
        console.warn(HashMap.ERROR_MSG.INVALID_KEY);
        return false;
      }
      return true;
    }
  
    isValidValue(value) {
      if (typeof value !== 'string') {
        console.warn(HashMap.ERROR_MSG.INVALID_VALUE);
        return false;
      }
      return true;
    }
  }
  
  module.exports = HashMap;