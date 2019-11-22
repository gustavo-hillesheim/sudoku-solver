"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
class Square {
    constructor(value, x, y) {
        this.x = x;
        this.y = y;
        this._value = value;
    }
    set value(value) {
        this._value = value;
        this.possibilities = [];
        this.grid.squareValueChanged(this);
        this.row.squareValueChanged(this);
        this.column.squareValueChanged(this);
    }
    get value() { return this._value; }
    calculatePossibilities() {
        if (this.value) {
            this.possibilities = [];
            return;
        }
        let possibilities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        const removePossibility = (square) => {
            possibilities = possibilities.filter(possibility => possibility !== square.value);
        };
        this.grid.forEach(removePossibility);
        this.row.forEach(removePossibility);
        this.column.forEach(removePossibility);
        this.possibilities = possibilities;
        if (constants_1.TRACK_CHANGES && this.x === constants_1.TRACK_CHANGES_X && this.y === constants_1.TRACK_CHANGES_Y) {
            console.log(`square ${this.x} - ${this.y}`, 'possibilities', this.possibilities);
        }
    }
    removePossibility(possibilityToRemove) {
        if (constants_1.TRACK_CHANGES && this.x === constants_1.TRACK_CHANGES_X && this.y === constants_1.TRACK_CHANGES_Y) {
            console.log(`square ${this.x} - ${this.y},`, 'value', this.value, 'possibilities', this.possibilities, 'removed possibility', possibilityToRemove);
        }
        this.possibilities = this.possibilities
            .filter(possibility => possibility !== possibilityToRemove);
        if (this.possibilities.length === 1) {
            const onlyPossibility = this.possibilities[0];
            if (!this.row.has(onlyPossibility) && !this.column.has(onlyPossibility) && !this.grid.has(onlyPossibility)) {
                this.value = onlyPossibility;
            }
        }
    }
}
exports.Square = Square;
//# sourceMappingURL=square.js.map