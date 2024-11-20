import { images, startImages } from "./GameConfiguration";

export type PipeType = "horizontal" | "curvedUp" | "curvedDown" | "cross" | "vertical"

export class Pipe {

  private image: HTMLImageElement; // Stores the corresponding image for the pipe

  constructor() {
    const type = this.getRandomPipeType(); // Escolhendo um tipo aleatório
    this.image = this.getImageByType(type); // Sets the image based on the type
  }

  private getRandomPipeType(): PipeType {
    const types: PipeType[] = ["horizontal", "curvedUp", "curvedDown", "cross", "vertical"];
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex]; // Retorna um tipo aleatório
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

  drawPipe(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    if (this.image.complete) {
        ctx.drawImage(this.image, x, y, size, size);
    } else {
        this.image.onload = () => {
            ctx.drawImage(this.image, x, y, size, size);
        };
    }
  }

  // desenha a pipe start
  drawStartPipe(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    const startTypes = Object.keys(startImages) as Array<keyof typeof startImages>;
    const randomIndex = Math.floor(Math.random() * startTypes.length);
    const randomStartImage = startImages[startTypes[randomIndex]];
    
    ctx.drawImage(randomStartImage, x, y, size, size); 
  }

}


