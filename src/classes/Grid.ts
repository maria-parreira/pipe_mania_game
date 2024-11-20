import { Pipe } from './Pipe';

export class Grid {
  private rows: number;
  private cols: number;
  private cellSize: number;
  private cells: { pipe: Pipe | null; blocked: boolean; water: boolean }[][]; // represents the state of the cell 

  // public 
  constructor(rows: number, cols: number, cellSize: number) {
    this.rows = rows;
    this.cols = cols;
    this.cellSize = cellSize;
    this.cells = [];

    this.initializeGrid();
  }

  // method creates the grid with cells
  private initializeGrid() {
    const totalCells = this.rows * this.cols;
    const blockedCount = Math.floor(totalCells * 0.1); // Bloqueia 10% das células
    const blockedIndices = new Set<number>();

    // Gera índices únicos para células bloqueadas
    while (blockedIndices.size < blockedCount) {
      const randomIndex = Math.floor(Math.random() * totalCells);
      blockedIndices.add(randomIndex);
    }

    for (let row = 0; row < this.rows; row++) {
      const gridRow: { pipe: Pipe | null; blocked: boolean; water: boolean }[] = [];
      for (let col = 0; col < this.cols; col++) {
        const index = row * this.cols + col;
        const isBlocked = blockedIndices.has(index); // Verifica se a célula deve ser bloqueada
        gridRow.push({
          pipe: null,
          blocked: isBlocked,
          water: false,
        });
      }
      this.cells.push(gridRow);
    }
  }

  public getBorderIntervalX(ctx:CanvasRenderingContext2D){
    return (ctx.canvas.width - (this.cols * this.cellSize)) / 2;
  }

  public getBorderIntervalY(ctx:CanvasRenderingContext2D){
    return (ctx.canvas.height - (this.rows * this.cellSize)) / 2;
  }

  public getStartX(ctx:CanvasRenderingContext2D){
    return ctx.canvas.getBoundingClientRect().x+this.getBorderIntervalX(ctx);
  }

  public getStartY(ctx:CanvasRenderingContext2D){
    return ctx.canvas.getBoundingClientRect().y+this.getBorderIntervalY(ctx);
  }


  // is responsible for placing a pipe in a specific cell of the grid.
  public placePipe(row: number, col: number, pipe: Pipe): boolean {
    if (this.cells[row][col].blocked || this.cells[row][col].pipe) {
      return false;
    }

    this.cells[row][col].pipe = pipe;
    return true;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.cols * this.cellSize, this.rows * this.cellSize ); 

    const borderIntervalX =  this.getBorderIntervalX(ctx)// Calcula a posição X para centralizar
    const borderIntervalY = this.getBorderIntervalY(ctx); // Calcula a posição Y para centralizar

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const cell = this.cells[row][col];
        const x = borderIntervalX + col * this.cellSize; // Usa a posição X centralizada
        const y = borderIntervalY + row * this.cellSize; // Usa a posição Y centralizada

        // Draw blocked cell
        if (cell.blocked) {
          ctx.fillStyle = "gray";
          ctx.fillRect(x, y, this.cellSize, this.cellSize);
        }

        // Draw pipe
        if (cell.pipe) {
          cell.pipe.drawPipe(ctx, x, y, this.cellSize);
        }

        // Cell border
        ctx.strokeStyle = "black";
        ctx.strokeRect(x, y, this.cellSize, this.cellSize);
      }
    }
  }



}
