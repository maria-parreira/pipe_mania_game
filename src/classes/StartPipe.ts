import { startImages } from "../configuration/gameConfiguration";
import { Direction } from "./Direction";
import { Pipe } from "./Pipe";
import { PipeType } from "./PipeType";

export class StartPipe implements Pipe {

    private image: HTMLImageElement;
    private type: PipeType;

    constructor() {
        this.type = this.generateType();
        this.image = this.getStartImage();
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
    
}