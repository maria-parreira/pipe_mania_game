export type PipeType = "horizontal" | "curvedUp" | "curvedDown" | "cross" | "vertical"


const images = {
  vertical: new Image(),
  horizontal: new Image(),
  curvedUp: new Image(),
  curvedDown: new Image(),
  tJunction: new Image(),
  cross: new Image(),
};

images.vertical.src = 'src/assets/vertical.png';
images.horizontal.src = 'src/assets/horizontal.png'
images.curvedUp.src = 'src/assets/curvedUp.png';
images.curvedDown.src = 'src/assets/curvedDown.png';
images.cross.src = 'src/assets/cross.png';


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
}


