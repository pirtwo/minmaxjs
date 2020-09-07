function alphaBetaPruning(rootNode, depthLimit = undefined) {
    let list = [],
        currNode;

    list.push(rootNode);

    while (list.length > 0) {
        currNode = list.pop();

        if (currNode.visited || currNode.isTerminal() || currNode.depth >= depthLimit) {
            if (!currNode.visited) {
                // node is a leaf or we reached depth limit
                currNode.setValue(currNode.calcValue());
            } else {
                // all childs of this node is visited and we 
                // can set its value based on alpha and beta
                currNode.setValue(
                    currNode.type === 'min' ?
                    currNode.alpha :
                    currNode.beta);
            }

            if (currNode.parent) {
                // update parent alpha and beta
                updateParent(currNode);

                // check for prune
                if (canPrune(currNode)) {
                    list.slice(list.indexOf(currNode));
                }
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
 * returns true if we allowed to prune the node and its branches.
 */
function canPrune(node) {
    let parent = node.parent;

    return node.type === 'min' ?
        node.beta < parent.alpha :
        node.alpha > parent.beta;
}

/**
 * updates alpha or beta of node's parent.
 */
function updateParent(node) {
    let parent = node.parent;

    if (parent.type === 'min')
        parent.beta = Math.min(parent.beta, node.alpha);
    else
        parent.alpha = Math.max(parent.alpha, node.beta);
}