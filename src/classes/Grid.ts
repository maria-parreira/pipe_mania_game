import { Pipe } from './Pipe';


/*
A Grid utiliza uma matriz bidimensional (cells) para armazenar o estado de cada célula.
Cada célula é representada por um objeto que possui as propriedades pipe, blocked e water. 
*/


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
    const blockedIndices = this.generateBlockedIndices(); // Bloqueia primeiro 10% das células
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

  // O método createGrid retorna uma matriz bidimensional que representa o estado da grade (grid). 
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


  // Método para obter uma célula e alterar o pipe que está nessa célula
  public setCellPipe(row: number, col: number, newPipe: Pipe): boolean {
    const cell = this.cells[row][col];
    if (cell.blocked) {
      return false; // Não pode alterar o pipe se a célula estiver bloqueada
    }
    cell.pipe = newPipe; // Altera o pipe na célula
    return true; // Sucesso na alteração
  }


  public drawGrid(ctx: CanvasRenderingContext2D) {
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
