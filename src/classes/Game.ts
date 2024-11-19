import { Grid } from "./Grid";
import { GameConfiguration } from "./GameConfiguration"; 


// list of pipes, grid, win, lose
export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  queueContainer: HTMLElement;
  gameStatus: HTMLElement;
  grid: Grid = new Grid(0, 0, 0); // Inicialização
  selectedCell: { row: number; col: number } = { row: 0, col: 0 };

  constructor(
    canvas: HTMLCanvasElement,
    queueContainer: HTMLElement,
    gameStatus: HTMLElement
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.queueContainer = queueContainer;
    this.gameStatus = gameStatus;


    // Adjust canvas size
    this.canvas.width = GameConfiguration.cols * GameConfiguration.cellSize;
    this.canvas.height = GameConfiguration.rows * GameConfiguration.cellSize;

    // Events
    this.addEventListeners();
  }

  startGame() {
    this.grid = new Grid(GameConfiguration.rows, GameConfiguration.cols, GameConfiguration.cellSize);
    this.updateQueue();
    this.drawGame();
    this.gameStatus.textContent = "Game started. Build your path!";
  }

  drawGame() {
    console.log("Desenhando o jogo...");
    this.grid.draw(this.ctx);

    // Draw selected cell
    this.ctx.strokeStyle = "red";
    this.ctx.lineWidth = 3;

    this.ctx.strokeRect(
      GameConfiguration.selectedCell.col * GameConfiguration.cellSize,
      GameConfiguration.selectedCell.row * GameConfiguration.cellSize,
      GameConfiguration.cellSize,
      GameConfiguration.cellSize
    );
  }

  updateQueue() {
    this.queueContainer.innerHTML = "Pipe queue..."; // Implement queue logic in the future
  }

  addEventListeners() {
    // Mouse click on the canvas
    this.canvas.addEventListener("click", (event) => {
      const rect = this.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      this.selectedCell.col = Math.floor(x / GameConfiguration.cellSize);
      this.selectedCell.row = Math.floor(y / GameConfiguration.cellSize);

      this.drawGame();
    });
  }
}
