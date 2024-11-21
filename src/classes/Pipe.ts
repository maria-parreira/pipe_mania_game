import { images, startImages, waterImages } from "../configuration/gameConfiguration";

export type PipeType = "horizontal" | "curvedUp" | "curvedDown" | "cross" | "vertical";

/**
 * Represents a Pipe in the game.
 * This class handles the pipe's images, random type selection,
 * and drawing the pipe on the canvas.
 * Includes start pipe, end pipe, and water in the pipe.
 */
export class Pipe {
  private image: HTMLImageElement;
  private startImage: HTMLImageElement;
  private type: PipeType;

  constructor() {
    this.type = this.getRandomPipeType();
    this.image = this.getImageByType(this.type);
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

  private getStartImage(): HTMLImageElement {
    const startTypes = Object.keys(startImages) as Array<keyof typeof startImages>;
    const randomIndex = Math.floor(Math.random() * startTypes.length);
    return startImages[startTypes[randomIndex]];
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

  public drawEndPipe(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    ctx.drawImage(images.end, x, y, size, size);
  }

  // Método para desenhar o tubo com água
  public drawPipeWithWater(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    let waterImage: HTMLImageElement;

    switch (this.type) {
      case "horizontal":
        waterImage = waterImages.waterhorizontal;
        break;
      case "vertical":
        waterImage = waterImages.watervertical;
        break;
      case "curvedUp":
        waterImage = waterImages.watercurvedup;
        break;
      case "curvedDown":
        waterImage = waterImages.watercurveddown;
        break;
      case "cross":
        waterImage = waterImages.watercrosshorizontal;
        break;
      default:
        throw new Error("invalid pipe type");
    }

    if (waterImage.complete) {
      ctx.drawImage(waterImage, x, y, size, size);
    } else {
      waterImage.onload = () => {
        ctx.drawImage(waterImage, x, y, size, size);
      };
    }
  }


  public getPossibleConnectionsToAdjacentPipes(): string[] {
    switch (this.type) {
      case "horizontal":
        return ["east", "west"]; // Conecta-se à direita e à esquerda
      case "vertical":
        return ["north", "south"]; // Conecta-se para cima e para baixo
      case "curvedUp":
        return ["north", "east", "west"]; // Curvado para cima
      case "curvedDown":
        return ["south", "east", "west"]; // Curvado para baixo
      case "cross":
        return ["north", "south", "east", "west"]; // Cross conecta em todas as direções
      default:
        return []; // Tipo de tubo inválido
    }
  }


  public getType(): PipeType {
    return this.type;
  }
}
