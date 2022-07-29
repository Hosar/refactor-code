const expect = require('chai').expect;
const { deterministicPartitionKey } = require('../lib');

describe('Deterministic Partition Key', () => {
    it('If not event, should return Trivial Partition Key', () => {
        const trivialPartitionKeyExpected = '0';
        const partitionKey = deterministicPartitionKey();

        expect(trivialPartitionKeyExpected).to.be.a('string');
        expect(trivialPartitionKeyExpected).to.equal(partitionKey)
    });

    it('if not partition key is provided, should create a sha3-512 hash', () => {
        const partitionKeyExpected = 'c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862';
        const event = {};
        const partitionKey = deterministicPartitionKey(event);

        expect(partitionKeyExpected).to.equal(partitionKey);
    });

    it('given a string partition key, should return the same key', () => {
        const partitionKeyExpected = '123';
        const event = {partitionKey: '123'};
        const partitionKey = deterministicPartitionKey(event);
        
        expect(partitionKey).to.be.a('string');
        expect(partitionKeyExpected).to.equal(partitionKey);
    });
    
    it('given a numeric partition key, should return the same key as string', () => {
        const partitionKeyExpected = '123';
        const event = {partitionKey: 123};
        const partitionKey = deterministicPartitionKey(event);
        expect(partitionKey).to.be.a('string');
        expect(partitionKeyExpected).to.equal(partitionKey);
    });

    it('given a long partition key, should return a max partition of 128', () => {
        const maxLengthExpected = 128;
        const longPartitionKey = 'c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a862c1802e6b9670927ebfddb7f67b3824642237361f07db35526c42c555ffd2dbe74156c366e1550ef8c0508a6cc796409a7194a59bba4d300a6182b483d315a8621';
        const event = {partitionKey: longPartitionKey};
        const partitionKey = deterministicPartitionKey(event);

        expect(partitionKey).to.be.a('string');
        expect(partitionKey).to.have.lengthOf(maxLengthExpected);
    });
});