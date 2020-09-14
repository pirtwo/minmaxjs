const Node = require('../src/node');
const alphabeta = require('../src/alphabeta');

test('test alpha-beta', () => {
    expect(alphabeta(new MyNode({
        type: 'max',
        state: "0000",
    })).value).toBe(0);

    expect(alphabeta(new MyNode({
        type: 'min',
        state: "0000",
    })).value).toBe(0);

    expect(alphabeta(new MyNode({
        type: 'max',
        state: "xo00",
    })).value).toBe(1);

    expect(alphabeta(new MyNode({
        type: 'min',
        state: "ox00",
    })).value).toBe(-1);
});


// creating custom scenario
// 
// max   -> x 
// min   -> o
// state -> "0000"
// x win -> {"x0ox", "xo0x", "0xxo", "oxx0"}
// o win -> {"o0xo", "ox0o", "0oox", "xoo0"}

const xwinStates = ["x0ox", "xo0x", "0xxo", "oxx0"];
const owinStates = ["o0xo", "ox0o", "0oox", "xoo0"];

class MyNode extends Node {
    constructor({
        type,
        state,
        parent
    }) {
        super({
            type,
            state,
            parent
        });
    }

    calcValue() {
        if (owinStates.indexOf(this.state) > -1)
            return -1;
        if (xwinStates.indexOf(this.state) > -1)
            return 1;
        return 0;
    }

    isTerminal() {
        return xwinStates.indexOf(this.state) > -1 ||
            owinStates.indexOf(this.state) > -1 ||
            !this.state.includes('0');
    }

    getChilds() {
        let childs = [],
            currPlayer = this.type === 'max' ? 'x' : 'o';

        this.state.split("").forEach((value, index) => {
            if (value === '0') {
                let nextState = this.state.split("");
                nextState[index] = currPlayer;
                childs.push(new MyNode({
                    type: this.type === 'min' ? 'max' : 'min',
                    state: nextState.join(""),
                    parent: this
                }))
            }
        });

        return childs;
    }
}