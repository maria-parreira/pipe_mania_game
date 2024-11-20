import { Grid } from "./Grid";
import { GameConfiguration } from "./GameConfiguration"; 
import { PipeQueue } from "./PipeQueue";
import { Cell } from "./Cell";
import { Pipe } from "./Pipe";


export class Game {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  queueContainer: HTMLElement; // neste momento limpa o conteudo anterior da fila
  gameStatus: HTMLElement;  // neste momento nao esta a ser usado
  grid: Grid; // Inicialização do grid
  pipeQueue: PipeQueue = new PipeQueue(5);

  constructor(
    canvas: HTMLCanvasElement,
    queueContainer: HTMLElement,
    gameStatus: HTMLElement,
    grid: Grid
) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.queueContainer = queueContainer; 
    this.gameStatus = gameStatus;
    this.grid = grid;

    // Events
    this.addEventListeners();
    this.startGame();
  }

  // inicia do jogo
  startGame() {
    this.drawGame(); // chama a função para desenhar o jogo
    this.gameStatus.textContent = "Game started. Build your path!";
  }

  drawGame() {
    this.grid.draw(this.ctx); // desenha o grid
    this.pipeQueue.drawPipeQueue(this.ctx, 0, 10); // desenha a fila de pipes
  }

  updateQueue() {
    // Limpa o conteúdo anterior da fila
    this.queueContainer.innerHTML = ""; 
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
          const pipe = new Pipe(); // Cria uma nova instância de Pipe
          const placed = this.grid.placePipe(row, col, pipe);
          if (placed) {
            this.drawGame(); // Redesenha o jogo após a colocação do tubo
          }
        }
      });
    }
  }
