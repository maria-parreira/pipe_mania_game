import { waterImages } from "../configuration/gameConfiguration";
import { Direction } from "./Direction";
import { Pipe } from "./Pipe";
import { PipeType } from "./PipeType";

/**
 * Represents a water pipe in the game.
 * The WaterPipe class implements the Pipe interface and handles the drawing and filling of the pipe with water.
 */

export class WaterPipe implements Pipe {
  private images: HTMLImageElement[];
  private type: PipeType;
  private currentImage: HTMLImageElement | undefined;
  private direction: Direction;

  constructor(type: PipeType, direction: Direction) {
    this.type = type;
    this.direction = direction;
    this.images = this.getImagesByType(this.type, this.direction);
  }

  public draw(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    if (this.currentImage) {
      ctx.drawImage(this.currentImage, x, y, size, size);
    }
  }

  public async fillPipeWithWater(onFilledCallback?: () => void): Promise<void> {
    let fillLevel = 0;

    return new Promise((resolve) => {
      const updateWaterLevel = () => {
        if (fillLevel < 3) {
          this.currentImage = this.images[fillLevel];
          fillLevel++;
          setTimeout(updateWaterLevel, 500);
        } else {
          if (onFilledCallback) {
            onFilledCallback();
          }
          resolve();
        }
      };

      updateWaterLevel();
    });
  }

  private getImagesByType(type: PipeType, direction: Direction): HTMLImageElement[] {
    if (type === "horizontal" && direction === "right") {
      return [waterImages.horizontal33e, waterImages.horizontal66e, waterImages.horizontal100];
    } else if (type === "horizontal" && direction === "left") {
      return [waterImages.horizontal33d, waterImages.horizontal66d, waterImages.horizontal100];
    } else if (type === "vertical" && direction === "down") {
      return [waterImages.vertical33c, waterImages.vertical66c, waterImages.vertical100];
    } else if (type === "vertical" && direction === "up") {
      return [waterImages.vertical33b, waterImages.vertical66b, waterImages.vertical100];
    } else if (type === "curvedBottomRight" && direction === "left") {
      return [waterImages.curvedTopBR33d, waterImages.curvedTopBR66d, waterImages.curvedTopBR100];
    } else if (type === "curvedBottomRight" && direction === "up") {
      return [waterImages.curvedTopBR33b, waterImages.curvedTopBR66b, waterImages.curvedTopBR100];
    } else if (type === "curvedBottomLeft" && direction === "right") {
      return [waterImages.curvedTopBL33e, waterImages.curvedTopBL66e, waterImages.curvedTopBL100];
    } else if (type === "curvedBottomLeft" && direction === "up") {
      return [waterImages.curvedTopBL33b, waterImages.curvedTopBL66b, waterImages.curvedTopBL100];
    } else if (type === "curvedTopLeft" && direction === "right") {
      return [waterImages.curvedBottomTL33e, waterImages.curvedBottomTL66e, waterImages.curvedBottomTL100];
    } else if (type === "curvedTopLeft" && direction === "down") {
      return [waterImages.curvedBottomTL33c, waterImages.curvedBottomTL66c, waterImages.curvedBottomTL100];
    } else if (type === "curvedTopRight" && direction === "left") {
      return [waterImages.curvedBottomTR33d, waterImages.curvedBottomTR66c, waterImages.curvedBottomTR100];
    } else if (type === "curvedTopRight" && direction === "down") {
      return [waterImages.curvedBottomTR33c, waterImages.curvedBottomTR66b, waterImages.curvedBottomTR100];
    } else if (type === "cross" && direction === "up") {
      return [waterImages.cross33c, waterImages.cross66c, waterImages.cross100V];
    } else if (type === "cross" && direction === "down") {
      return [waterImages.cross33b, waterImages.cross66b, waterImages.cross100V];
    } else if (type === "cross" && direction === "left") {
      return [waterImages.cross33d, waterImages.cross66d, waterImages.cross100H];
    } else if (type === "cross" && direction === "right") {
      return [waterImages.cross33e, waterImages.cross66e, waterImages.cross100H];
    } else {
      throw new Error("invalid pipe type");
    }
  }

  public getType(): PipeType {
    return this.type;
  }

  public getDirection(): Direction {
    return this.direction;
  }
}