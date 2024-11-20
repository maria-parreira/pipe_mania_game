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
  private isRunning: boolean = true; // Controle do loop

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
    this.runGameLoop();
  }

  private runGameLoop() {
    const gameLoop = () => {
      if (this.isRunning) {
        this.drawGame();
        requestAnimationFrame(gameLoop);
      }
    };
    requestAnimationFrame(gameLoop);
  }

  private drawGame() {
    // Limpa o canvas antes de redesenhar
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Renderiza os elementos do jogo
    this.grid.drawGrid(this.ctx);
    this.grid.drawStartPipeInGrid(this.ctx, 50);
    this.grid.drawEndPipeInGrid(this.ctx, 50);
    this.pipeQueue.drawPipeQueue(this.ctx, 0, 10);
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
