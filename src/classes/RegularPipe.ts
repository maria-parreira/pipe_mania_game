import { images, startImages, waterImages } from "../configuration/gameConfiguration";
import { Pipe } from "./Pipe";
import { PipeType } from "./PipeType";

/**
 * Represents a Pipe in the game.
 * This class handles the pipe's images, random type selection, and drawing the pipe on the canvas.
 * Includes start pipe, end pipe, and water in the pipe.
 */

export class RegularPipe implements Pipe {
  static readonly CONTEXT_STROKE_STYLE = "blue";
  static readonly LINE_WIDTH = 2;

  private image: HTMLImageElement;
  private type: PipeType;

  constructor() {
    this.type = this.getRandomPipeType();
    this.image = this.getImageByType(this.type);
  }

  private getRandomPipeType(): PipeType {
    const types: PipeType[] = [
        PipeType.Horizontal,
        PipeType.CurvedBottomRight,
        PipeType.CurvedBottomLeft,
        PipeType.Cross,
        PipeType.Vertical,
        PipeType.CurvedTopRight,
        PipeType.CurvedTopLeft
    ];
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
  }

  private getImageByType(type: PipeType): HTMLImageElement {
    switch (type) {
      case PipeType.Horizontal:
        return images.horizontal;
      case PipeType.Vertical:
        return images.vertical;
      case PipeType.CurvedBottomRight:
        return images.curvedBottomRight;
      case PipeType.CurvedBottomLeft:
        return images.curvedBottomLeft;
      case PipeType.CurvedTopRight:
        return images.curvedTopRight;
      case PipeType.CurvedTopLeft:
        return images.curvedTopLeft;
      case PipeType.Cross:
        return images.cross;
      default:
        throw new Error("invalid pipe type");
    }
  }

  public draw(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    const draw = () => {
      ctx.save(); 
      ctx.strokeStyle = RegularPipe.CONTEXT_STROKE_STYLE; 
      ctx.lineWidth = RegularPipe.LINE_WIDTH; 
      ctx.strokeRect(x, y, size, size); 
      ctx.drawImage(this.image, x, y, size, size);
      ctx.restore();
    };

    if (this.image.complete) {
      draw();
    } else {
      this.image.onload = draw;
    }
  }

  public getType(): PipeType {
    return this.type;
  }

}
