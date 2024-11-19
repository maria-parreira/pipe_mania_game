import { Pipe, PipeType } from "./Pipe";
import { Direction } from "./Pipe";

export class PipeQueue {
  private queue: Pipe[]; // stores the available pipes
  private pipeTypes: PipeType[]; 

  constructor(initialSize: number = 5) {
    this.pipeTypes = ["vertical", "curvedDown", "curvedUp", "cross", "horizontal"];
    this.queue = [];
    // Inicializa a fila com o tamanho inicial
    for (let i = 0; i < initialSize; i++) {
      this.queue.push(this.generatePipe());
    }
  }

  private generatePipe(): Pipe {
    const randomType = this.pipeTypes[
      Math.floor(Math.random() * this.pipeTypes.length)
    ];
    return new Pipe();
  }

  public getNextPipe(): Pipe {
    const nextPipe = this.queue.shift(); // Remove o próximo tubo da fila
    // Garante que a fila tenha sempre 5 tubos
    if (this.queue.length < 5) {
      this.queue.push(this.generatePipe()); // Sempre gera um novo tubo
    }
    return nextPipe!; // Retorna o tubo removido
  }

  public replacePipe(index: number, newPipe: Pipe) {
    if (index >= 0 && index < this.queue.length) {
      this.queue[index] = newPipe;
    }
  }

  public drawPipeQueue(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const size = 50; // Defina um tamanho apropriado para os tubos
    const spacing = 10; // Espaçamento entre os tubos

    // Itera sobre a fila de tubos e desenha cada um
    this.queue.forEach((pipe, index) => {
      const pipeY = y + index * (size + spacing); // Calcula a posição Y para cada tubo
      pipe.draw(ctx, x, pipeY, size); // Desenha o tubo no canvas
    });
  }

  public getQueue(): Pipe[] { // Método público para acessar a fila
    return this.queue; // Retorna a fila de tubos
  }
}
