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
    let blockedCount = 0; 

    for (let row = 0; row < this.rows; row++) {
      const gridRow: { pipe: Pipe | null; blocked: boolean; water: boolean }[] = [];
      for (let col = 0; col < this.cols; col++) {
        const isBlocked = blockedCount === 8 && Math.random() < 0.1; // block only 8 cells
        if (isBlocked) {
          blockedCount++;
        }
        gridRow.push({
          pipe: null,
          blocked: isBlocked,
          water: false,
        });
      }
      this.cells.push(gridRow);
    }
  }


  /*
  renders the grid of cells on the canvas, drawing each cell according to its state (blocked, 
  containing pipe or water) and adding a border around each cell. It ensures that the grid visualization 
  is updated whenever the method is called, allowing changes in the state of the cells to be 
  reflected graphically.
  */

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.cols * this.cellSize, this.rows * this.cellSize);

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const cell = this.cells[row][col];
        const x = col * this.cellSize;
        const y = row * this.cellSize;

        // Draw blocked cell
        if (cell.blocked) {
          ctx.fillStyle = "gray";
          ctx.fillRect(x, y, this.cellSize, this.cellSize);
        }

        // Draw pipe
        if (cell.pipe) {
          cell.pipe.draw(ctx, x, y, this.cellSize);
        }

        // Draw water
        if (cell.water) {
          ctx.fillStyle = "rgba(0, 0, 255, 0.5)";
          ctx.fillRect(x + 10, y + 10, this.cellSize - 20, this.cellSize - 20);
        }

        // Cell border
        ctx.strokeStyle = "black";
        ctx.strokeRect(x, y, this.cellSize, this.cellSize);
      }
    }
  }

  // is responsible for placing a pipe in a specific cell of the grid.
  public placePipe(row: number, col: number, pipe: Pipe): boolean {
    if (this.cells[row][col].blocked || this.cells[row][col].pipe) {
      return false;
    }

    this.cells[row][col].pipe = pipe;
    return true;
  }

  
}
