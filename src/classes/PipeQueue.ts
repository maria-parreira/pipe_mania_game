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
  private queue = Queue<Pipe>();

  constructor(initialSize: number = 5) {
    for (let i = 0; i < initialSize; i++) {
      this.queue.enqueue(this.generatePipe());
    }
  }

  public drawPipeQueue(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const pipeSize = 50;
    const pipeSpacing = 10;

    this.queue.getItems().forEach((pipe, index) => {
      const pipeY = y + index * (pipeSize + pipeSpacing);
      pipe.draw(ctx, x, pipeY, pipeSize);
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
