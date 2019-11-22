"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
class SudokuPrinter {
    print(sudoku) {
        const solvedSudoku = sudoku.squares.map(square => square.value);
        let rowDivider = '';
        for (let y = 0; y < constants_1.SUDOKU_SIZE; y++) {
            let sudokuRow = '';
            let ColumnDivider = '';
            for (let x = 0; x < constants_1.SUDOKU_SIZE; x++) {
                const squareValue = solvedSudoku[y * constants_1.SUDOKU_SIZE + x];
                sudokuRow += ColumnDivider;
                sudokuRow += squareValue ? squareValue.toFixed(0) : ' ';
                ColumnDivider = ' | ';
            }
            console.log(rowDivider);
            console.log(sudokuRow);
            rowDivider = '---------------------------------';
        }
    }
}
exports.SudokuPrinter = SudokuPrinter;
//# sourceMappingURL=sudoku-printer.js.map