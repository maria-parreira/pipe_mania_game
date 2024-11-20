
import { Pipe } from './Pipe'

/**
 * Represents an individual cell in the grid.
 * Each cell can contain a pipe, be blocked, or contain water.
 */


export class Cell {
    private row: number; 
    private col: number; 
    private size: number;
    private pipe: Pipe | null; 
    private blocked: boolean; 
    private water: boolean; 

    constructor(row: number, col: number, size:number) {
        this.row = row;
        this.col = col;
        this.size = size;
        this.pipe = null; 
        this.blocked = false; 
        this.water = false; 
    }

    public getPipe(): Pipe | null {
        return this.pipe;
    }

    public setPipe(pipe: Pipe): void {
        this.pipe = pipe;
    }
}
