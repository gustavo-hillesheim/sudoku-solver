import {  OnlyPossibilitySolvingAlgorithm } from './solving-algorithm';
import { Sudoku } from "../structure/sudoku";

export class SudokuSolver {

  solve(sudoku: Sudoku): Sudoku {

    const solvingAlgorithms = [
      new OnlyPossibilitySolvingAlgorithm()
    ];

    solvingAlgorithms.forEach(sa => sudoku = sa.solve(sudoku));
    return sudoku;
  }
}