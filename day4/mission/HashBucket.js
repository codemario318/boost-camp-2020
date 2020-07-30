class ArrayBucket {
    constructor(bucketSize) {
        this.buckets = new Array(bucketSize);

        for (let i = 0; i < bucketSize; i++) this.buckets[i] = new Array();
    }

    getValue(code, key) {
        const bucket = this.buckets[code];

        for (const item of bucket) {
            if (item[0] === key) return item[1];
        }

        return undefined;
    }

    getPos(code, key) {
        const bucket = this.buckets[code];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) return i;
        }

        return undefined;
    }

    getKeys() {
        const keys = Array();

        for (const bucket of this.buckets) {
            for (const item of bucket) {
                keys.push(item[0]);
            }
        }

        return keys;
    }

    add(code, key, value) {
        const pos = this.getPos(code, key);

        if (pos !== undefined) return false;

        this.buckets[code].push([key, value]);
        return true;
    }

    remove(code, key) {
        const bucket = this.buckets[code],
            pos = this.getPos(code, key);

        if (pos === undefined) return false;

        bucket.splice(pos, 1);
        return true;
    }

    replace(code, key, value) {
        const pos = this.getPos(code, key),
            bucket = this.buckets[code];

        if (pos === undefined) {
            this.buckets[code].push([key, value]);
            return false;
        }

        bucket[pos][1] = value;
        return true;
    }

    print() {
        console.log(this.buckets);
    }

}
module.exports = ArrayBucket;
