import { Pipe } from "./Pipe";

const Queue = <T>() => {
  const items: T[] = [];

  return {
    enqueue(item: T) {
      items.push(item); // Adiciona um item ao final da fila
    },
    dequeue(): T | undefined {
      return items.shift(); // Remove o primeiro item da fila
    },
    size(): number {
      return items.length; // Retorna o tamanho da fila
    },
    isEmpty(): boolean {
      return items.length === 0; // Verifica se a fila está vazia
    },
    getItems(): T[] {
      return items; // Método para acessar os itens da fila
    },
    peek(): T | undefined { // Método para obter o primeiro item sem removê-lo
      return items[0]; // Retorna o primeiro item da fila
    }
  };
};

export class PipeQueue {
  private queue = Queue<Pipe>(); // Usando o objeto Queue

  constructor(initialSize: number = 5) {
    for (let i = 0; i < initialSize; i++) {
      this.queue.enqueue(this.generatePipe());
    }
  }

  public generatePipe(): Pipe {
    return new Pipe(); // Aqui você pode usar randomType se necessário
  }

  public getFirstPipe(): Pipe {
    return this.queue.peek()!; // Adiciona o operador de asserção não nula
  }


  public drawPipeQueue(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const pipeSize = 50; // Defina um tamanho apropriado para os tubos
    const pipeSpacing = 10; // Espaçamento entre os tubos

    // Itera sobre a fila de tubos e desenha cada um
    this.queue.getItems().forEach((pipe, index) => {
      const pipeY = y + index * (pipeSize + pipeSpacing); // Calcula a posição Y para cada tubo
      pipe.drawPipe(ctx, x, pipeY, pipeSize); // Desenha o tubo no canvas
    });
  }

  public getQueue(): Pipe[] { 
    return this.queue.getItems(); // Retorna a fila de tubos
  }

  removeFirstPipe() {
    // Lógica para remover a primeira pipe da fila
    this.queue.dequeue(); // Corrigido para usar o método dequeue
  }

  addPipe(pipe: Pipe) {
    this.queue.enqueue(pipe); // Corrigido para usar o método enqueue
  }


}
