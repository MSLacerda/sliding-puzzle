var _ = require('lodash');

/**
 * @param tiles
 * @param emptyPosition
 * @param expected
 * @constructor
 */
function Grid(tiles, emptyPosition, expected) {
    if (tiles.length != expected.length) {
        throw 'Invalid size';
    }

    // Tamanho da grid
    this.size = Math.sqrt(tiles.length);
    

    this.tiles = tiles;
    this.emptyPosition = emptyPosition;
    this.expected = expected;
}

/**
 * @returns {boolean}
 */
Grid.prototype.isSolvable = function() {
    function countInversions(array) {
        var inversions = 1;

        for (var i = 0; i < array.length - 1; i++) {
            for (var j = i+1; j < array.length -1; j++) {
                if (array[i] > array[j]) inversions++;
            }
        }

        return inversions;
    }

    console.log(this.tiles % 2 === 0);
    return countInversions(this.tiles) % 2 == 0;
};

Grid.prototype.ensureSolvable = function() {
    function switchTiles(array) {
        // trocar tiles para uma nova configuração

    }
    if (!this.isSolvable()) {
        // this.tiles = switchTiles(this.tiles);
    }
};

/**
 * @param position
 * @returns {{x: number, y: number}}
 */
Grid.prototype.getTileCoordinates = function(position) {
    console.log(position % this.size);

    return {
        x: position % this.size,
        y: Math.floor(position / this.size)
    };
};

/**
 * @returns {Array}
 */
Grid.prototype.getValidMoves = function() {
    var axis = this.getTileCoordinates(this.emptyPosition);
    var max = this.size - 1;
    var valid = new Array();
    if (axis.y > 0) valid.push(Grid.MOVE_UP);
    if (axis.x > 0) valid.push(Grid.MOVE_LEFT);
    if (axis.x < max) valid.push(Grid.MOVE_RIGHT);
    if (axis.y < max) valid.push(Grid.MOVE_DOWN);
    return valid;
};

/**
 * @returns {number}
 */
Grid.prototype.manhattan = function(currentPosition, expectedPosition) {
    var currentPosition = this.getTileCoordinates(currentPosition);
    var expectedPosition = this.getTileCoordinates(expectedPosition);
    var x = Math.abs(currentPosition.x - expectedPosition.x);
    var y = Math.abs(currentPosition.y - expectedPosition.y);
    return x + y;
};

/**
 * @returns {*}
 */
Grid.prototype.heuristic = function() {

};

/**
 * Print a human-readable string representation
 */
Grid.prototype.print = function() {
    var i = 0;
    while (i < this.tiles.length) {
        var slice = this.tiles.slice(i, i + this.size);
        i += this.size;
        console.log(slice);
    }
};

/**
 * @returns {Grid}
 */
Grid.prototype.clone = function() {
    return new Grid(_.clone(this.tiles), _.clone(this.emptyPosition), this.expected);
};

/**
 * @param tiles
 * @returns {boolean}
 */
Grid.prototype.equals = function(tiles) {
    return _.isEqual(this.tiles, tiles);
};

/**
 * @returns {boolean}
 */
Grid.prototype.isSolved = function() {
    return _.isEqual(this.tiles, this.expected);
};

/**
 * @param swapPosition
 */
Grid.prototype.swap = function(swapPosition) {
    this.tiles[this.emptyPosition] = this.tiles[swapPosition];
    this.tiles[swapPosition] = '';
    this.emptyPosition = swapPosition;
};

/**
 * @param position
 * @returns {Set}
 */
Grid.prototype.getAdjacentTiles = function(position) {
    console.log(position);

    var coordinates = this.getTileCoordinates(position);

    console.log(coordinates);
    var max = this.size - 1;
    var adjacentTiles = new Set();
    if (coordinates.x > 0) {
        adjacentTiles.add(this.tiles[position - 1]);
    }
    if (coordinates.x < max) {
        adjacentTiles.add(this.tiles[position + 1]);
    }
    if (coordinates.y > 0) {
        adjacentTiles.add(this.tiles[position - this.size]);
    }
    if (coordinates.y < max) {
        adjacentTiles.add(this.tiles[position + this.size]);
    }
    return adjacentTiles;
};

/**
 * @param position
 * @returns {boolean}
 */
Grid.prototype.moveTile = function(position) {
    var adjacentTiles = this.getAdjacentTiles(position);
    if (adjacentTiles.has(Grid.EMPTY_TILE_CONTENT)) {
        this.swap(position);
        return true;
    }
    return false;
};

/**
 * @param direction
 */
Grid.prototype.move = function(direction) {
    var swapPosition = null;
    switch (direction) {
        case Grid.MOVE_UP:
            swapPosition = this.emptyPosition - this.size;
            break;
        case Grid.MOVE_LEFT:
            swapPosition = this.emptyPosition - 1;
            break;
        case Grid.MOVE_RIGHT:
            swapPosition = this.emptyPosition + 1;
            break;
        case Grid.MOVE_DOWN:
            swapPosition = this.emptyPosition + this.size;
            break;
        default:
            throw 'Invalid direction';
    }
    if (swapPosition !== null) {
        this.swap(swapPosition);
    }
};

Grid.EMPTY_TILE_CONTENT = '';
Grid.MOVE_UP = 'UP';
Grid.MOVE_DOWN = 'DOWN';
Grid.MOVE_LEFT = 'LEFT';
Grid.MOVE_RIGHT = 'RIGHT';

/**
 * @param direction
 * @returns {*}
 */
Grid.getOppositeDirection = function(direction) {
    switch (direction) {
        case Grid.MOVE_UP:
            return Grid.MOVE_DOWN;
        case Grid.MOVE_DOWN:
            return Grid.MOVE_UP;
        case Grid.MOVE_LEFT:
            return Grid.MOVE_RIGHT;
        case Grid.MOVE_RIGHT:
            return Grid.MOVE_LEFT;
        default:
            throw 'Invalid direction';
    }
};

/**
 * @param size
 * @returns {Grid}
 */
Grid.buildFromSize = function(size) {

    // Cria um array contendo o tamanho do lado ao quadrado
    // e depois randomiza o mesmo
    var sortedTiles = _.range(1, Math.pow(size, 2));
    var shuffledTiles = _.shuffle(sortedTiles);


    shuffledTiles.push('');
    sortedTiles.push('');

    var grid = new Grid(shuffledTiles, shuffledTiles.length - 1, sortedTiles);
    grid.ensureSolvable();
    return grid;
};

module.exports = Grid;