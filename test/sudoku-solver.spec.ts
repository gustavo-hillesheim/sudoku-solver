import { Sudoku } from '../src/structure/sudoku';
import { SudokuVerifier } from '../src/solve/sudoku-verifier';
import { SudokuSolver } from '../src/solve/sudoku-solver';
import { SquarePossibilityManager } from '../src/utils/square-possibility-manager';

describe('Sudoku Solver', () => {
  
  const squarePossibilityManager = new SquarePossibilityManager();
  const solver = new SudokuSolver();
  const verifier = new SudokuVerifier();

  it('should solve easy level sudoku', () => {
    
    const easySudoku = [0, 6, 8, 0, 0, 0, 9, 3, 0,
                        0, 4, 2, 0, 0, 0, 6, 0, 0,
                        1, 9, 0, 0, 8, 0, 0, 4, 0,
                        0, 8, 5, 2, 0, 1, 0, 0, 7,
                        7, 0, 0, 8, 9, 0, 0, 0, 0,
                        2, 0, 9, 0, 0, 7, 5, 0, 3,
                        0, 2, 0, 1, 0, 0, 0, 5, 0,
                        8, 5, 0, 0, 4, 0, 7, 6, 0,
                        4, 7, 3, 0, 5, 2, 0, 0, 9];

    const sudoku = new Sudoku(easySudoku);
    squarePossibilityManager.calculateSquaresPossibilities(sudoku);
    const solvedSudoku = solver.solve(sudoku);
    const isSudokuSolved = verifier.isSolved(solvedSudoku);
    expect(isSudokuSolved).toBe(true);
  });

  it('should solve medium level sudoku', () => {

    const mediumSudoku = [0, 1, 0, 0, 0, 0, 4, 3, 0,
                          7, 0, 0, 0, 0, 0, 0, 0, 0,
                          0, 0, 0, 2, 5, 4, 9, 0, 0,
                          1, 7, 0, 0, 4, 0, 2, 0, 6,
                          0, 0, 0, 0, 9, 0, 0, 0, 3,
                          0, 0, 3, 0, 0, 6, 0, 8, 0,
                          0, 0, 1, 4, 7, 0, 0, 6, 0,
                          0, 0, 0, 5, 0, 8, 1, 2, 0,
                          0, 9, 0, 0, 6, 0, 3, 0, 4];
    
    const sudoku = new Sudoku(mediumSudoku);
    squarePossibilityManager.calculateSquaresPossibilities(sudoku);
    const solvedSudoku = solver.solve(sudoku);
    const isSudokuSolved = verifier.isSolved(solvedSudoku);
    expect(isSudokuSolved).toBe(true);
  });

  it('should solve hard level sudoku', () => {

    const hardSudoku = [0, 0, 0, 7, 0, 0, 0, 0, 0, 
                        1, 0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 4, 3, 0, 2, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0, 6,
                        0, 0, 0, 5, 0, 9, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 4, 1, 8,
                        0, 0, 0, 0, 8, 1, 0, 0, 0,
                        0, 0, 2, 0, 0, 0, 0, 5, 0,
                        0, 4, 0, 0, 0, 0, 3, 0, 0];

    const sudoku = new Sudoku(hardSudoku);
    squarePossibilityManager.calculateSquaresPossibilities(sudoku);
    const solvedSudoku = solver.solve(sudoku);
    const isSudokuSolved = verifier.isSolved(solvedSudoku);
    expect(isSudokuSolved).toBe(true);
  });
});