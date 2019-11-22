"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sudoku_printer_1 = require("./sudoku-printer");
class SudokuSolver {
    constructor() {
        this.sortSquares = (s1, s2) => {
            return s1.possibilities.length - s2.possibilities.length;
        };
    }
    solve(sudoku) {
        const sudokuPrinter = new sudoku_printer_1.SudokuPrinter();
        console.log('solving sudoku:');
        sudokuPrinter.print(sudoku);
        const squares = sudoku.squares
            .filter(square => !square.value)
            .sort(this.sortSquares);
        squares[0].value = squares[0].possibilities[0];
        console.log('solved sudoku:');
        sudokuPrinter.print(sudoku);
    }
}
exports.SudokuSolver = SudokuSolver;
//# sourceMappingURL=sudoku-solver.js.map