// Represents an individual cell in the grid
import { Pipe } from './Pipe'

export class Cell {
    row: number; // Row of the cell
    col: number; // Column of the cell
    pipe: Pipe | null; // The pipe piece placed in the cell (or null if empty)
    blocked: boolean; // Indicates if the cell is blocked
    water: boolean; // Indicates if the cell contains water

    constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
        this.pipe = null; // Initially, the cell has no pipe
        this.blocked = false; // Initially, the cell is not blocked
        this.water = false; // Initially, the cell does not contain water
    }

    addPipe(pipe: Pipe): void {
        this.pipe = pipe; // Adds a pipe to the cell
    }

    removePipe(): void {
        this.pipe = null; // Removes the pipe from the cell
    }

    isBlocked(): boolean {
        return this.blocked; // Returns if the cell is blocked
    }
}