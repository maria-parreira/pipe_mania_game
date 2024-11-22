import { images } from "../configuration/gameConfiguration";
import { Cell } from "./Cell";
import { Pipe } from './Pipe';
import { StartPoint } from "./StartPoint";

/**
 * The Grid class represents a two-dimensional grid structure that manages the state of each cell.
 * Each cell can contain a pipe, be blocked, or have water. The grid is initialized with a specified
 * number of rows and columns, and a cell size. It provides methods to manipulate and render the grid,
 * including setting pipes in cells and drawing the grid on a canvas.
 */

export class Grid {
  private rows: number;
  private cols: number;
  private cellSize: number;
  private cells: Cell[][];
  private cellWithStartPoint: { x: number; y: number } | null = null;
  private startPoint: StartPoint | null = null;

  constructor(rows: number, cols: number, cellSize: number) {
    this.rows = rows;
    this.cols = cols;
    this.cellSize = cellSize;
    this.cells = [];
    this.initializeGrid();
  }

  private initializeGrid() {
    const blockedIndices = this.generateBlockedIndices();
    this.cells = this.createGrid(blockedIndices);
  }

  private generateBlockedIndices(): Set<number> {
    const totalCells = this.rows * this.cols;
    const blockedCount = Math.floor(totalCells * 0.1); 
    const blockedIndices = new Set<number>();

    while (blockedIndices.size < blockedCount) {
      const randomIndex = Math.floor(Math.random() * totalCells);
      blockedIndices.add(randomIndex);
    }
    return blockedIndices;
  }

  private createGrid(blockedIndices: Set<number>): Cell[][] {
    debugger;
    const grid: Cell[][] = [];
    for (let row = 0; row < this.rows; row++) {
      const gridRow: Cell[] = [];
      for (let col = 0; col < this.cols; col++) {
        const index = row * this.cols + col;
        const isBlocked = blockedIndices.has(index); 
        gridRow.push(new Cell(row, col, this.cellSize, isBlocked));
      }
      grid.push(gridRow);
    }
    return grid;
  }

  public getStartX(ctx: CanvasRenderingContext2D) {
    return ctx.canvas.getBoundingClientRect().x + this.getBorderIntervalX(ctx);
  }

  private getBorderIntervalX(ctx: CanvasRenderingContext2D) {
    return (ctx.canvas.width - (this.cols * this.cellSize)) / 2;
  }

  public getStartY(ctx: CanvasRenderingContext2D) {
    return ctx.canvas.getBoundingClientRect().y + this.getBorderIntervalY(ctx);
  }

  private getBorderIntervalY(ctx: CanvasRenderingContext2D) {
    return (ctx.canvas.height - (this.rows * this.cellSize)) / 2;
  }


  private getCellPosition(row: number, col: number, ctx: CanvasRenderingContext2D) {
    const { borderIntervalX, borderIntervalY } = this.getBorderIntervals(ctx);
    return this.getGridCoordinate(row, col, borderIntervalX, borderIntervalY);
  }

  private getBorderIntervals(ctx: CanvasRenderingContext2D) {
    const borderIntervalX = this.getBorderIntervalX(ctx); 
    const borderIntervalY = this.getBorderIntervalY(ctx);
    return { borderIntervalX, borderIntervalY };
  }

  private getGridCoordinate(row: number, col: number, borderIntervalX: number, borderIntervalY: number) {
    const x = borderIntervalX + col * this.cellSize;
    const y = borderIntervalY + row * this.cellSize;
    return { x, y };
  }

  public setPipeInCell(row: number, col: number, newPipe: Pipe): void {
    debugger;
    const cell = this.cells[row][col];
    if (cell && !cell.isBlocked()) {
      cell.setPipe(newPipe);
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {

    ctx.clearRect(0, 0, this.cols * this.cellSize, this.rows * this.cellSize);

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.drawCellAndPipe(ctx, row, col);
      }
    }
  }

  private drawCellAndPipe(ctx: CanvasRenderingContext2D, row: number, col: number) {
    const cell = this.cells[row][col];
    const { x, y } = this.getCellPosition(row, col, ctx);

    if (cell?.isBlocked()) {
        ctx.drawImage(images.blockedcell, x, y, this.cellSize, this.cellSize);
    } else if (cell?.getPipe()) {
        cell.getPipe()?.draw(ctx, x, y, this.cellSize);
    } else {
        cell.draw(ctx, x, y, this.cellSize);
    }

    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 3;
    ctx.strokeRect(x, y, this.cellSize, this.cellSize);
  }

  public drawStartPoint(ctx: CanvasRenderingContext2D, cellSize: number) {
    if (!this.cellWithStartPoint) {
        this.initializeStartPoint(ctx);
    }

    const { x, y } = this.cellWithStartPoint!;
    this.startPoint?.drawStartPoint(ctx, x, y, cellSize);
    
    this.blockCellAtStartPoint(ctx);
  }

  private initializeStartPoint(ctx: CanvasRenderingContext2D) {
    let cellFound = false;

    while (!cellFound) {
        const { randomRow, randomCol } = this.generateRandomCellCoordinates();
        this.cellWithStartPoint = { x: randomCol, y: randomRow }; 
        if (this.areStartPointCoordinatesValid(randomRow, randomCol, ctx)) {
            cellFound = true;
        }
    }

    if (!this.startPoint) {
        this.startPoint = new StartPoint();
    }
  }

  private blockCellAtStartPoint(ctx: CanvasRenderingContext2D) {
    const startPipeCoordinates = this.getCellStartPointCoordinates(ctx);
    if (startPipeCoordinates) {
        const { row, col } = startPipeCoordinates;
        this.cells[row][col].setBlocked(true);
    }
}


private areStartPointCoordinatesValid(randomRow: number, randomCol: number, ctx: CanvasRenderingContext2D): boolean {

    if (this.cells[randomRow][randomCol]?.isBlocked()) {
        return false;
    }
    const neighbors = this.getNeighboringCells(randomRow, randomCol);
    for (const { row, col } of neighbors) {
        if (this.isCellBlocked(row, col)) {
            return this.tryMoveStartPipe(randomRow, randomCol, ctx);
        }
    }
    const { borderIntervalX, borderIntervalY } = this.getBorderIntervals(ctx);
    const { x, y } = this.getGridCoordinate(randomRow, randomCol, borderIntervalX, borderIntervalY);
    this.cellWithStartPoint = { x, y };
    return true;
}

private tryMoveStartPipe(row: number, col: number, ctx: CanvasRenderingContext2D): boolean {
    const directions = [
        { row: row - 1, col },  
        { row: row + 1, col },  
        { row, col: col - 1 },  
        { row, col: col + 1 }, 
    ];

    for (const { row: newRow, col: newCol } of directions) {
        if (this.isValidCell(newRow, newCol) && !this.isCellBlocked(newRow, newCol)) {
            const neighbors = this.getNeighboringCells(newRow, newCol);
            const isValidPosition = neighbors.every(({ row, col }) => !this.isCellBlocked(row, col));

            if (isValidPosition) {
                const { borderIntervalX, borderIntervalY } = this.getBorderIntervals(ctx);
                const { x, y } = this.getGridCoordinate(newRow, newCol, borderIntervalX, borderIntervalY);
                this.cellWithStartPoint = { x, y };
                return true;
            }
        }
    }
    return false;
}

private getNeighboringCells(row: number, col: number): { row: number; col: number }[] {
    const directions = [
        { row: -1, col: 0 }, 
        { row: 1, col: 0 }, 
        { row: 0, col: -1 }, 
        { row: 0, col: 1 }   
    ];

    return directions
        .map(({ row: dRow, col: dCol }) => ({ row: row + dRow, col: col + dCol }))
        .filter(({ row, col }) => this.isValidCell(row, col)); 
}

public isValidCell(row: number, col: number): Boolean {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
}

private isCellBlocked(row: number, col: number): Boolean {
    if (!this.isValidCell(row, col)) {
        return true;
    }
    return this.cells[row][col]?.isBlocked();
}

  private generateRandomCellCoordinates(){
    const rows = this.cells.length;
    const cols = this.cells[0].length;

    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * cols);

    return {randomRow, randomCol};
  }


  // Função para atualizar o estado da célula adjacente e desenhar o water pipe
  public updateAdjacentCellWithWater(ctx:CanvasRenderingContext2D, row: number, col: number): void {
    const adjacentCoordinates = this.hasAdjacentConnections(row, col);
    if (adjacentCoordinates) {
      const { row: adjRow, col: adjCol } = adjacentCoordinates;
      const adjacentCell = this.cells[adjRow][adjCol];

      adjacentCell.fillPipeWithWater(ctx);
    }
  }

  private hasAdjacentConnections(row: number, col: number):{ row: number; col: number } | null {
    const currentPipe = this.cells[row][col].getPipe();
    const possibleConnections = currentPipe?.getPossibleConnectionsToAdjacentPipes() || [];

    for (const direction of possibleConnections) {
      const adjacentCellPipe = this.getAdjacentCellPipe(row, col, direction);
      if (adjacentCellPipe) {
        const [adjRow, adjCol] = adjacentCellPipe;
        const adjacentPipe = this.cells[adjRow][adjCol];
        if (adjacentPipe && adjacentPipe.getPipe()) {
          return { row: adjacentCellPipe[0], col: adjacentCellPipe[1] }; 
        }
      }
    }
    return null; 
  }
  
  private getAdjacentCellPipe(row: number, col: number, direction: string): [number, number] | null {
    switch (direction) {
      case "top":
        return row > 0 ? [row - 1, col] : null;
      case "bottom":
        return row < this.cells.length - 1 ? [row + 1, col] : null;
      case "right":
        return col < this.cells[0].length - 1 ? [row, col + 1] : null;
      case "left":
        return col > 0 ? [row, col - 1] : null;
      default:
        return null;
    }
  }

  public getGridCell(row: number, col: number): Cell {
    return this.cells[row][col];
  }

  public getCellStartPointCoordinates(ctx:CanvasRenderingContext2D): { row: number; col: number } | null {
    if (this.cellWithStartPoint) {
        const { x, y } = this.cellWithStartPoint;
        const col = Math.floor((x - this.getBorderIntervalX(ctx)) / this.cellSize);
        const row = Math.floor((y - this.getBorderIntervalY(ctx)) / this.cellSize);
        return { row, col };
    }
    return null; 
  }

  


}

