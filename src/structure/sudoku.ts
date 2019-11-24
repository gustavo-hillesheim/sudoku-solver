import { SquareGroupFinder } from './../utils/square-group-finder';
import { Grid } from "./grid";
import { Line } from "./line";
import { Square } from "./square";
import { SUDOKU_SIZE } from "../constants";

export class Sudoku {

  public grids: Grid[];
  public rows: Line[];
  public columns: Line[];
  public squares: Square[];

  constructor(sudoku: number[] | number[][]) {

    if (Array.isArray(sudoku[0])) {
      sudoku = this.normalizeSudoku(<number[][]>sudoku);
    }

    this.squares = (<number[]>sudoku).map(this.createSquare);

    const squareGroupFinder = new SquareGroupFinder();
    this.grids = squareGroupFinder.findGrids(this);
    this.rows = squareGroupFinder.findRows(this);
    this.columns = squareGroupFinder.findColumns(this);
  }

  private createSquare(value: number, index: number): Square {

    const x = index % SUDOKU_SIZE;
    const y = (index - x) / SUDOKU_SIZE;
    return new Square(value, x, y);
  }

  private normalizeSudoku(sudoku: number[][]): number[] {

    const normalizedSudoku = <number[]>[];
    sudoku.forEach(line => {
      line.forEach(square => normalizedSudoku.push(square));
    });
    return normalizedSudoku;
  }
}