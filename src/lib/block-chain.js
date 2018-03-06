const Block = require('./block.js');

module.exports = class BlockChain{
    constructor(){
        this.chain = [this.createGenisisBlock()];
    }
    /**
     * Creates the geneisis block which is largely ignored in most functions
    */
    createGenisisBlock(){
     return new Block('Geneisis Block');
    }

    /**
     * Get the latest block
    */
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    /**
     * Add a block to the chain
     * @param {Block} newBlock
     */
    addBlock(newBlock) {
        newBlock.index = this.getIndex();
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    /**
     * Get the index of the next item
     */
    getIndex() {
        return this.chain.length;
    }

    /**
     * Get the amount that a user has
     * @param {Int} userId
     */
    getAmountByUserId(userId) {
        let total = 0;

        for(let i = 1; i < this.chain.length; i++){
           if(this.chain[i].data.userId === userId){
               total += this.chain[i].data.amount;
           }
        }

        return total;
    }

    /**
     * Check the validity of the chain
     * If any item's previousHash does not match the last item's hash
     * then it is invalid
    */
    isChainValid() {

       for(let i = 1; i < this.chain.length; i++){
           const currentBlock = this.chain[i];
           const previousBlock = this.chain[i - 1];

           if(currentBlock.hash != currentBlock.calculateHash()) {
               return false;
           }

           if(currentBlock.previousHash != previousBlock.hash) {
                return false;
           }

             return true;
       }
    }
}
