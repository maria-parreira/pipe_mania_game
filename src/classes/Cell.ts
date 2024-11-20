// Represents an individual cell in the grid
import { Pipe } from './Pipe'

export class Cell {
    private row: number; // Row of the cell
    private col: number; // Column of the cell
    private size: number;
    private pipe: Pipe | null; // The pipe piece placed in the cell (or null if empty)
    private blocked: boolean; // Indicates if the cell is blocked
    private water: boolean; // Indicates if the cell contains water

    constructor(row: number, col: number, size:number) {
        this.row = row;
        this.col = col;
        this.size = size;
        this.pipe = null; // Initially, the cell has no pipe
        this.blocked = false; // Initially, the cell is not blocked
        this.water = false; // Initially, the cell does not contain water
    }


     public getPipe(): Pipe | null {
        return this.pipe;
    }

    public setPipe(pipe: Pipe): void {
        this.pipe = pipe;
    }


}
