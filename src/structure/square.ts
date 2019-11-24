import { Line } from "./line";
import { Grid } from "./grid";

export class Square {

  public possibilities: Set<number>;
  public grid: Grid;
  public row: Line;
  public column: Line;

  set value(value: number) {
    this._value = value || 0;
    if (value) this.possibilities = null;
  }

  get value(): number { return this._value || 0; }

  constructor(private _value: number, public x: number, public y: number) {}

  removePossibility(possibilityToRemove: number): void {
    if (this.possibilities) {
      this.possibilities.delete(possibilityToRemove);
    }
  }
}