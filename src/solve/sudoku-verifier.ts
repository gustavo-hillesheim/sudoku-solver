import { Square } from './../structure/square';
import { Sudoku } from './../structure/sudoku';
import { SquareGroup } from '../structure/square-group';
export class SudokuVerifier {

  isSolved({ squares, grids, rows, columns }: Sudoku): boolean {

    return !(this.squareWithoutValueExists(squares)
      || grids.some(this.squareGroupRepeatValues)
      || rows.some(this.squareGroupRepeatValues)
      || columns.some(this.squareGroupRepeatValues));
  }

  private squareWithoutValueExists(squares: Square[]): boolean {
    return !!squares.find(square => !square.value);
  }

  private squareGroupRepeatValues({ squares }: SquareGroup): boolean {

    const valuesAlreadySeen = new Set<number>();

    for (let i = 0; i < squares.length; i++) {

      const square = squares[i];
      if (valuesAlreadySeen.has(square.value))
        return true;
      valuesAlreadySeen.add(square.value);
    }

    return false;
  }
}