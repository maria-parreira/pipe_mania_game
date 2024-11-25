import { Grid } from "./Grid";
import { GameConfiguration, waterImages } from "../configuration/gameConfiguration"; 
import { PipeQueue } from "./PipeQueue";
import { Pipe } from "./Pipe";
import { WaterPipe } from "./WaterPipe";


/**
 * The Game class handles the main game logic, rendering, and user interactions.
 * It manages the game canvas, grid, and pipe queue, and provides methods to start the game and draw the game state.
 */
export class Game {
  static readonly PIPE_QUEUE_NUMBER = 5;
  static readonly HUD_FONT = "20px Arial";
  static readonly HUD_FILL_STYLE = "black";
  static readonly GAME_OVER_FONT = "40px Arial";
  static readonly GAME_OVER_FILL_STYLE = "red";
  static readonly GAME_OVER_TEXT_ALIGN = "center";
  static readonly CONTEXT = "2d";
  static readonly CANVAS_QUERY_SELECTOR = "canvas";
  static readonly WINNING_SCORE = 100;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  
  private grid: Grid;
  private pipeQueue: PipeQueue = new PipeQueue(Game.PIPE_QUEUE_NUMBER);
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
    this.ctx = canvas.getContext(Game.CONTEXT)!;
    this.grid = grid;
  
    this.preloadImages().then(() => {
      this.addEventListeners();
      this.startGame(this.ctx);
    });
  }

  public startGame(ctx:CanvasRenderingContext2D) {
    this.startCountdown(ctx);
    this.grid.setOnGameOverCallback(() => {
      this.handleGameOver();
    });
    this.runGameLoop();
  }

  private preloadImages(): Promise<void> {
    const images = Object.values(waterImages);
    const promises = images.map(img => {
        return new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => reject(`Failed to load image: ${img.src}`);
        });
    });

    return Promise.all(promises)
        .then(() => console.log("All images loaded successfully"))
        .catch(error => console.error(error));
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
    this.grid.setOnPipeFilledCallback(() => {
      if (this.countdown === 0) {
          this.increaseScore(10);
      }
    });
    const startPipeCoordinates = this.grid.getInitialPipePosition();
    const row = startPipeCoordinates?.row!;
    const col = startPipeCoordinates?.col!;
    this.grid.updateAdjacentCellsWithWater(this.ctx, row, col);
  }

  private increaseScore(points: number) {
    this.score += points;
    if (this.score >= Game.WINNING_SCORE) {
      this.notifyWinGame();
    }
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
    this.ctx.font = Game.HUD_FONT;
    this.ctx.fillStyle = Game.HUD_FILL_STYLE;
    this.ctx.fillText(
      `Time until water: ${this.countdown}s`,
      10,
      20
    );
    this.ctx.fillText(`Score to win: ${Game.WINNING_SCORE}`, 10, 50);
    this.ctx.fillText(`Score: ${this.score}`, 10, 70);
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
    if(this.isRunning){
      this.drawGameOverScreen();
      this.canvas.addEventListener("click", this.restartGame.bind(this), { once: true });
      this.isRunning = false;
    }
  }

  private drawGameOverScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.font = Game.GAME_OVER_FONT;
    this.ctx.fillStyle = Game.GAME_OVER_FILL_STYLE;
    this.ctx.textAlign = Game.GAME_OVER_TEXT_ALIGN;
    this.ctx.fillText("Game Over", this.canvas.width / 2, this.canvas.height / 2 - 20);
    this.ctx.font = Game.HUD_FONT;
    this.ctx.fillStyle = Game.HUD_FILL_STYLE;
    this.ctx.fillText("Click to Restart", this.canvas.width / 2, this.canvas.height / 2 + 20);
  }

  private restartGame() {
    this.isRunning = false;
    this.stopCountdown();

    this.countdown = 20;
    this.score = 0;

    this.grid.reset(); 
    this.pipeQueue = new PipeQueue(Game.PIPE_QUEUE_NUMBER); 
    this.canvas.replaceWith(this.canvas.cloneNode(true) as HTMLCanvasElement);
    this.canvas = document.querySelector(Game.CANVAS_QUERY_SELECTOR)!;
    this.ctx = this.canvas.getContext(Game.CONTEXT)!;

    this.grid.setOnGameOverCallback(() => this.handleGameOver());
    this.grid.setOnPipeFilledCallback(() => {
        if (this.countdown === 0) {
            this.score += 10; 
        }
    });
    this.addEventListeners();

    this.isRunning = true;
    this.startGame(this.ctx);
  }

  private notifyWinGame() {
    if (this.onWinGameCallback) {
        this.onWinGameCallback();
    }
  }

  private onWinGameCallback() {
    this.isRunning = false;

    this.drawWinScreen(this.ctx);
    this.canvas.addEventListener("click", this.restartGame.bind(this), { once: true });
  };

  private drawWinScreen(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Estilo semelhante ao Game Over
    ctx.font = Game.GAME_OVER_FONT;
    ctx.fillStyle = Game.GAME_OVER_FILL_STYLE;
    ctx.textAlign = Game.GAME_OVER_TEXT_ALIGN;
    ctx.fillText("Congratulations! You Win!", ctx.canvas.width / 2, ctx.canvas.height / 2 - 20);
    
    ctx.font = Game.HUD_FONT;
    ctx.fillStyle = Game.HUD_FILL_STYLE;
    ctx.fillText("Click to Restart", ctx.canvas.width / 2, ctx.canvas.height / 2 + 20);
  }
}