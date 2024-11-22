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
    private startPipe: Pipe | null = null;

    constructor(row: number, col: number, size:number, blocked: boolean) {
        this.row = row;
        this.col = col;
        this.size = size;
        this.pipe = null; 
        this.blocked = blocked; 
    }

    public getPipe(): Pipe | null {
        return this.pipe;
    }

    public setPipe(pipe: Pipe): void {
        this.pipe = pipe;
    }

    public isBlocked(): Boolean{
        return this.blocked;
    }

    public setBlocked(blocked: boolean): void {
        this.blocked = blocked; 
    }

    public fillPipeWithWater(ctx: CanvasRenderingContext2D){
        this.pipe?.fillWithWater();
        this.pipe?.drawWaterPipe(ctx, this.row, this.col, this.size);
    }

    public getRow():number {
        return this.row;
    }

    public getCol():number {
        return this.col;
    }


}
