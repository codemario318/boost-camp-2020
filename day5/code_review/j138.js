const bucket_size = 400E+7;
const magic_num = 38;
let map = [];

module.exports = HashMap = function() {
    //values
    this.hashTable = new Array(bucket_size);
    this.keyArray = [];
    this.valueArray = [];
    this.mapSize = 0;

    //methods
    this.hasing = hasing;
    this.clear = clear;
    this.contains = contains;
    this.getValue = getValue;
    this.isEmpty = isEmpty;
    this.keys = keys;
    this.put = put;
    this.remove = remove;
    this.replace = replace;
    this.size = size;

    function hasing(key) {
        let hashKey = 0;
        for(let i = 0; i < key.length; i++)
            hashKey = (hashKey * magic_num + key.charCodeAt(i)) % bucket_size;

        return hashKey;
    }

    function clear() {
        this.hashTable.length = 0;
        this.hashTable.length = bucket_size;
        this.keyArray.length = 0;
        this.valueArray.length = 0;
        this.mapSize = 0;
    }

    function contains(key) {
        const hashCode = this.hasing(key);

        for(let i = hashCode; this.keyArray[i] != undefined; i++) {
            if(this.keyArray[i] == key)
                return true;
        }

        return false;
    }

    function getValue(key) {
        const hashCode = this.hasing(key);

        for(let i = hashCode; this.keyArray[i] != undefined; i++) {
            if(this.keyArray[i] == key)
                return this.valueArray[i];
        }

        return undefined;
    }

    function isEmpty() {
        if (this.mapSize === 0)
            return true;
        else
            return false;
    }

    function keys() {
        const arr = new Array(this.mapSize);
        let check = 0;
        let i = 0;

        while(check != this.mapSize) {
            if(this.keyArray[i] != undefined) {
                arr[check] = this.keyArray[i];
                check++;
            }
            i++;
        }
        return arr;
    }

    function put(value, key) {
        if(this.contains(key) == false) {
            let hashCode = this.hasing(key);
            while(this.hashTable[hashCode] != undefined)
                hashCode++;

            this.hashTable[hashCode] = value;
            this.keyArray[hashCode] = key;
            this.valueArray[hashCode] = value;
            this.mapSize++;
        }
    }

    function remove(key) {
        const hashCode = this.hasing(key);

        for(let i = hashCode; this.keyArray[i] != undefined; i++) {
            if(this.keyArray[i] == key) {
                this.hashTable[i] = undefined;
                this.keyArray[i] = undefined;
                this.valueArray[i] = undefined;
                this.mapSize--;
                return;
            }
        }

        return false;
    }

    function replace(value, key) {
        const hashCode = this.hasing(key);

        for(let i = hashCode; this.keyArray[i] != undefined; i++) {
            if(this.keyArray[i] == key) {
                this.valueArray[i] = value;
                return;
            }
        }

        this.put(value, key);
    }

    function size() {
        return this.mapSize;
    }
}

// m = new HashMap();
// m.put("check1", "a");
// m.put("check2", "b");
// m.put("check3", "c");
// m.put("check4", "d");
// m.clear();
// let arr = m.keys();
// console.log(arr[0]);