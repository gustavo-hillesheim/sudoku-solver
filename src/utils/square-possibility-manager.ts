import { Sudoku } from './../structure/sudoku';
import { Square } from "../structure/square";

export class SquarePossibilityManager {

  calculateSquaresPossibilities({ squares }: Sudoku): void {

    squares.forEach(square => {
      square.possibilities = this.calculatePossibilities(square);
    });
  }

  calculatePossibilities({ value, grid, row, column }: Square): Set<number> {

    if (value) return null;
    
    let possibilities = new Set<number>([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const removePossibility = (square: Square) => possibilities.delete(square.value);

    grid.squares.forEach(removePossibility);
    row.squares.forEach(removePossibility);
    column.squares.forEach(removePossibility);

    return possibilities;
  }

  removeValueFromGroupPossibilities({ value, grid, row, column }: Square): void {
    
    grid.squares.forEach(square => square.removePossibility(value));
    row.squares.forEach(square => square.removePossibility(value));
    column.squares.forEach(square => square.removePossibility(value));
  }
}