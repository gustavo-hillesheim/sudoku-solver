import { Sudoku } from "./structure/sudoku";
import { Square } from "./structure/square";
import { SudokuPrinter } from "./sudoku-printer";

export class SudokuSolver {

  solve(sudoku: Sudoku): void {

    const sudokuPrinter = new SudokuPrinter();

    console.log('solving sudoku:');
    sudokuPrinter.print(sudoku);

    const squares = sudoku.squares
      .filter(square => !square.value)
      .sort(this.sortSquares);
    
    squares[0].value = squares[0].possibilities[0];

    console.log('solved sudoku:');
    sudokuPrinter.print(sudoku);
  }

  private sortSquares = (s1: Square, s2: Square) => {
    return s1.possibilities.length - s2.possibilities.length;
  }
}