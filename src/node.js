class MinmaxNode {
    constructor({
        type,
        state,
        parent = null,
    }) {
        this.type = type;
        this.alpha = -Infinity;
        this.beta = +Infinity;
        this.value = this.type === 'min' ? +Infinity : -Infinity;
        this.state = state;
        this.parent = parent;
        this.visited = false;
        this.depth = parent ? parent.depth + 1 : 0;
    }

    isTerminal() {
        throw new Error('not implemented');
    }

    calcValue() {
        throw new Error('not implemented');
    }

    getValue() {
        return this.value;
    }

    setValue(value) {
        this.value = value;
    }

    getChilds() {
        throw new Error('not implemented');
    }
}

module.exports = MinmaxNode;