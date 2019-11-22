import { Line } from "./line";
import { Grid } from "./grid";

export class Square {

  private _value: number;
  public possibilities: Set<number>;
  public grid: Grid;
  public row: Line;
  public column: Line;

  set value(value: number) {
    this._value = value;
    this.possibilities.clear();
    this.grid.squareValueChanged(this);
    this.row.squareValueChanged(this);
    this.column.squareValueChanged(this);
  }

  get value(): number { return this._value; }

  constructor(value: number, public x: number, public y: number) {
    this._value = value;
  }

  calculatePossibilities(): void {

    if (this.value) {
      this.possibilities = new Set<number>();
      return;
    }
    
    let possibilities = new Set<number>([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    const removePossibility = (square: Square) => possibilities.delete(square.value)

    this.grid.forEach(removePossibility);
    this.row.forEach(removePossibility);
    this.column.forEach(removePossibility);

    this.possibilities = possibilities;
  }

  removePossibility(possibilityToRemove: number): void {

    this.possibilities.delete(possibilityToRemove);

    if (this.possibilities.size === 1) {
      const onlyPossibility = this.possibilities[0];
      if (!this.row.has(onlyPossibility) && !this.column.has(onlyPossibility) && !this.grid.has(onlyPossibility)) {
        this.value = onlyPossibility;
      }
    }
  }
}