import { PipeType } from "./PipeType";

export interface Pipe {
 draw(ctx: CanvasRenderingContext2D, x: number , y: number , cellSize: number):any;
 getType(): PipeType;
}