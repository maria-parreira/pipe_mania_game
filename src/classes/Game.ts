import { Grid } from "./Grid";
import { GameConfiguration } from "../configuration/gameConfiguration"; 
import { PipeQueue } from "./PipeQueue";
import { Pipe } from "./Pipe";


/**
 * The Game class represents the main game logic and rendering.
 * It manages the game canvas, grid, and pipe queue, and handles user interactions.
 * 
 * It initializes the game with a given canvas and grid, sets up event listeners for user input,
 * and provides methods to start the game and draw the game state on the canvas.
 */

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  grid: Grid;
  pipeQueue: PipeQueue = new PipeQueue(5);
  private selectedPipe: Pipe | null = null;
  private isRunning: boolean = true;

  private countdown: number = 10; // Tempo restante para a água começar
  private timerInterval: number | null = null; // Referência para o intervalo do temporizador

  private score: number = 0; // Pontuação do jogador

  constructor(
    canvas: HTMLCanvasElement,
    queueContainer: HTMLElement,
    gameStatus: HTMLElement,
    grid: Grid
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.grid = grid;

    this.addEventListeners();
    this.startGame();
  }

  public startGame() {
    this.startCountdown(); // Inicia o temporizador de contagem regressiva
    this.runGameLoop();
  }

  private startCountdown() {
    this.timerInterval = window.setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--; // Diminui o contador
      } else {
        this.stopCountdown(); // Para o temporizador quando chega a 0
        this.startWaterFlow(); // Inicia o fluxo de água quando o contador chega a 0
      }
    }, 1000); // Intervalo de 1 segundo
  }

  private stopCountdown() {
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval); // Para o intervalo
      this.timerInterval = null;
    }
  }

  private startWaterFlow() {
    // A partir deste momento, a água começa a fluir
  }

  private runGameLoop() {
    const gameLoop = () => {
      if (this.isRunning) {
        this.updateGame();
        this.drawGame();
        requestAnimationFrame(gameLoop);
      }
    };
    requestAnimationFrame(gameLoop);
  }

  private updateGame() {
    // Atualizações gerais do jogo podem ser adicionadas aqui
    if (this.countdown === 0) {
      // Quando o tempo chega a zero, o fluxo de água pode ser atualizado
      
    }
  }

  private drawGame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Renderiza os elementos do jogo
    this.grid.drawGrid(this.ctx);
    this.grid.drawStartPipeInGrid(this.ctx, 50);
    this.pipeQueue.drawPipeQueue(this.ctx, 0, 150);

    // Renderiza o HUD (incluindo o contador regressivo e pontuação)
    this.drawHUD();
  }

  private drawHUD() {
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";

    // Renderiza a contagem regressiva
    this.ctx.fillText(
      `Time until water: ${this.countdown}s`,
      10,
      20
    );

    // Renderiza a pontuação
    this.ctx.fillText(`Score: ${this.score}`, 10, 50);
  }

  private addEventListeners() {
    this.canvas.addEventListener("click", this.handleGridClick.bind(this));
  }

  private handleGridClick(event: MouseEvent) {
    const x = event.clientX - this.grid.getStartX(this.ctx);
    const y = event.clientY - this.grid.getStartY(this.ctx);
    const col = Math.floor(x / GameConfiguration.cellSize);
    const row = Math.floor(y / GameConfiguration.cellSize);

    if (row >= 0 && row < GameConfiguration.rows && col >= 0 && col < GameConfiguration.cols) {
      this.handlePipeSelection();
      if (this.selectedPipe) {
        this.grid.setCellPipe(row, col, this.selectedPipe);

        // Incrementa a pontuação
        this.score += 10; // Ajuste o valor da pontuação conforme necessário
      }
    }
  }

  private handlePipeSelection() {
    const firstPipe = this.pipeQueue.getFirstPipe();
    if (firstPipe) {
      this.selectedPipe = firstPipe;
      this.pipeQueue.removeFirst();
      const newPipe = this.pipeQueue.generatePipe();
      this.pipeQueue.addLast(newPipe);
    }
  }
}
