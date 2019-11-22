import { Sudoku } from "./structure/sudoku";
import { SUDOKU_SIZE } from "./constants";

export class SudokuPrinter {

  print(sudoku: Sudoku): void {

    const solvedSudoku = sudoku.squares.map(square => square.value);

    let rowDivider = '';
    for (let y = 0; y < SUDOKU_SIZE; y++) {

      let sudokuRow = '';
      let ColumnDivider = '';
      for (let x = 0; x < SUDOKU_SIZE; x++) {
        const squareValue = solvedSudoku[y * SUDOKU_SIZE + x];
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