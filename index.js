const Node = require("./src/node");
const minmax = require("./src/minmax");
const abPruning = require("./src/alphabeta");

module.exports = {
    node: Node,
    minmax: minmax,
    abPruning: abPruning
}