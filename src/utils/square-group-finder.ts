import { Line } from './../structure/line';
import { Sudoku } from './../structure/sudoku';
import { Grid } from './../structure/grid';
import { SUDOKU_SIZE, GRID_SIZE } from './../constants';
import { Square } from '../structure/square';
export class SquareGroupFinder {

  findGrids({ squares }: Sudoku): Grid[] {

    const grids = <Grid[]>[];

    for (let y = 0; y < SUDOKU_SIZE; y += GRID_SIZE) {
      for (let x = 0; x < SUDOKU_SIZE; x += GRID_SIZE) {

        const grid = new Grid(this.getGrid(squares, x, y));
        grid.squares.forEach(square => square.grid = grid);
        grids.push(grid);
      }
    }
    
    return grids;
  }

  private getGrid(sudokuSquares: Square[], startX: number, startY: number): Square[] {

    const grid = <Square[]>[];

    for (let y = startY; y < startY + GRID_SIZE; y++) {
      for (let x = startX; x < startX + GRID_SIZE; x++) {

        grid.push(sudokuSquares[y * SUDOKU_SIZE + x]);
      }
    }
    return grid;
  }

  findRows({ squares }: Sudoku): Line[] {

    const rows = <Line[]>[];

    for (let y = 0; y < SUDOKU_SIZE; y++) {
      
      const rowSquares = squares.slice(y * SUDOKU_SIZE, (y + 1) * SUDOKU_SIZE);
      const row = new Line(rowSquares);
      row.squares.forEach(square => square.row = row);
      rows.push(row);
    }

    return rows;
  }

  findColumns({ squares }: Sudoku): Line[] {

    const columns = <Line[]>[];

    for (let x = 0; x < SUDOKU_SIZE; x++) {

      const columnSquares = <Square[]>[];
      for (let y = 0; y < SUDOKU_SIZE; y++) {

        columnSquares.push(squares[y * SUDOKU_SIZE + x]);
      }
      const column = new Line(columnSquares);
      column.squares.forEach(square => square.column = column);
      columns.push(column);
    }

    return columns;
  }
}