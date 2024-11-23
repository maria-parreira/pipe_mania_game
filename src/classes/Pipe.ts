import { images, startImages, waterImages } from "../configuration/gameConfiguration";

export type PipeType = "horizontal" | "curvedBottomRight" | "curvedBottomLeft" | "cross" | "vertical" | "curvedTopRight" | "curvedTopLeft" ;


/**
 * Represents a Pipe in the game.
 * This class handles the pipe's images, random type selection,
 * and drawing the pipe on the canvas.
 * Includes start pipe, end pipe, and water in the pipe.
 */

export class Pipe {
  private image: HTMLImageElement;
  private type: PipeType;
  private containsWater: boolean;

  constructor() {
    this.type = this.getRandomPipeType();
    this.image = this.getImageByType(this.type);
    this.containsWater = false;
  }

  private getRandomPipeType(): PipeType {
    const types: PipeType[] = ["horizontal", "curvedBottomRight", "curvedBottomLeft", "cross", "vertical", "curvedTopRight", "curvedTopLeft"];
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
  }

  private getImageByType(type: PipeType): HTMLImageElement {
    switch (type) {
      case "horizontal":
        return images.horizontal;
      case "vertical":
        return images.vertical;
      case "curvedBottomRight":
        return images.curvedBottomRight;
      case "curvedBottomLeft":
        return images.curvedBottomLeft;
      case "curvedTopRight":
        return images.curvedTopRight;
      case "curvedTopLeft":
        return images.curvedTopLeft;
      case "cross":
        return images.cross;
      default:
        throw new Error("invalid pipe type");
    }
  }

  public draw(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    const draw = () => {
      ctx.save(); 
      ctx.strokeStyle = 'blue'; 
      ctx.lineWidth = 2; 
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


  public getPossibleConnectionsToAdjacentPipes(): string[] {
    debugger;
    switch (this.type) {
      case "horizontal":
        return ["left", "right"]; 
      case "vertical":
        return ["top", "bottom"]; 
      case "curvedBottomRight":
        return ["bottom", "right"]; 
      case "curvedBottomLeft":
        return ["bottom", "left"]; 
      case "cross":
        return ["bottom", "top", "right", "left"]; 
      default:
        return []; 
    }
  }

  public getContainsWater(): boolean {
    return true;
  }

  public getType(): PipeType {
    return this.type;
  }

}
