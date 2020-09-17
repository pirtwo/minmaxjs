const MockNode = require('../src/mock-node');
const minmax = require('../src/minmax');
const alphabeta = require('../src/alphabeta');

test('test minmax', () => {
    expect(minmax(new MockNode({
        type: 'max',
        state: "0000",
    }))).toBe(0);

    expect(minmax(new MockNode({
        type: 'min',
        state: "0000",
    }))).toBe(0);

    expect(minmax(new MockNode({
        type: 'max',
        state: "xo00",
    }))).toBe(1);

    expect(minmax(new MockNode({
        type: 'min',
        state: "ox00",
    }))).toBe(-1);
});

test('test alpha-beta pruning', ()=>{
    expect(alphabeta(new MockNode({
        type: 'max',
        state: "0000",
    })).value).toBe(0);

    expect(alphabeta(new MockNode({
        type: 'min',
        state: "0000",
    })).value).toBe(0);

    expect(alphabeta(new MockNode({
        type: 'max',
        state: "xo00",
    })).value).toBe(1);

    expect(alphabeta(new MockNode({
        type: 'min',
        state: "ox00",
    })).value).toBe(-1);
});

