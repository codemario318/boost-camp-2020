class Hash {
    constructor(maxSize) {
        this.maxSize = maxSize;
    }

    getHashCode(key) {
        const keyString = String(key);
        let code_sum = 0;

        for (let i = 0; i < keyString.length; i++) {
            code_sum += keyString.charCodeAt(i);
        }
        return code_sum % this.maxSize;
    }
}

module.exports = Hash;
