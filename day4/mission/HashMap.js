const Bucket = require('./HashBucket');
const Hash = require('./Hash');

class HashMap {
    constructor(bucketSize) {
        this.hash = new Hash(bucketSize);
        this.bucket = new Bucket(bucketSize);
        this.mapSize = 0;
    }

    clear() {
        this.bucket = new Bucket(bucketSize);
        this.size = 0;
    }

    contains(key) {
        const pos = this.getValue(key);
        return (pos !== undefined) ? true : false;
    }

    getValue(key) {
        const code = this._getCode(key);
        return this.bucket.getValue(code, key);
    }

    isEmpty() {
        return this.mapSize ? true : false;
    }

    keys() {
        return this.bucket.getKeys();
    }

    put(key, value) {
        const code = this.getCode(key),
            res = this.bucket.add(code, key, value);
        if (res) this.mapSize++;
    }

    remove(key) {
        const code = this.getItem(key),
            res = this.bucket.remove(code, key);
        if (res) this.mapSize--;
    }

    replace(key, value) {
        const code = this.getCode(key),
            res = this.bucket.replace(code, key, value);
        if (!res) this.mapSize++;
    }

    size() {
        return this.mapSize;
    }

    _getCode(key) {
        return this.hash.getHashCode(key);
    }

}

const hashMap = new HashMap(20);
// hashMap.