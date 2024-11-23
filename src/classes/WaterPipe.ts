﻿import { waterImages } from "../configuration/gameConfiguration";
import { Pipe } from "./Pipe";
import { PipeType } from "./PipeType";

export class WaterPipe implements Pipe {
  private images: HTMLImageElement[];
  private type: PipeType;
  private currentImage: HTMLImageElement | undefined; // Adicionando 'undefined' como valor inicial


  constructor(type: PipeType) {
    this.type = type;
    this.images = this.getImagesByType(this.type);
  }

  public draw(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    debugger;
    if (this.currentImage) {
      ctx.drawImage(this.currentImage, x, y, size, size);
    }
  }

  public fillPipeWithWater() {
    debugger;
    let fillLevel = 0; // 0: empty, 1: 33%, 2: 66%, 3: 100%
    
    const updateWaterLevel = () => {
      if (fillLevel < 3) { 
        this.currentImage = this.images[fillLevel];
        console.log("fill-level = " + fillLevel);
        console.log("this.image = " + this.currentImage);
        console.log("this.type = " + this.type);

        fillLevel++;
        setTimeout(updateWaterLevel, 1000); 
      }
    };

    updateWaterLevel(); // Iniciar o processo
  }


  private getImagesByType(type: PipeType): HTMLImageElement[] {
    switch (type) {
      case "horizontal":
        return [waterImages.horizontal33e, waterImages.horizontal66e, waterImages.horizontal100];
      case "vertical":
        return [waterImages.vertical33c, waterImages.vertical66c, waterImages.vertical100];
      case "curvedBottomRight":
        return [waterImages.curvedBottomTR33c, waterImages.curvedBottomTR33d, waterImages.curvedBottomTR66c, waterImages.curvedBottomTR66d, waterImages.curvedBottomTR100];
      case "curvedBottomLeft":
        return [waterImages.curvedBottomTL33c, waterImages.curvedBottomTL66e, waterImages.curvedBottomTL100, waterImages.curvedBottomTL66c, waterImages.curvedBottomTL33e];
      case "curvedTopRight":
        return [waterImages.curvedTopBR33b, waterImages.curvedTopBR66d, waterImages.curvedTopBR100, waterImages.curvedTopBR66b];
      case "curvedTopLeft":
        return [waterImages.curvedTopBL33b, waterImages.curvedTopBL66b, waterImages.curvedTopBL100];
      case "cross":
        return [waterImages.cross33d, waterImages.cross66e, waterImages.cross100H, waterImages.cross100V];
      default:
        throw new Error("invalid pipe type");
    }
  }


  public getType(): PipeType {
    return this.type;
  }
}