var PriorityQueue = require('js-priority-queue');
var Grid = require('./grid');
var _ = require('lodash');

/**
 * @constructor
 */
function State(grid, moves) {
    this.grid = grid;
    this.moves = moves;
    this.cost = moves.length + grid.heuristic();
}

/**
 * @returns {Array}
 */
State.prototype.expand = function() {

};

/**
 * @param grid
 * @constructor
 */
function Solver(grid) {
    this.queue = new PriorityQueue({
        comparator: function(a, b) { return a.cost - b.cost; },
        strategy: PriorityQueue.BinaryHeapStrategy
    });
    this.queue.queue(new State(grid, []));
};

/**
 * @returns {*}
 */
Solver.prototype.solve = function() {
    console.log(this.queue);
};

module.exports = Solver;