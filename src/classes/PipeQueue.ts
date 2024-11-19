import { Pipe, PipeType } from "./Pipe";
import { Direction } from "./Pipe";

export class PipeQueue {
  private queue: Pipe[]; // stores the available pipes
  private pipeTypes: PipeType[]; 
  private maxSize: number; // I want it to be unlimited

  constructor(initialSize: number = 5, maxSize: number = Infinity) {
    this.pipeTypes = ["vertical", "curvedDown", "curvedUp", "cross", "horizontal"];
    this.queue = [];
    this.maxSize = maxSize;
    for (let i = 0; i < initialSize; i++) {
      this.queue.push(this.generatePipe());
    }
  }

  private generatePipe(): Pipe {
    const randomType = this.pipeTypes[
      Math.floor(Math.random() * this.pipeTypes.length)
    ];
    const rotation = 0; // Set an appropriate value for rotation
    const connections: Direction[] = []; // Set appropriate connections
    return new Pipe(randomType, rotation, connections);
  }

  public getNextPipe(): Pipe {
    const nextPipe = this.queue.shift();
    if (this.queue.length < this.maxSize) {
      this.queue.push(this.generatePipe());
    }
    return nextPipe!;
  }

  public replacePipe(index: number, newPipe: Pipe) {
    if (index >= 0 && index < this.queue.length) {
      this.queue[index] = newPipe;
    }
  }

  public drawQueue(ctx: CanvasRenderingContext2D, x: number, y: number) {
    // Visually display the queue on the canvas
  }
}
