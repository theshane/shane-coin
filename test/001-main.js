const BlockChain = require('../src/lib/block-chain.js');
const Block = require('../src/lib/block.js');
const assert = require('assert');
const expect = require('chai').expect;

describe('BlockChain', function() {
    let shaneCoin = new BlockChain();

    it('should have default genisis block',function(){
        assert.equal(shaneCoin.chain[0].data, 'Geneisis Block');
    });

    describe("#addBlock()", function(){
        const block1 = new Block({amount: 4, userId: 1});
        const block2 = new Block({amount: 100, userId: 2});
        shaneCoin.addBlock(block1);
        shaneCoin.addBlock(block2);
        it('should have 3 blocks',function(){
            assert.equal(shaneCoin.chain.length, 3);
        });
    });

    it('should have a valid chain', function(){
        expect(shaneCoin.isChainValid()).to.equal(true);
    });

    it('should give accurate amounts based on userId', function(){
        expect(shaneCoin.getAmountByUserId(1)).to.equal(4);
        expect(shaneCoin.getAmountByUserId(2)).to.equal(100);
    });

    it('should have an in-valid chain if tampered with', function(){
        const hackBlock = shaneCoin.chain[1];
        hackBlock.data = {amount: 100000, userId: 1};
        expect(shaneCoin.isChainValid()).to.equal(false);
    });

});
