import { Pipe } from './Pipe';


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
  private cells: { pipe: Pipe | null; blocked: boolean; water: boolean }[][];
  private startPipePosition: { x: number; y: number } | null = null;
  private startPipe: Pipe | null = null;
  private endPipePosition: { x: number; y: number } | null = null;
  private endPipe: Pipe | null = null;

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

  private createGrid(blockedIndices: Set<number>): { pipe: Pipe | null; blocked: boolean; water: boolean }[][] {
    const grid: { pipe: Pipe | null; blocked: boolean; water: boolean }[][] = [];
    for (let row = 0; row < this.rows; row++) {
      const gridRow: { pipe: Pipe | null; blocked: boolean; water: boolean }[] = [];
      for (let col = 0; col < this.cols; col++) {
        const index = row * this.cols + col;
        const isBlocked = blockedIndices.has(index); 
        gridRow.push({
          pipe: null,
          blocked: isBlocked,
          water: false,
        });
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

  public setCellPipe(row: number, col: number, newPipe: Pipe): boolean {
    const cell = this.cells[row][col];
    if (cell.blocked) {
      return false;
    }
    cell.pipe = newPipe;
    return true;
  }

  public drawGrid(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.cols * this.cellSize, this.rows * this.cellSize);

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.drawCell(ctx, row, col);
      }
    }
  }

  private drawCell(ctx: CanvasRenderingContext2D, row: number, col: number) {
    const cell = this.cells[row][col];
    const { x, y } = this.getCellPosition(row, col, ctx);

    if (cell.blocked) {
      ctx.fillStyle = "gray";
      ctx.fillRect(x, y, this.cellSize, this.cellSize);
    }

    if (cell.pipe) {
      cell.pipe.drawPipe(ctx, x, y, this.cellSize);
    }

    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y, this.cellSize, this.cellSize);
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

  public drawStartPipeInGrid(ctx: CanvasRenderingContext2D, cellSize: number) {
    if (!this.startPipePosition) {
        let cellFound = false;

        while (!cellFound) {
            const { randomRow, randomCol } = this.generateRandomPipePosition();

            if (this.areStartPipeCoordinatesValid(randomRow, randomCol, ctx)) {
                cellFound = true;
            }
        }

        if (!this.startPipe) {
            this.startPipe = new Pipe();
        }
    }

    const { x, y } = this.startPipePosition!;
    this.startPipe?.drawStartPipe(ctx, x, y, cellSize);
}

private areStartPipeCoordinatesValid(randomRow: number, randomCol: number, ctx: CanvasRenderingContext2D): boolean {
    // Verifica se a célula está na última linha (não pode ser na última linha)
    if (randomRow === this.rows - 1) {
        return false;
    }

    // Verifica se a célula é válida (não bloqueada)
    if (this.cells[randomRow][randomCol].blocked) {
        return false;
    }

    // Verifica se as células vizinhas estão bloqueadas
    const neighbors = this.getNeighboringCells(randomRow, randomCol);
    for (const { row, col } of neighbors) {
        if (this.isCellBlocked(row, col)) {
            // Se uma célula vizinha está bloqueada, tenta mover a start pipe
            return this.tryMoveStartPipe(randomRow, randomCol, ctx);
        }
    }

    // Define a posição da start pipe no grid
    const { borderIntervalX, borderIntervalY } = this.getBorderIntervals(ctx);
    const { x, y } = this.getGridCoordinate(randomRow, randomCol, borderIntervalX, borderIntervalY);
    this.startPipePosition = { x, y };
    return true;
}

private tryMoveStartPipe(row: number, col: number, ctx: CanvasRenderingContext2D): boolean {
    // Tenta deslocar a start pipe para as células vizinhas, com mais controle sobre a distância
    const directions = [
        { row: row - 1, col },  // Acima
        { row: row + 1, col },  // Abaixo
        { row, col: col - 1 },  // Esquerda
        { row, col: col + 1 },  // Direita
    ];

    for (const { row: newRow, col: newCol } of directions) {
        if (this.isValidCell(newRow, newCol) && !this.isCellBlocked(newRow, newCol)) {
            // Verifica se a nova posição está livre e se não há bloqueios ao redor dela
            const neighbors = this.getNeighboringCells(newRow, newCol);
            const isValidPosition = neighbors.every(({ row, col }) => !this.isCellBlocked(row, col));

            if (isValidPosition) {
                const { borderIntervalX, borderIntervalY } = this.getBorderIntervals(ctx);
                const { x, y } = this.getGridCoordinate(newRow, newCol, borderIntervalX, borderIntervalY);
                this.startPipePosition = { x, y };
                return true;
            }
        }
    }
    return false; // Se não encontrar uma posição válida, retorna false
}

private getNeighboringCells(row: number, col: number): { row: number; col: number }[] {
    const directions = [
        { row: -1, col: 0 }, // Acima
        { row: 1, col: 0 },  // Abaixo
        { row: 0, col: -1 }, // Esquerda
        { row: 0, col: 1 }   // Direita
    ];

    return directions
        .map(({ row: dRow, col: dCol }) => ({ row: row + dRow, col: col + dCol }))
        .filter(({ row, col }) => this.isValidCell(row, col)); // Apenas células dentro do grid
}

private isValidCell(row: number, col: number): boolean {
    return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
}

private isCellBlocked(row: number, col: number): boolean {
    if (!this.isValidCell(row, col)) {
        return true; // Fora do grid é considerado bloqueado
    }
    return this.cells[row][col].blocked;
}


  private generateRandomPipePosition(){
    const rows = this.cells.length;
    const cols = this.cells[0].length;

    const randomRow = Math.floor(Math.random() * rows);
    const randomCol = Math.floor(Math.random() * cols);

    return {randomRow, randomCol};
  }

  
/*
  public drawEndPipeInGrid(ctx: CanvasRenderingContext2D, cellSize: number) {
    if (!this.endPipePosition) {
      let cellFound = false;
      
      while (!cellFound) {
          const {randomRow, randomCol } = this.generateRandomPipePosition();

          if(this.areEndPipeCoordinatesValid(randomRow, randomCol, ctx)){
            cellFound = true ;
          }
      }

      if (!this.endPipe) {
        this.endPipe = new Pipe();
      }
    }

    const { x, y } = this.endPipePosition!;
    this.endPipe?.drawEndPipe(ctx, x, y, cellSize); 
  }


  private areEndPipeCoordinatesValid(randomRow: number, randomCol: number, ctx: CanvasRenderingContext2D){
    const { borderIntervalX, borderIntervalY } = this.getBorderIntervals(ctx);

    if (!this.cells[randomRow][randomCol].blocked && randomRow < this.cells.length - 1) {
      if(!this.isValidDistanceFromEndToStartPipes(randomRow, randomCol)){
        return false;
      }
      const { x, y } = this.getGridCoordinate(randomRow, randomCol, borderIntervalX, borderIntervalY);
      this.endPipePosition = { x, y }; 
      return true;
    }
    return false;
  }

  private isValidDistanceFromEndToStartPipes(randomRow: number, randomCol: number){
    if (this.startPipePosition) {
      const startRow = Math.floor(this.startPipePosition.y / this.cellSize);
      const startCol = Math.floor(this.startPipePosition.x / this.cellSize);
      if (Math.abs(randomRow - startRow) < 3 && Math.abs(randomCol - startCol) < 3) {
        return false;
      }
    }
    return true;
  }
    */

}

