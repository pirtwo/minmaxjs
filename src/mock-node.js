const Node = require("./node");
const xwinStates = ["x0ox", "xo0x", "0xxo", "oxx0"];
const owinStates = ["o0xo", "ox0o", "0oox", "xoo0"];

/**
 * creating custom scenario <br>
 * - max   -> x
 * - min   -> o
 * - state -> "0000"
 * - x win -> {"x0ox", "xo0x", "0xxo", "oxx0"}
 * - o win -> {"o0xo", "ox0o", "0oox", "xoo0"}
 */
class MockNode extends Node {
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
                childs.push(new MockNode({
                    type: this.type === 'min' ? 'max' : 'min',
                    state: nextState.join(""),
                    parent: this
                }));
            }
        });

        return childs;
    }
}

module.exports = MockNode;