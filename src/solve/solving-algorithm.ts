import { Sudoku } from '../structure/sudoku';
import { SquarePossibilityManager } from '../utils/square-possibility-manager';
import { Square } from '../structure/square';

const squarePossibilityManager = new SquarePossibilityManager();
function copySudoku({ squares }: Sudoku): Sudoku {

  const sudokuArray = squares.map(square => square.value);
  const sudoku = new Sudoku(sudokuArray);
  squarePossibilityManager.calculateSquaresPossibilities(sudoku);
  return sudoku;
}

export interface SolvingAlgorithm {

  solve(sudoku: Sudoku): Sudoku;
}

export class OnlyPossibilitySolvingAlgorithm implements SolvingAlgorithm {

  solve(sudoku: Sudoku): Sudoku {

    const sudokuCopy = copySudoku(sudoku);
    let squaresWithOnePossibility = this.findSquaresWithOnePossibility(sudokuCopy);
    let index = 0;

    while (squaresWithOnePossibility.length) {

      const square = squaresWithOnePossibility[index];
      const possibility = square.possibilities.values().next().value;
      square.value = possibility;
      squarePossibilityManager.removeValueFromGroupPossibilities(square);
      
      if (++index === squaresWithOnePossibility.length) {
        squaresWithOnePossibility = this.findSquaresWithOnePossibility(sudokuCopy);
        index = 0;
      }
    }

    return sudokuCopy;
  }

  private findSquaresWithOnePossibility({ squares }: Sudoku): Square[] {

    return squares.filter(square => square.possibilities && square.possibilities.size === 1);
  }
}