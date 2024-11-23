import { Grid } from "./Grid";
import { GameConfiguration } from "../configuration/gameConfiguration"; 
import { PipeQueue } from "./PipeQueue";
import { Pipe } from "./Pipe";
import { WaterPipe } from "./WaterPipe";


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
  private waterFlow: WaterPipe | null;

  private countdown: number = 10; // Tempo restante para a água começar
  private timerInterval: number | null = null; // Referência para o intervalo do temporizador

  private score: number = 0; // Pontuação do jogador

  constructor(
    canvas: HTMLCanvasElement,
    queueContainer: HTMLElement,
    gameStatus: HTMLElement,
    grid: Grid,
    waterFlow: WaterPipe
  ) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.grid = grid;
    this.waterFlow=waterFlow;

    this.addEventListeners();
    this.startGame(this.ctx);
  }

  public startGame(ctx:CanvasRenderingContext2D) {
    this.startCountdown(ctx); // Inicia o temporizador de contagem regressiva
    this.runGameLoop();
  }

  private startCountdown(ctx:CanvasRenderingContext2D) {
    this.timerInterval = window.setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--; 
      } else {
        this.stopCountdown(); // Para o temporizador quando chega a 0
        this.startWaterFlow()
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
    debugger;
    const startPipeCoordinates = this.grid.getCellWithStartPoint();
    const row = startPipeCoordinates?.y!;
    const col = startPipeCoordinates?.x!;
    this.grid.updateAdjacentCellWithWater(this.ctx, row, col);
    const adjacentCellCoordinates = this.grid.hasAdjacentConnections(row, col);
    const adjacentCell = this.grid.getGridCell(adjacentCellCoordinates?.row ?? 0, adjacentCellCoordinates?.col ?? 0);
    const pipe = adjacentCell.getPipe();
    if (pipe) {
        const waterPipe = new WaterPipe(pipe, this.grid, this.ctx);
        waterPipe.drawWaterPipe;
    }
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
    if (this.countdown === 0) {
      this.startWaterFlow(); // Atualiza o fluxo de água quando o tempo chega a zero
    }
  }

  private drawGame() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.grid.draw(this.ctx);
    this.grid.drawStartPoint(this.ctx, 50);
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


  private inspectSurroundingCells(row: number, col: number) {
    const currentCell = this.grid.getGridCell(row, col);
    const currentPipe = currentCell.getPipe();

    if (currentPipe) {
      const possibleDirections = currentPipe.getPossibleConnectionsToAdjacentPipes(); // Obtém as direções possíveis do pipe atual

      possibleDirections.forEach(direction => {
        let newRow = row;
        let newCol = col;

        // Atualiza as coordenadas com base na direção
        switch (direction) {
          case 'top':
            newRow -= 1;
            break;
          case 'bottom':
            newRow += 1;
            break;
          case 'right':
            newCol -= 1;
            break;
          case 'left':
            newCol += 1;
            break;
        }

        if (this.grid.isValidCell(newRow, newCol)) {
          const adjacentCell = this.grid.getGridCell(newRow, newCol);
          const adjacentPipe = adjacentCell.getPipe();

          if (adjacentPipe) {
            const adjacentPossibleDirections = adjacentPipe.getPossibleConnectionsToAdjacentPipes();
            if (adjacentPossibleDirections.includes(direction)) {
              console.log(`Célula adjacente com pipe alinhado encontrada em: (${newRow}, ${newCol})`);
            }
          }
        }
      });
    }
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

          this.score += 10; 
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
