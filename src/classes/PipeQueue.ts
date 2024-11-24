import { Pipe } from "./Pipe";
import { RegularPipe } from "./RegularPipe";

/**
 * PipeQueue class manages a queue of Regular Pipe objects.
 * It provides methods to add, remove, and retrieve pipes, as well as to draw the queue on a canvas.
 */

const Queue = <T>() => {
  const items: T[] = [];

  return {
    enqueue(item: T) {
      items.push(item);
    },
    dequeue(): T | undefined {
      return items.shift();
    },
    size(): number {
      return items.length;
    },
    isEmpty(): boolean {
      return items.length === 0;
    },
    getItems(): T[] {
      return items;
    },
    peek(): T | undefined {
      return items[0];
    }
  };
};

export class PipeQueue {
  static readonly PIPE_SIZE = 50;
  static readonly PIPE_SPACING = 10;

  private queue = Queue<Pipe>();

  constructor(initialSize: number = 5) {
    for (let i = 0; i < initialSize; i++) {
      this.queue.enqueue(this.generatePipe());
    }
  }

  public drawPipeQueue(ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.queue.getItems().forEach((pipe, index) => {
      const pipeY = y + index * (PipeQueue.PIPE_SIZE + PipeQueue.PIPE_SPACING);
      pipe.draw(ctx, x, pipeY, PipeQueue.PIPE_SPACING);
    });
  }
  public generatePipe(): Pipe {
    return new RegularPipe();
  }

  public getFirstPipe(): Pipe {
    return this.queue.peek()!;
  }

  public removeFirst() {
    this.queue.dequeue();
  }

  public addLast(pipe: Pipe) {
    this.queue.enqueue(pipe);
  }
}
