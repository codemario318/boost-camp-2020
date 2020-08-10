module.exports = class HashMap {

    //bucket을 이차원 배열로 선언, _size는 요소의 개수, capacity는 hashTable의 크기
    constructor(capacity){
        this.bucket = new Array(capacity);
        for (let i = 0; i < this.bucket.length; i++)
            this.bucket[i] = new Array();
        this._size = 0;
        this.capacity = capacity;
    }

    //bucket을 모두 새로 할당, _size초기화
    clear(){
        this.bucket = new Array(this.capacity);
        for (let i = 0; i < this.bucket.length; i++)
          this.bucket = new Array();
        this._size = 0;
    }

    //해당 key를 가지고 있는지 확인
    contains(key){
        const hashValue = this.hash(key);
        
        for (let data of this.bucket[hashValue]) {
            if (data[0] === key)
                return true;
        }
            
        return false;
    }

    //key값을 이용해 hashTable을 찾아 연결 되어 있는 배열에서 value를 찾음
    getValue(key){
        const hashValue = this.hash(key);
        
        for (let data of this.bucket[hashValue]) {
            if (data[0] === key)
                return data[1];
        }

        return null;
    }

    //_size변수를 이용하여 비어있는지 여부를 확인
    isEmpty(){
        if (this._size === 0)
            return true;
        return false;
    }

    //배열을 순회하면서 key값을 얻어옴
    keys(){
        let keyArray = [];

        for ( let dataArray of this.bucket) {
           for (let data of dataArray)
                keyArray.push(data[0]);
        }
        return keyArray;
    }

    //포함여부를 확인하고 hash함수를 이용해 hashTable의 인덱스를 찾고 연결되어 있는 배열에 삽입
    put(value, key) {
        if (this.contains(key))
            return;
        
        const hashValue = this.hash(key);
        this.bucket[hashValue].push([key, value]);
        this._size++;
    }

    //hash값을 이용하여 배열을 찾은 후 존재하면 배열에서 삭제
    remove(key) {
        const hashValue = this.hash(key);
        for (let i = 0; i < this.bucket[hashValue].length; i++) {
            if (this.bucket[hashValue][i][0] === key) {
                this.bucket[hashValue].splice(i,1);
                this._size--;
                return;
            }
        }
    }

    //hashTable을 찾아서 변경하거나 새로 추가해준다.
    replace(value, key) {
        const hashValue = this.hash(key);
        
        for (let data of this.bucket[hashValue]){
            if (data[0] === key){
                data[1] = value;
                return;
            }
        }

        this.bucket[hashValue].push([key, value]);
        this._size++;
    }

    //_size 변수를 리턴
    size() {
        return this._size;
    }

    //간단한 해시 함수 문자열을 아스키코드로 변환후 이 해시테이블의 크기로 모듈로 연산을 진행
    hash(key) {
        let hash = 0;
        for(let i = 0; i < key.length; i++){
            hash += key.charCodeAt(i);
        }
        return hash % this.capacity;
    }
}