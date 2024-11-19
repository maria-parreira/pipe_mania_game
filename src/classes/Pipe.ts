
export type PipeType = "horizontal" | "curvedUp" | "curvedDown" | "cross" | "vertical"
export type Direction = "top" | "bottom" | "left" | "right"; 


const images = {
  vertical: new Image(),
  horizontal: new Image(),
  curvedUp: new Image(),
  curvedDown: new Image(),
  tJunction: new Image(),
  cross: new Image(),
};

images.vertical.src = 'assets/vertical.png';
images.horizontal.src = 'assets/horizontal.png'
images.curvedUp.src = 'assets/curvedUp.png';
images.curvedDown.src = 'assets/curvedDown.png';
images.tJunction.src = 'assets/t-junction.png';
images.cross.src = 'assets/cross.png';


export class Pipe {
  private type: PipeType;
  private rotation: number; // fixed number
  private connections: Direction[]; // directions for connecting the piece 
  private image: HTMLImageElement; // Stores the corresponding image for the pipe


  constructor(type: PipeType, rotation: number, connections: Direction[]) {
    this.type = type;
    this.rotation = this.getDefaultOrientation(type)
    this.connections = this.getConnectionsByType(type);
    this.image = this.getImageByType(type); // Sets the image based on the type
  }

  private getDefaultOrientation(type: PipeType): number {
    switch (type) {
      case "horizontal":
        return 0; 
      case "curvedUp":
        return 90;
      case "curvedDown":
        return 270;
      case "cross":
        return 270; 
      case "vertical":
        return 90; 
      default:
        throw new Error("invalid pipe type");
    }
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

  private getConnectionsByType(type: PipeType): Direction[] {
    switch (type) {
      case "vertical":
        return ["top", "bottom"]; 
      case "horizontal":
        return ["left", "right"]; 
      case "curvedUp":
        return ["bottom", "left"]; 
      case "curvedDown":
        return ["top", "right"]; 
      case "cross":
        return ["top", "bottom", "left", "right"]; 
      default:
        throw new Error("invalid pipe type");
    }
  }

  connectsTo(direction: Direction): boolean {
    return this.connections.includes(direction);
  }

  draw(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    if (this.image) {
      ctx.drawImage(this.image, x, y, size, size); // Draws the image on the canvas
    }
  }
}


