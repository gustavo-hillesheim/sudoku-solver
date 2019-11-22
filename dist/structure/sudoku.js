"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grid_1 = require("./grid");
const line_1 = require("./line");
const square_1 = require("./square");
const constants_1 = require("../constants");
class Sudoku {
    constructor(sudoku) {
        if (Array.isArray(sudoku[0])) {
            sudoku = this.normalizeSudoku(sudoku);
        }
        const sudokuSquares = sudoku.map(this.createSquare);
        this.squares = sudokuSquares;
        this.findGrids();
        this.findRows();
        this.findColumns();
        sudokuSquares.forEach(square => square.calculatePossibilities());
    }
    createSquare(value, index) {
        const x = index % constants_1.SUDOKU_SIZE;
        const y = (index - x) / constants_1.SUDOKU_SIZE;
        return new square_1.Square(value, x, y);
    }
    findGrids() {
        const grids = [];
        for (let y = 0; y < constants_1.SUDOKU_SIZE; y += constants_1.GRID_SIZE) {
            for (let x = 0; x < constants_1.SUDOKU_SIZE; x += constants_1.GRID_SIZE) {
                const grid = new grid_1.Grid(this.getGrid(this.squares, x, y));
                grid.forEach(square => square.grid = grid);
                grids.push(grid);
            }
        }
        this.grids = grids;
    }
    getGrid(sudoku, startX, startY) {
        const grid = [];
        for (let y = startY; y < startY + constants_1.GRID_SIZE; y++) {
            for (let x = startX; x < startX + constants_1.GRID_SIZE; x++) {
                grid.push(sudoku[y * constants_1.SUDOKU_SIZE + x]);
            }
        }
        return grid;
    }
    findRows() {
        const rows = [];
        for (let y = 0; y < constants_1.SUDOKU_SIZE; y++) {
            const rowSquares = this.squares.slice(y * constants_1.SUDOKU_SIZE, (y + 1) * constants_1.SUDOKU_SIZE);
            const row = new line_1.Line(rowSquares);
            row.forEach(square => square.row = row);
            rows.push(row);
        }
        this.rows = rows;
    }
    findColumns() {
        const columns = [];
        for (let x = 0; x < constants_1.SUDOKU_SIZE; x++) {
            const columnSquares = [];
            for (let y = 0; y < constants_1.SUDOKU_SIZE; y++) {
                columnSquares.push(this.squares[y * constants_1.SUDOKU_SIZE + x]);
            }
            const column = new line_1.Line(columnSquares);
            column.forEach(square => square.column = column);
            columns.push(column);
        }
        this.columns = columns;
    }
    normalizeSudoku(sudoku) {
        const normalizedSudoku = [];
        sudoku.forEach(line => {
            line.forEach(square => normalizedSudoku.push(square));
        });
        return normalizedSudoku;
    }
}
exports.Sudoku = Sudoku;
//# sourceMappingURL=sudoku.js.map