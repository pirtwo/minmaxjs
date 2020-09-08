const Node = require('../src/node');
const minmax = require('../src/minmax');


test('test minmax', () => {
    expect(minmax(new MyNode({
        type: 'max',
        state: "0000",
    }))).toBe(0);

    expect(minmax(new MyNode({
        type: 'min',
        state: "0000",
    }))).toBe(0);

    expect(minmax(new MyNode({
        type: 'max',
        state: "xo00",
    }))).toBe(1);

    expect(minmax(new MyNode({
        type: 'min',
        state: "ox00",
    }))).toBe(-1);
})


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
            owinStates.indexOf(this.state) > -1 || !this.state.includes('0');
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