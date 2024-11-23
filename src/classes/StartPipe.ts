import { startImages } from "../configuration/gameConfiguration";
import { Direction } from "./Direction";
import { Pipe } from "./Pipe";
import { PipeType } from "./PipeType";

export class StartPipe implements Pipe {

    private image: HTMLImageElement;
    private type: PipeType;
    //private direction: Direction;

    constructor() {
        this.type = this.generateType();
        this.image = this.getStartImage();
        //this.direction = getStartPointDirection();
    }
    
    public draw(ctx: CanvasRenderingContext2D, x: number, y: number, cellSize: number) {
        ctx.drawImage(this.image, x, y, cellSize, cellSize);
    }

    public getType(): PipeType {
        return this.type;
    }

    private generateType(): PipeType {
        const possibleStartTypes: PipeType[] = [PipeType.StartUp, PipeType.StartDown, PipeType.StartLeft, PipeType.StartRight];
        const randomIndex = Math.floor(Math.random() * possibleStartTypes.length);
        return possibleStartTypes[randomIndex];
    }
    
    private getStartImage(): HTMLImageElement {
        return startImages[this.type];
    }
      
    public getStartPointDirection(): String {
        if (this.type === PipeType.StartLeft) {
            return Direction.Left;
        } else if (this.type === PipeType.StartRight) {
            return Direction.Right
        } else if (this.type === PipeType.StartUp) {
            return Direction.Up;
        } else if (this.type === PipeType.StartDown) {
            return Direction.Down;
        } else {
            return "invalid pipe type";
        }
    }
}