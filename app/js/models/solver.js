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

    var states = [];
    var validMoves = this.grid.getValidMoves();

    for (var i in validMoves) {
        var move = validMoves[i];
        var lastMove = _.last(this.moves);

        if (!lastMove || Grid.getOppositeDirection(lastMove) != move) {
            var newGrid = this.grid.clone();

            newGrid.move(move);
            states.push(new State(newGrid, this.moves.concat([move])));
        }
    }
    
    return states;
};

/**
 * @param grid
 * @constructor
 */
function Solver(grid) {
    console.log(grid);

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
    // Constantes
    var MAX = 200000;
    // ------------

    var visitedSet = new Set();
    var iterations = 0;

    while (this.queue.length > 0) {

        /**
         * Configura quantas iterações são possíveis para encontrar a solução
         */

        iterations++;
        if (iterations >= MAX) return false;

        var gridState = this.queue.dequeue();

        if (gridState.grid.isSolved()) {
            return gridState.moves;
        } else {
            visitedSet.add(gridState);
            var newStates = gridState.expand(gridState);

            for (var i in newStates) {
                var newState = newStates[i];
                if (!visitedSet.has(newState)) {
                    this.queue.queue(newState);
                }
            }
        }
    };
}

module.exports = Solver;