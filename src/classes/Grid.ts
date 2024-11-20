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
  private startPipePosition: { x: number; y: number } | null = null;

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

  public getStartX(ctx:CanvasRenderingContext2D){
    return ctx.canvas.getBoundingClientRect().x+this.getBorderIntervalX(ctx);
  }

  private getBorderIntervalX(ctx:CanvasRenderingContext2D){
    return (ctx.canvas.width - (this.cols * this.cellSize)) / 2;
  }

  public getStartY(ctx:CanvasRenderingContext2D){
    return ctx.canvas.getBoundingClientRect().y+this.getBorderIntervalY(ctx);
  }

  private getBorderIntervalY(ctx:CanvasRenderingContext2D){
    return (ctx.canvas.height - (this.rows * this.cellSize)) / 2;
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
    ctx.clearRect(0, 0, this.cols * this.cellSize, this.rows * this.cellSize);

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.drawCell(ctx, row, col); // Chama o método para desenhar a célula
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

    // Desenha o pipe
    if (cell.pipe) {
      cell.pipe.drawPipe(ctx, x, y, this.cellSize);
    }

    // Borda da célula
    ctx.strokeStyle = "black";
    ctx.strokeRect(x, y, this.cellSize, this.cellSize);
  }

  private getCellPosition(row: number, col: number, ctx: CanvasRenderingContext2D) {
    const { borderIntervalX, borderIntervalY } = this.getBorderIntervals(ctx);
    return this.getGridCoordinate(row, col, borderIntervalX, borderIntervalY);
  }

  private getBorderIntervals(ctx: CanvasRenderingContext2D){
    const borderIntervalX = this.getBorderIntervalX(ctx); 
    const borderIntervalY = this.getBorderIntervalY(ctx);
    return { borderIntervalX, borderIntervalY };
  }

  private getGridCoordinate(row: number, col: number, borderIntervalX: number, borderIntervalY: number){
    const x = borderIntervalX + col * this.cellSize;
    const y = borderIntervalY + row * this.cellSize;
    return { x, y }
  }

  public drawStartPipeInGrid(ctx: CanvasRenderingContext2D, cellSize: number) {
    if (!this.startPipePosition) {
      const rows = this.cells.length;
      const cols = this.cells[0].length;

      let cellFound = false;
      
      const { borderIntervalX, borderIntervalY } = this.getBorderIntervals(ctx);
      
      while (!cellFound) {
        const randomRow = Math.floor(Math.random() * rows);
        const randomCol = Math.floor(Math.random() * cols);

        // Verifica se a célula não está bloqueada e não está na última linha
        if (!this.cells[randomRow][randomCol].blocked && randomRow < rows - 1) {
          const { x, y } = this.getGridCoordinate(randomRow, randomCol, borderIntervalX, borderIntervalY)

          this.startPipePosition = { x, y }; // Salva a posição inicial
          cellFound = true;
        }
      }
    }

    // Garante que a posição salva será usada para desenhar o start pipe
    const { x, y } = this.startPipePosition!;
    const pipe = new Pipe(); // Cria uma nova instância de Pipe
    pipe.drawStartPipe(ctx, x, y, cellSize); // Desenha o start pipe na célula salva
  }
}

