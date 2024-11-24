import { waterImages } from "../configuration/gameConfiguration";
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



  private getImagesByType(type: PipeType): HTMLImageElement[] {
    switch (type) {
      case "horizontal":
        return [waterImages.horizontal33e, waterImages.horizontal66e, waterImages.horizontal100];
      case "vertical":
        return [waterImages.vertical33c, waterImages.vertical66c, waterImages.vertical100];
      case "curvedBottomRight":
        return [waterImages.curvedTopBR33b, waterImages.curvedTopBR66b, waterImages.curvedTopBR100];
      case "curvedBottomLeft":
        return [waterImages.curvedTopBL33b, waterImages.curvedTopBL66b, waterImages.curvedTopBL100];
      case "curvedTopLeft":
        return [waterImages.curvedBottomTL33b, waterImages.curvedBottomTL66b, waterImages.curvedBottomTL100];
      case "curvedTopRight":
        return [waterImages.curvedBottomTR33c, waterImages.curvedBottomTR66, waterImages.curvedBottomTR100];
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
