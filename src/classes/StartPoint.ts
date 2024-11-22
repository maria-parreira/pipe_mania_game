import { startImages } from "../configuration/gameConfiguration";

export type StartPointOrientation = "Left" | "Right" | "Up" | "Down";


export class StartPoint{

    private startImage: HTMLImageElement;

    constructor() {
        this.startImage = this.getStartImage();
      }
    
      private getStartImage(): HTMLImageElement {
        const startTypes = Object.keys(startImages) as Array<keyof typeof startImages>;
        const randomIndex = Math.floor(Math.random() * startTypes.length);
        this.startImage = startImages[startTypes[randomIndex]];
        return this.startImage;
      }


      public drawStartPoint(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
        ctx.drawImage(this.startImage, x, y, size, size);
      }
    
      
      public getStartPointDirection(): String {

        if (this.startImage === startImages.startup) {
            return "Up";
        } else if (this.startImage === startImages.startdown) {
            return "Down";
        } else if (this.startImage === startImages.startleft) {
            return "Left";
        } else if (this.startImage === startImages.startright) {
            return "Right";
        } else {
            return "invalid pipe type";
        }
    }

}