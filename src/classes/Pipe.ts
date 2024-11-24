
import { PipeType } from "./PipeType";

/**
 * Represents a Pipe interface for drawing and retrieving its type.
 */

export interface Pipe {
 draw(ctx: CanvasRenderingContext2D, x: number , y: number , cellSize: number):any;
 getType(): PipeType;
}