import { Grid } from "./Grid";
import { GameConfiguration } from "../configuration/gameConfiguration"; 
import { PipeQueue } from "./PipeQueue";
import { Pipe } from "./Pipe";
import { WaterPipe } from "./WaterPipe";


/**
 * The Game class handles the main game logic, rendering, and user interactions.
 * It manages the game canvas, grid, and pipe queue, and provides methods to start the game and draw the game state.
 */
export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  grid: Grid;
  pipeQueue: PipeQueue = new PipeQueue(5);
  private selectedPipe: Pipe | null = null;
  private isRunning: boolean = true;

  private countdown: number = 20; 
  private timerInterval: number | null = null; 

  private score: number = 0; 

  constructor(
    canvas: HTMLCanvasElement,
    grid: Grid
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.grid = grid;
    this.grid.setOnPipeFilledCallback(() => {
      if (this.countdown === 0) {
          this.score += 10; 
      }
    });

    this.grid.setOnGameOverCallback(() => {
      this.handleGameOver();
    });
  
    this.addEventListeners();
    this.startGame(this.ctx);
  }

  public startGame(ctx:CanvasRenderingContext2D) {
    this.startCountdown(ctx);
    this.runGameLoop();
  }

  private startCountdown(ctx:CanvasRenderingContext2D) {
    this.timerInterval = window.setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--; 
      } else {
        this.stopCountdown();
        this.startWaterFlow();
      }
    }, 1000);
  }

  private stopCountdown() {
    if (this.timerInterval !== null) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  private startWaterFlow() {
    debugger;
    const startPipeCoordinates = this.grid.getInitialPipePosition();
    const row = startPipeCoordinates?.row!;
    const col = startPipeCoordinates?.col!;
    this.grid.updateAdjacentCellsWithWater(this.ctx, row, col);
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.grid.draw(this.ctx);
    this.grid.drawInitialPipe(this.ctx, 50);
    this.pipeQueue.drawPipeQueue(this.ctx, 10, 150);

    this.drawHUD();
  }

  private drawHUD() {
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText(
      `Time until water: ${this.countdown}s`,
      10,
      20
    );
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
      if (!this.grid.getGridCell(row,col).isBlocked()) {
        this.handlePipeSelection();
        if (this.selectedPipe) {
          this.grid.setPipeInCell(row, col, this.selectedPipe);
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

  private handleGameOver() {
    this.isRunning = false;
    this.drawGameOverScreen();
    
    this.canvas.addEventListener("click", this.restartGame.bind(this), { once: true });
  }

  private drawGameOverScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = "40px Arial";
    this.ctx.fillStyle = "red";
    this.ctx.textAlign = "center";
    this.ctx.fillText("Game Over", this.canvas.width / 2, this.canvas.height / 2 - 20);
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "black";
    this.ctx.fillText("Click to Restart", this.canvas.width / 2, this.canvas.height / 2 + 20);
  }

  private restartGame() {
    this.isRunning = true;
    this.countdown = 20;
    this.score = 0;

    this.grid.reset(); 
    this.pipeQueue = new PipeQueue(5);

    this.canvas.replaceWith(this.canvas.cloneNode(true) as HTMLCanvasElement);
    this.canvas = document.querySelector("canvas")!;
    this.ctx = this.canvas.getContext("2d")!;
    this.grid.setOnGameOverCallback(() => this.handleGameOver());
    this.addEventListeners();

    this.startGame(this.ctx);
  }
}