const BlockChain = require('../src/lib/block-chain.js');
const Block = require('../src/lib/block.js');
const assert = require('assert');
const expect = require('chai').expect;
const SHA256 = require('crypto-js/sha256');

describe('BlockChain', function() {
    let shaneCoin = new BlockChain();

    const testHash = SHA256('THIS IS A TEST').toString();

    it('testHash should not be valid', () => {
        assert.equal(shaneCoin.isValidHash(testHash), false);
    });

    it('Prefix length should match leading zeros', () => {
        assert.equal(shaneCoin.leadingZeros, shaneCoin.getHashPrefix().length);
    });

    it('should have default genisis block',() => {
        assert.equal(shaneCoin.chain[0].data.userId, 0);
    });

    describe("#addBlock()", () => {
        const block1 = new Block({amount: 4, userId: 1});
        const block2 = new Block({amount: 100, userId: 2});
        shaneCoin.addBlock(block1);
        shaneCoin.addBlock(block2);
        it('should have 3 blocks', () => {
            assert.equal(shaneCoin.chain.length, 3);
        });
    });

    it('should have a valid chain', () => {
        expect(shaneCoin.isChainValid()).to.equal(true);
    });

    it('should give accurate amounts based on userId', () => {
        expect(shaneCoin.getAmountByUserId(1)).to.equal(4);
        expect(shaneCoin.getAmountByUserId(2)).to.equal(100);
    });

    it('should have an in-valid chain if tampered with', () => {
        const hackBlock = shaneCoin.chain[1];
        hackBlock.data = {amount: 100000, userId: 1};
        expect(shaneCoin.isChainValid()).to.equal(false);
    });

});
