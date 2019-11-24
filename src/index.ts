import { SudokuPrinter } from './sudoku-printer';
import { SquarePossibilityManager } from './utils/square-possibility-manager';
import { Sudoku } from "./structure/sudoku";
import { SudokuSolver } from "./sudoku-solver";

const sudokuHard = [0, 0, 0, 7, 0, 0, 0, 0, 0, 
                    1, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 4, 3, 0, 2, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 6,
                    0, 0, 0, 5, 0, 9, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 4, 1, 8,
                    0, 0, 0, 0, 8, 1, 0, 0, 0,
                    0, 0, 2, 0, 0, 0, 0, 5, 0,
                    0, 4, 0, 0, 0, 0, 3, 0, 0];

const sudokuMedium = [0, 1, 0, 0, 0, 0, 4, 3, 0,
                      7, 0, 0, 0, 0, 0, 0, 0, 0,
                      0, 0, 0, 2, 5, 4, 9, 0, 0,
                      1, 7, 0, 0, 4, 0, 2, 0, 6,
                      0, 0, 0, 0, 9, 0, 0, 0, 3,
                      0, 0, 3, 0, 0, 6, 0, 8, 0,
                      0, 0, 1, 4, 7, 0, 0, 6, 0,
                      0, 0, 0, 5, 0, 8, 1, 2, 0,
                      0, 9, 0, 0, 6, 0, 3, 0, 4];

const sudokuEasy = [0, 6, 8, 0, 0, 0, 9, 3, 0,
                    0, 4, 2, 0, 0, 0, 6, 0, 0,
                    1, 9, 0, 0, 8, 0, 0, 4, 0,
                    0, 8, 5, 2, 0, 1, 0, 0, 7,
                    7, 0, 0, 8, 9, 0, 0, 0, 0,
                    2, 0, 9, 0, 0, 7, 5, 0, 3,
                    0, 2, 0, 1, 0, 0, 0, 5, 0,
                    8, 5, 0, 0, 4, 0, 7, 6, 0,
                    4, 7, 3, 0, 5, 2, 0, 0, 9];
                    
const squarePossibilityManager = new SquarePossibilityManager();
const solver = new SudokuSolver();
const printer = new SudokuPrinter();

let sudoku = new Sudoku(sudokuEasy);
                    
squarePossibilityManager.calculateSquaresPossibilities(sudoku);


console.log('solving sudoku:');
printer.print(sudoku);

sudoku = solver.solve(sudoku);

console.log('solved sudoku:');
printer.print(sudoku);