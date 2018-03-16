const SHA256 = require('crypto-js/sha256');

module.exports = class Block{
    constructor(data, index = 0, timestamp = (new Date).getTime(), previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.data = data;
        this.nonce = 1;
        this.hash = this.calculateHash();
    }

    incrementNonce() {
        this.nonce++;
    }

    calculateHash(){
      return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
    }

}
