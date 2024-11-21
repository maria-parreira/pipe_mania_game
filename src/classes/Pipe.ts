import { images, startImages, waterImages } from "../configuration/gameConfiguration";

export type PipeType = "horizontal" | "curvedBottomRight" | "curvedBottomDown" | "cross" | "vertical" | "curvedTopRight" | "curvedTopLeft" ;

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
    const types: PipeType[] = ["horizontal", "curvedBottomRight", "curvedBottomDown", "cross", "vertical", "curvedTopRight", "curvedTopLeft"];
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
  }

  private getImageByType(type: PipeType): HTMLImageElement {
    switch (type) {
      case "horizontal":
        return images.horizontal;
      case "vertical":
        return images.vertical;
      case "curvedBottomRight":
        return images.curvedBottomRight;
      case "curvedBottomDown":
        return images.curvedBottomDown;
      case "curvedTopRight":
        return images.curvedTopRight;
      case "curvedTopLeft":
        return images.curvedTopLeft;
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
    const draw = () => {
      ctx.save(); // Salva o estado atual do contexto
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Cor da sombra
      ctx.shadowBlur = 10; // Desfoque da sombra
      ctx.shadowOffsetX = 5; // Deslocamento da sombra no eixo X
      ctx.shadowOffsetY = 5; // Deslocamento da sombra no eixo Y
      ctx.drawImage(this.image, x, y, size, size);
      ctx.restore(); // Restaura o estado do contexto
    };

    if (this.image.complete) {
      draw();
    } else {
      this.image.onload = draw;
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
      case "curvedBottomRight":
        waterImage = waterImages.watercurvedup;
        break;
      case "curvedBottomDown":
        waterImage = waterImages.watercurvedup;
        break;
      case "curvedTopRight":
        waterImage = waterImages.watercurvedup;
        break;
      case "curvedTopLeft":
        waterImage = waterImages.watercurvedup;
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
      case "curvedBottomRight":
        return ["north", "east", "west"]; // Curvado para cima
      case "curvedBottomDown":
        return ["south", "east", "west"]; // Curvado para baixo
      case "cross":
        //verificar a peça anterior pra perceber o caminho (se a peça anterior estiver em cima ele so pode ir pra baixa, nao pode curvar 90º)
        return ["north", "south", "east", "west"]; // Cross conecta em todas as direções
      default:
        return []; // Tipo de tubo inválido
    }
  }


  public getType(): PipeType {
    return this.type;
  }
}
