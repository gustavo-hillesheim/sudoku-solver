import { Sudoku } from '../structure/sudoku';
import { SquarePossibilityManager } from '../utils/square-possibility-manager';
import { Square } from '../structure/square';
import { SquareGroup } from '../structure/square-group';

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

interface SquareToFill {

  square: Square;
  value: number;
}

function fillSudokuSquares(sudoku: Sudoku, squaresToFill: SquareToFill[]): void {

  if (squaresToFill && squaresToFill.length) {

    squaresToFill
      .forEach(({ square, value }) => {

        square.value = value;
        squarePossibilityManager.removeValueFromGroupPossibilities(square);
      });
  }
}

export class OnlyPossibilitySolvingAlgorithm implements SolvingAlgorithm {

  solve(sudoku: Sudoku): Sudoku {

    const sudokuCopy = copySudoku(sudoku);
    let squaresToFill = this.findSquaresWithOnePossibility(sudokuCopy);

    while (squaresToFill.length) {

      fillSudokuSquares(sudoku, squaresToFill);
      squaresToFill = this.findSquaresWithOnePossibility(sudokuCopy);
    }

    return sudokuCopy;
  }

  private findSquaresWithOnePossibility({ squares }: Sudoku): SquareToFill[] {

    return squares
      .filter(square => square.possibilities && square.possibilities.size === 1)
      .map(square => ({ square, value: square.possibilities.values().next().value }));
  }
}

export class OnlyPossibilityInGroupSolvingAlgorithm implements SolvingAlgorithm {

  solve(sudoku: Sudoku): Sudoku {

    const sudokuCopy = copySudoku(sudoku);
    let squaresToFill = this.findSquaresWithOnlyPossibilityInGroup(sudokuCopy);

    while (squaresToFill.length) {

      fillSudokuSquares(sudokuCopy, squaresToFill);
      squaresToFill = this.findSquaresWithOnlyPossibilityInGroup(sudokuCopy);
    }

    return sudokuCopy;
  }

  private findSquaresWithOnlyPossibilityInGroup({ squares }: Sudoku): SquareToFill[] {

    return squares
      .filter(square => !square.value)
      .map(square => {

        const onlyPossibilityInRow = this.findOnlyPossibilityInGroup(square, square.row);
        const onlyPossibilityInColumn = this.findOnlyPossibilityInGroup(square, square.column);
        const onlyPossibilityInGrid = this.findOnlyPossibilityInGroup(square, square.grid);
        const onlyPossibilityInGroup = onlyPossibilityInRow || onlyPossibilityInColumn || onlyPossibilityInGrid;
        return { square, value: onlyPossibilityInGroup };
      })
      .filter(({ value}) => !!value);
  }

  private findOnlyPossibilityInGroup(square: Square, squareGroup: SquareGroup): number {

    const possibilities = Array.from(square.possibilities);
    return possibilities
      .find(possibility => {

        return !squareGroup.squares
          .filter(square => !square.value)
          .some(groupSquare => {

            const groupSquareHasSamePossibility = Array.from(groupSquare.possibilities)
              .some(groupSquarePossibility => groupSquarePossibility === possibility);
              
            return groupSquare !== square && groupSquareHasSamePossibility;
          });
      });
  }
}