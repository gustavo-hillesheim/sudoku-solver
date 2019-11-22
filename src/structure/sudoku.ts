import { Grid } from "./grid";
import { Line } from "./line";
import { Square } from "./square";
import { SUDOKU_SIZE, GRID_SIZE } from "../constants";

export class Sudoku {

  public grids: Grid[];
  public rows: Line[];
  public columns: Line[];
  public squares: Square[];

  constructor(sudoku: number[] | number[][]) {

    if (Array.isArray(sudoku[0])) {
      sudoku = this.normalizeSudoku(<number[][]>sudoku);
    }

    const sudokuSquares = (<number[]>sudoku).map(this.createSquare);

    this.squares = sudokuSquares;
    this.findGrids();
    this.findRows();
    this.findColumns();

    sudokuSquares.forEach(square => square.calculatePossibilities());
  }

  private createSquare(value: number, index: number): Square {

    const x = index % SUDOKU_SIZE;
    const y = (index - x) / SUDOKU_SIZE;
    return new Square(value, x, y);
  }

  private findGrids(): void {

    const grids = <Grid[]>[];

    for (let y = 0; y < SUDOKU_SIZE; y += GRID_SIZE) {
      for (let x = 0; x < SUDOKU_SIZE; x += GRID_SIZE) {

        const grid = new Grid(this.getGrid(this.squares, x, y));
        grid.forEach(square => square.grid = grid);
        grids.push(grid);
      }
    }
    
    this.grids = grids;
  }

  private getGrid(sudoku: Square[], startX: number, startY: number): Square[] {

    const grid = <Square[]>[];

    for (let y = startY; y < startY + GRID_SIZE; y++) {
      for (let x = startX; x < startX + GRID_SIZE; x++) {

        grid.push(sudoku[y * SUDOKU_SIZE + x]);
      }
    }
    return grid;
  }

  private findRows(): void {

    const rows = <Line[]>[];

    for (let y = 0; y < SUDOKU_SIZE; y++) {
      
      const rowSquares = this.squares.slice(y * SUDOKU_SIZE, (y + 1) * SUDOKU_SIZE);
      const row = new Line(rowSquares);
      row.forEach(square => square.row = row);
      rows.push(row);
    }

    this.rows = rows;
  }

  private findColumns(): void {

    const columns = <Line[]>[];

    for (let x = 0; x < SUDOKU_SIZE; x++) {

      const columnSquares = <Square[]>[];
      for (let y = 0; y < SUDOKU_SIZE; y++) {

        columnSquares.push(this.squares[y * SUDOKU_SIZE + x]);
      }
      const column = new Line(columnSquares);
      column.forEach(square => square.column = column);
      columns.push(column);
    }

    this.columns = columns;
  }

  private normalizeSudoku(sudoku: number[][]): number[] {

    const normalizedSudoku = <number[]>[];
    sudoku.forEach(line => {
      line.forEach(square => normalizedSudoku.push(square));
    });
    return normalizedSudoku;
  }
}