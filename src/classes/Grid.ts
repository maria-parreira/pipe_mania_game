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

    public getCellWithStartPoint(){
        return this.cellWithStartPoint;
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

        if (this.cellWithStartPoint) {
            const { x, y } = this.getCellPosition(this.cellWithStartPoint.x, this.cellWithStartPoint.y, ctx);

            this.startPoint?.drawStartPoint(ctx, x, y, cellSize);

            this.blockCellAtStartPoint(ctx);
        }
    }

    private initializeStartPoint(ctx: CanvasRenderingContext2D) {
        let cellFound = false;

        const { row: randomRow, col: randomCol } = this.generateRandomStartingCellCoordinates();
        this.cellWithStartPoint = { x: randomRow, y: randomCol };

        if (!this.startPoint) {
            this.startPoint = new StartPoint();
        }
    }

    private blockCellAtStartPoint(ctx: CanvasRenderingContext2D) {
            const { x, y } = this.cellWithStartPoint!;
            this.cells[x][y]?.setBlocked(true);
    }

   
    public isValidCell(row: number, col: number): Boolean {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }



    private generateRandomStartingCellCoordinates(): { row: number, col: number} {
        const rows = this.cells.length - 2;
        const cols = this.cells[0].length - 2;

        const randomRow = Math.floor(Math.random() * rows)+1;
        const randomCol = Math.floor(Math.random() * cols)+1;

        return { row: randomRow, col: randomCol };
    }

    // Função para atualizar o estado da célula adjacente e desenhar o water pipe
    public updateAdjacentCellWithWater(ctx: CanvasRenderingContext2D, row: number, col: number): void {
        debugger;
        const adjacentCoordinates = this.hasAdjacentConnections(row, col);
        if (adjacentCoordinates) {
            const { row: adjRow, col: adjCol } = adjacentCoordinates;
            const adjacentCell = this.cells[adjRow][adjCol];

            adjacentCell.fillPipeWithWater(ctx);
        }
    }

    public hasAdjacentConnections(row: number, col: number): { row: number; col: number } | null {
        debugger;
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

    public getAdjacentCellPipe(row: number, col: number, direction: string): [number, number] | null {
        debugger;
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
}

