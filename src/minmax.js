function minmax(rootNode, depthLimit = undefined) {
    let currNode,
        list = [];

    list.push(rootNode);

    while (list.length > 0) {
        currNode = list.pop();

        if (currNode.visited || currNode.isTerminal() || currNode.depth >= depthLimit) {
            if (!currNode.visited) {
                // node is a leaf or we reached depth limit
                currNode.setValue(currNode.calcValue());
            }
            if (currNode.parent) {
                updateParent(currNode);
            }
        } else {
            currNode.visited = true;
            list.push(currNode);
            list.push(...currNode.getChilds());
        }
    }

    return currNode.getValue();
}

/**
 * updates node's parent value.
 */
function updateParent(node) {
    let parent = node.parent;
    parent.setValue(parent.type === 'min' ?
        Math.min(node.value, parent.value) :
        Math.max(node.value, parent.value));
}

module.exports = minmax;