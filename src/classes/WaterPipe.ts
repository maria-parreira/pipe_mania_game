import { waterImages } from "../configuration/gameConfiguration";
import { Pipe } from "./Pipe";
import { Grid } from "./Grid";
import { PipeType } from "./PipeType";

export class WaterPipe implements Pipe {
  private images: HTMLImageElement[];
  private type: PipeType;

  constructor(type: PipeType) {
    this.type = type;
    this.images = this.getImagesByType(this.type);
  }

  public draw(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    this.drawFillingPipeWithWater(ctx, x, y, size, this.images)
  }

  private drawFillingPipeWithWater(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, images: HTMLImageElement[] ){
    let fillLevel = 0; // 0: empty, 1: 33%, 2: 66%, 3: 100%

    const draw = () => {
      if (fillLevel < images.length) {
        ctx.drawImage(images[fillLevel], x, y, size, size);
        fillLevel++;
        setTimeout(draw, 500);
      }
    };
  }

  private getImagesByType(type: PipeType): HTMLImageElement[] {
    switch (type) {
      case "horizontal":
        return [waterImages.horizontal33,waterImages.horizontal66,waterImages.horizontal100];
      case "vertical":
        return [waterImages.vertical33,waterImages.vertical66,waterImages.vertical100];
      case "curvedBottomRight":
        return [waterImages.horizontal33,waterImages.horizontal66,waterImages.horizontal100];
      case "curvedBottomLeft":
        return [waterImages.horizontal33,waterImages.horizontal66,waterImages.horizontal100];
      case "curvedTopRight":
        return [waterImages.horizontal33,waterImages.horizontal66,waterImages.horizontal100];
      case "curvedTopLeft":
        return [waterImages.horizontal33,waterImages.horizontal66,waterImages.horizontal100];
      case "cross":
        return [waterImages.horizontal33,waterImages.horizontal66,waterImages.horizontal100];
      default:
        throw new Error("invalid pipe type");
    }
  }

  public getType(): PipeType {
    return this.type;
  }
}
