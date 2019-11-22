"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
class SquareGroup {
    constructor(squares) {
        this.squares = squares;
    }
    squareValueChanged(changedSquare) {
        if (this.squares) {
            this.squares
                .filter(square => square !== changedSquare)
                .forEach(square => {
                if (square.x === constants_1.TRACK_CHANGES_X && square.y === constants_1.TRACK_CHANGES_Y) {
                    console.log(`changing possibilities of square ${square.x} - ${square.y} because of square ${changedSquare.x} - ${changedSquare.y}`);
                }
                square.removePossibility(changedSquare.value);
            });
        }
    }
    has(value) {
        return this.squares.findIndex(square => square.value === value) > -1;
    }
    forEach(fn) {
        this.squares.forEach(fn);
    }
}
exports.SquareGroup = SquareGroup;
//# sourceMappingURL=square-group.js.map