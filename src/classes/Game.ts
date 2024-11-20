import { Grid } from "./Grid";
import { GameConfiguration } from "./GameConfiguration"; 
import { PipeQueue } from "./PipeQueue";
import { Cell } from "./Cell";
import { Pipe } from "./Pipe";


export class Game {

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  gameStatus: HTMLElement;  // neste momento nao esta a ser usado
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
            const placed = this.grid.placePipe(row, col, this.selectedPipe); // Coloca a pipe na célula
            if (placed) {
              console.log("Pipe colocada na célula:", row, col); // Log para confirmar a colocação
              this.drawGame(); // Redesenha o jogo após a colocação do tubo
            } else {
              console.log("Falha ao colocar a pipe na célula."); // Log caso a colocação falhe
            }
          } else {
            console.log("Nenhuma pipe selecionada."); // Log caso não haja pipe selecionada
          }
        }
      });

      // Adiciona evento para selecionar a primeira pipe da fila
      this.canvas.addEventListener("click", () => {
        console.log("Clique detectado no queueContainer."); // Log para verificar se o evento de clique é acionado
        const firstPipe = this.pipeQueue.getFirstPipe(); // Método que deve ser implementado na PipeQueue
        console.log("Primeira pipe selecionada:", firstPipe); // Log para verificar a pipe selecionada
        if (firstPipe) {
          this.selectedPipe = firstPipe; // Seleciona a primeira pipe
          console.log("Pipe selecionada com sucesso:", this.selectedPipe); // Log para confirmar a seleção
          
          // Remove a pipe da fila e gera uma nova para adicionar ao final
          this.pipeQueue.removeFirstPipe(); // Método que deve ser implementado na PipeQueue
          const newPipe = this.pipeQueue.generatePipe(); // Método que deve ser implementado na PipeQueue
          this.pipeQueue.addPipe(newPipe); // Adiciona a nova pipe ao final da fila
        } else {
          console.log("Nenhuma pipe disponível para seleção."); // Log caso não haja pipe
        }
      });
    }
  }
