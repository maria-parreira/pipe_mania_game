import { images, startImages } from "../configuration/gameConfiguration";

export type PipeType = "horizontal" | "curvedUp" | "curvedDown" | "cross" | "vertical"

export class Pipe {

  private image: HTMLImageElement; // Stores the corresponding image for the pipe
  private startImage: HTMLImageElement; // Stores the initial image for the pipe

  constructor() {
    const type = this.getRandomPipeType(); // Escolhendo um tipo aleatório
    this.image = this.getImageByType(type); // Sets the image based on the type
    this.startImage = this.getStartImage(); // Sets the initial image for the pipe
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

  public drawPipe(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    if (this.image.complete) {
        ctx.drawImage(this.image, x, y, size, size);
    } else {
        this.image.onload = () => {
            ctx.drawImage(this.image, x, y, size, size);
        };
    }
  }

  // desenha a pipe start
  public drawStartPipe(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    ctx.drawImage(this.startImage, x, y, size, size); // Uses the stored initial image
  }

  // Novo método para obter a imagem do tubo inicial
  private getStartImage(): HTMLImageElement {
    const startTypes = Object.keys(startImages) as Array<keyof typeof startImages>;
    const randomIndex = Math.floor(Math.random() * startTypes.length);
    return startImages[startTypes[randomIndex]]; // Retorna uma imagem aleatória para o tubo inicial
  }

}


