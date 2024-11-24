import { waterImages } from "../configuration/gameConfiguration";
import { Direction } from "./Direction";
import { Pipe } from "./Pipe";
import { PipeType } from "./PipeType";

export class WaterPipe implements Pipe {
  private images: HTMLImageElement[];
  private type: PipeType;
  private currentImage: HTMLImageElement | undefined; // Adicionando 'undefined' como valor inicial
  private direction: Direction;


  constructor(type: PipeType, direction: Direction) {
    this.type = type;
    this.direction = direction;
    this.images = this.getImagesByType(this.type,this.direction);
  }

  public draw(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    debugger;
    if (this.currentImage) {
      ctx.drawImage(this.currentImage, x, y, size, size);
    }
  }

  public async fillPipeWithWater(): Promise<void> {
    debugger;
    let fillLevel = 0; // 0: empty, 1: 33%, 2: 66%, 3: 100%

    // Retorna uma Promise que será resolvida após todas as etapas de preenchimento
    return new Promise((resolve) => {
        const updateWaterLevel = () => {
            if (fillLevel < 3) {
                this.currentImage = this.images[fillLevel];
                fillLevel++;
                setTimeout(updateWaterLevel, 500); // Preencher o próximo nível após 1 segundo
            } else {
                resolve(); // Resolve a Promise quando o preenchimento estiver completo
            }
        };

        updateWaterLevel(); // Iniciar o processo
    });
}



private getImagesByType(type: PipeType, direction: Direction): HTMLImageElement[] {
  debugger;
  if (type === "horizontal" && direction === "left") {
    return [waterImages.horizontal33e, waterImages.horizontal66e, waterImages.horizontal100];
  } else if (type === "horizontal" && direction === "right") {
    return [waterImages.horizontal33d, waterImages.horizontal66d, waterImages.horizontal100];
  } else if (type === "vertical" && direction === "up") {
    return [waterImages.vertical33c, waterImages.vertical66c, waterImages.vertical100];
  } else if (type === "vertical" && direction === "down") {
    return [waterImages.vertical33b, waterImages.vertical66b, waterImages.vertical100];
  } else if (type === "curvedBottomRight" && direction === "left") {
    return [waterImages.curvedTopBR33d, waterImages.curvedTopBR66d, waterImages.curvedTopBR100];
  } else if (type === "curvedBottomRight" && direction === "up") {
    return [waterImages.curvedTopBR33c, waterImages.curvedTopBR66c, waterImages.curvedTopBR100];
  }else if (type === "curvedBottomLeft"  && direction === "right") {
    return [waterImages.curvedTopBL33e, waterImages.curvedTopBL66e, waterImages.curvedTopBL100];
  } else if (type === "curvedBottomLeft"  && direction === "up") {
    return [waterImages.curvedTopBL33c, waterImages.curvedTopBL66c, waterImages.curvedTopBL100];
  }else if (type === "curvedTopLeft" && direction === "right") {
    return [waterImages.curvedBottomTL33e, waterImages.curvedBottomTL66e, waterImages.curvedBottomTL100];
  }else if (type === "curvedTopLeft" && direction === "down") {
    return [waterImages.curvedBottomTL33b, waterImages.curvedBottomTL66b, waterImages.curvedBottomTL100];
  } else if (type === "curvedTopRight" && direction === "left") {
    return [waterImages.curvedBottomTR33d, waterImages.curvedBottomTR66d, waterImages.curvedBottomTR100];
  } else if (type === "curvedTopRight" && direction === "down") {
    return [waterImages.curvedBottomTR33b, waterImages.curvedBottomTR66b, waterImages.curvedBottomTR100];
  } else if (type === "cross" && direction === "up" ) {
    return [waterImages.cross33c, waterImages.cross66c, waterImages.cross100V];
  } else if (type === "cross" && direction === "down") {
    return [waterImages.cross33b, waterImages.cross66b, waterImages.cross100V];
  } else if (type === "cross" && direction === "left") {
    return [waterImages.cross33e, waterImages.cross66e, waterImages.cross100H];
  }else if (type === "cross" && direction === "right") {
    return [waterImages.cross33d, waterImages.cross66d, waterImages.cross100H];
  }else {
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
