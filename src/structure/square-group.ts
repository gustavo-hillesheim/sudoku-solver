import { Square } from "./square";

export class SquareGroup {

  constructor(protected squares: Square[]) {}

  squareValueChanged(changedSquare: Square): void {

    if (this.squares) {

      this.squares
        .filter(square => square !== changedSquare)
        .forEach(square => square.removePossibility(changedSquare.value));
    }
  }

  has(value: number): boolean {
    return this.squares.findIndex(square => square.value === value) > -1;
  }

  forEach(fn: (square: Square) => void) {
    this.squares.forEach(fn);
  }
}