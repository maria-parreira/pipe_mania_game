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
    this.drawGame();
  }

  private drawGame() {
    this.grid.drawGrid(this.ctx);
    this.grid.drawStartPipeInGrid(this.ctx, 50);
    this.pipeQueue.drawPipeQueue(this.ctx, 0, 10);
  }

  private addEventListeners() {
    this.canvas.addEventListener("click", this.handleGridClick.bind(this));
    this.canvas.addEventListener("click", this.handlePipeSelection.bind(this));
  }

  private handleGridClick(event: MouseEvent) {
    const x = event.clientX - this.grid.getStartX(this.ctx);
    const y = event.clientY - this.grid.getStartY(this.ctx);
    const col = Math.floor(x / GameConfiguration.cellSize);
    const row = Math.floor(y / GameConfiguration.cellSize);

    if (row >= 0 && row < GameConfiguration.rows && col >= 0 && col < GameConfiguration.cols) {
      if (this.selectedPipe) {
        const placed = this.grid.setCellPipe(row, col, this.selectedPipe);
        if (placed) {
          this.drawGame();
        } 
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
