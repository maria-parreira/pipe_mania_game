import { images } from '../configuration/gameConfiguration';
import { Pipe } from './Pipe'
import { WaterPipe } from './WaterPipe';

/**
 * Represents an individual cell in the grid.
 * Each cell can contain a pipe, be blocked, or contain water.
 */

export class Cell {
    private row: number; 
    private col: number; 
    private pipe: Pipe | null; 
    private blocked: boolean;
    private image: HTMLImageElement = images.bgcell;

    constructor(row: number, col: number, size:number, blocked: boolean) {
        this.row = row;
        this.col = col;
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

    public getRow():number {
        return this.row;
    }

    public getCol():number {
        return this.col;
    }

    public draw(ctx: CanvasRenderingContext2D, x: number, y: number, size:number ): void {
        if (this.image.complete) {
            ctx.drawImage(this.image, x, y, size, size);
          } else {
            this.image.onload = () => {
              ctx.drawImage(this.image, x, y, size, size);
            };
          }
      }

      public clearPipe(){
        this.pipe = null;
      }


}
