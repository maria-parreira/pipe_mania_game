import { images, startImages } from "../configuration/gameConfiguration";

export type PipeType = "horizontal" | "curvedUp" | "curvedDown" | "cross" | "vertical"

/**
 * Represents a Pipe in the game.
 * This class handles the pipe's images, random type selection,
 * and drawing the pipe on the canvas.
 * Include start pipe and end pipe.
 */

export class Pipe {

  private image: HTMLImageElement;
  private startImage: HTMLImageElement;

  constructor() {
    const type = this.getRandomPipeType();
    this.image = this.getImageByType(type);
    this.startImage = this.getStartImage();
  }

  private getRandomPipeType(): PipeType {
    const types: PipeType[] = ["horizontal", "curvedUp", "curvedDown", "cross", "vertical"];
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
  }

  private getImageByType(type: PipeType): HTMLImageElement {
    switch (type) {
      case "horizontal":
        return images.horizontal;
      case "vertical":
        return images.vertical;
      case "curvedUp":
        return images.curvedUp;
      case "curvedDown":
        return images.curvedDown;
      case "cross":
        return images.cross;
      default:
        throw new Error("invalid pipe type");
    }
  }

  public drawPipe(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    if (this.image.complete) {
        ctx.drawImage(this.image, x, y, size, size);
    } else {
        this.image.onload = () => {
            ctx.drawImage(this.image, x, y, size, size);
        };
    }
  }

  public drawStartPipe(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    ctx.drawImage(this.startImage, x, y, size, size);
  }

  private getStartImage(): HTMLImageElement {
    const startTypes = Object.keys(startImages) as Array<keyof typeof startImages>;
    const randomIndex = Math.floor(Math.random() * startTypes.length);
    return startImages[startTypes[randomIndex]];
  }

}


