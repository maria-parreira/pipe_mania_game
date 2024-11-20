import { Grid } from "./Grid";
import { GameConfiguration } from "../configuration/gameConfiguration"; 
import { PipeQueue } from "./PipeQueue";
import { Pipe } from "./Pipe";


export class Game {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  grid: Grid; // Inicialização do grid
  pipeQueue: PipeQueue = new PipeQueue(5);
  private selectedPipe: Pipe | null = null; // Armazena a pipe selecionada

  constructor(
    canvas: HTMLCanvasElement,
    queueContainer: HTMLElement,
    gameStatus: HTMLElement,
    grid: Grid
) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.grid = grid;

    // Events
    this.addEventListeners();
    this.startGame();
  }

  // inicia do jogo
  startGame() {
    this.drawGame(); // chama a função para desenhar o jogo
  }

  drawGame() {
    this.grid.drawGrid(this.ctx); // desenha o grid
    this.grid.drawStartPipeInGrid(this.ctx,50);
    this.pipeQueue.drawPipeQueue(this.ctx, 0, 10); // desenha a fila de pipes
  }


  // Função para escolher aleatoriamente uma célula inicial

    addEventListeners() {
      this.canvas.addEventListener("click", (event) => {
        const x = event.clientX - this.grid.getStartX(this.ctx);
        const y = event.clientY - this.grid.getStartY(this.ctx);
        const col = Math.floor(x / GameConfiguration.cellSize);
        const row = Math.floor(y / GameConfiguration.cellSize);
  
        // Verifica se a célula está dentro dos limites da grid
        if (row >= 0 && row < GameConfiguration.rows && col >= 0 && col < GameConfiguration.cols) {
          if (this.selectedPipe) { // Verifica se uma pipe foi selecionada
            const placed = this.grid.setCellPipe(row, col, this.selectedPipe); // Altera o pipe na célula
            if (placed) {
              this.drawGame(); // Redesenha o jogo após a substituição do tubo
            } 
          }
        }
      });

      // Adiciona evento para selecionar a primeira pipe da fila
      this.canvas.addEventListener("click", () => {
        const firstPipe = this.pipeQueue.getFirstPipe(); // Método que deve ser implementado na PipeQueue
        if (firstPipe) {
          this.selectedPipe = firstPipe; // Seleciona a primeira pipe
          // Remove a pipe da fila e gera uma nova para adicionar ao final
          this.pipeQueue.removeFirstPipe(); // Método que deve ser implementado na PipeQueue
          const newPipe = this.pipeQueue.generatePipe(); // Método que deve ser implementado na PipeQueue
          this.pipeQueue.addPipe(newPipe); // Adiciona a nova pipe ao final da fila
        }
      });
    }
  }
