import { images } from "../configuration/gameConfiguration";
import { Cell } from "./Cell";
import { Direction } from "./Direction";
import { Pipe } from './Pipe';
import { PipeType } from "./PipeType";
import { RegularPipe } from "./RegularPipe";
import { StartPipe } from "./StartPipe";
import { WaterPipe } from "./WaterPipe";

/**
 * The Grid class represents a two-dimensional grid structure that manages the state of each cell.
 * Each cell can contain a pipe, be blocked, or have water. The grid is initialized with a specified
 * number of rows and columns, and a cell size. It provides methods to manipulate and render the grid,
 * including setting pipes in cells and drawing the grid on a canvas.
 */

export class Grid {
    static readonly YELLOW = "yellow";
    static readonly BLOCKED_CELLS_PERCENTAGE = 0.1;
    static readonly LINE_WIDTH = 3;

    private rows: number;
    private cols: number;
    private cellSize: number;
    private cells: Cell[][];
    private initialPipePosition: { row: number; col: number } | null = null;
    private initialPipe: Pipe | null = null;

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
        const blockedCount = Math.floor(totalCells * Grid.BLOCKED_CELLS_PERCENTAGE);
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

    public getInitialPipePosition() {
        return this.initialPipePosition;
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

        ctx.strokeStyle = Grid.YELLOW;
        ctx.lineWidth = Grid.LINE_WIDTH;
        
        ctx.strokeRect(x, y, this.cellSize, this.cellSize);
    }

    public drawInitialPipe(ctx: CanvasRenderingContext2D, cellSize: number) {
        if (!this.initialPipePosition) {
            this.initializeInitialPipe();
        }

        if (this.initialPipePosition) {
            const { x, y } = this.getCellPosition(this.initialPipePosition.row, this.initialPipePosition.col, ctx);
            this.initialPipe?.draw(ctx, x, y, cellSize);
            this.blockCellAtInitialPipe();
        }
    }

    private initializeInitialPipe() {
        if (!this.initialPipe) {
            this.initialPipe = new StartPipe();
        }

        this.initialPipePosition = this.generateRandomStartingCellCoordinates(this.initialPipe.getType());


        const { row, col } = this.initialPipePosition;
        this.cells[row][col].setPipe(this.initialPipe);
    }

    private blockCellAtInitialPipe() {
        const { row, col } = this.initialPipePosition!;
        this.cells[row][col]?.setBlocked(true);
    }

    private generateRandomStartingCellCoordinates(initialPipeType: PipeType): { row: number, col: number } {
        const rows = this.cells.length - 2;
        const cols = this.cells[0].length - 2;

        let randomRow = 0;
        let randomCol = 0;

        while(true){
            randomRow = Math.floor(Math.random() * rows) + 1;
            randomCol = Math.floor(Math.random() * cols) + 1;

            if(initialPipeType == PipeType.StartUp && this.cells[randomRow-1][randomCol].isBlocked()){
                continue;
            }
            if(initialPipeType == PipeType.StartLeft && this.cells[randomRow][randomCol-1].isBlocked()){
                continue;
            }
            if(initialPipeType == PipeType.StartDown && this.cells[randomRow+1][randomCol].isBlocked()){
                continue;
            }
            if(initialPipeType == PipeType.StartRight && this.cells[randomRow][randomCol+1].isBlocked()){
                continue;
            }
            break;
        }

        return { row: randomRow, col: randomCol };
    }

    public async updateAdjacentCellsWithWater(ctx: CanvasRenderingContext2D, row: number, col: number): Promise<void> {
        const possibleConnections = this.getPossibleConnectionsToAdjacentPipes(this.cells[row][col]) || [];

        if (possibleConnections.length === 0) {
            this.notifyGameOver();
            return;
        }

        for (const cell of possibleConnections) {
            await this.updateAdjacentCellWithWaterPipe(ctx, row, col, cell);
        }
    }

    private onGameOverCallback?: () => void;

    public setOnGameOverCallback(callback: () => void) {
        this.onGameOverCallback = callback;
    }

    private notifyGameOver() {
        if (this.onGameOverCallback) {
            this.onGameOverCallback();
        }
    }

    public reset() {
        this.cells.forEach(row => row.forEach(cell => {
            cell.clearPipe();
        }));
    }

    private async updateAdjacentCellWithWaterPipe(ctx: CanvasRenderingContext2D, row: number, col: number, adjacent: Cell): Promise<void> {
        const adjacentCellRow = adjacent.getRow();
        const adjacentCellCol = adjacent.getCol();

        const direction = this.getDirection(adjacentCellRow, adjacentCellCol, row, col);
        const currentPipe = this.cells[row][col].getPipe();
        const adjacentPipe = this.cells[adjacentCellRow][adjacentCellCol].getPipe();

        if (this.arePipesCompatible(currentPipe!, adjacentPipe!, direction!)) {
            const waterPipe = new WaterPipe(adjacentPipe!.getType(), direction!);
            this.cells[adjacentCellRow][adjacentCellCol].setPipe(waterPipe);

            await waterPipe.fillPipeWithWater(() => {
                this.notifyPipeFilled();
            });

            this.drawCellAndPipe(ctx, row, col);
            this.drawCellAndPipe(ctx, adjacentCellRow, adjacentCellCol);
            await this.updateAdjacentCellsWithWater(ctx, adjacentCellRow, adjacentCellCol);
        }
    }

    private onPipeFilledCallback?: () => void;

    public setOnPipeFilledCallback(callback: () => void) {
        this.onPipeFilledCallback = callback;
    }

    private notifyPipeFilled() {
        if (this.onPipeFilledCallback) {
            this.onPipeFilledCallback();
        }
    }

    private arePipesCompatible(currentPipe: Pipe, adjacentPipe: Pipe, direction: Direction): boolean {
        const compatibilityMap: Record<PipeType, Record<string, boolean>> = {
            [PipeType.Vertical]: { up: true, down: true },
            [PipeType.Horizontal]: { left: true, right: true },
            [PipeType.Cross]: { up: true, down: true, left: true, right: true },
            [PipeType.CurvedBottomLeft]: { up: false, down: true, left: true, right: false },
            [PipeType.CurvedBottomRight]: { up: false, down: true, left: false, right: true },
            [PipeType.CurvedTopLeft]: { up: true, down: false, left: true, right: false },
            [PipeType.CurvedTopRight]: { up: true, down: false, left: false, right: true },
            [PipeType.StartUp]: { up: true },
            [PipeType.StartDown]: { down: true },
            [PipeType.StartLeft]: { left: true },
            [PipeType.StartRight]: { right: true }
        };

        return compatibilityMap[currentPipe.getType()]?.[direction] &&
            compatibilityMap[adjacentPipe.getType()]?.[this.getOppositeDirection(direction)];
    }

    private getDirection(adjacentCellRow: number, adjacentCellCol: number, row: number, col: number): Direction | null {
        if (adjacentCellRow < row) return Direction.Up;
        if (adjacentCellRow > row) return Direction.Down;
        if (adjacentCellCol > col) return Direction.Right;
        if (adjacentCellCol < col) return Direction.Left;
        return null;
    }

    private getOppositeDirection(direction: string): string {
        const opposites: Record<string, string> = {
            up: Direction.Down,
            down: Direction.Up,
            left: Direction.Right,
            right: Direction.Left
        };
        return opposites[direction];
    }

    private getPossibleConnectionsToAdjacentPipes(currentCell: Cell) {
        const possibleConnections: Cell[] = [];
        const row = currentCell.getRow();
        const col = currentCell.getCol();
        const currentPipeType = currentCell.getPipe()?.getType();

        const adjacentCells: Record<string, Cell | null> = this.getAdjacentCells(row, col);
        if (currentPipeType === PipeType.Horizontal || currentPipeType === PipeType.StartLeft || currentPipeType === PipeType.StartRight) {
            if (adjacentCells.adjacentRight?.getPipe() instanceof RegularPipe && this.containsPipe(row, col + 1)) {
                possibleConnections.push(this.cells[row][col + 1]);
            }
            if (adjacentCells.adjacentLeft?.getPipe() instanceof RegularPipe && this.containsPipe(row, col - 1)) {
                possibleConnections.push(this.cells[row][col - 1]);
            }
        } else if (currentPipeType === PipeType.Vertical || currentPipeType === PipeType.StartUp || currentPipeType === PipeType.StartDown) {
            if (adjacentCells.adjacentBot?.getPipe() instanceof RegularPipe && this.containsPipe(row + 1, col)) {
                possibleConnections.push(this.cells[row + 1][col]);
            }
            if (adjacentCells.adjacentTop?.getPipe() instanceof RegularPipe && this.containsPipe(row - 1, col)) {
                possibleConnections.push(this.cells[row - 1][col]);
            }
        } else if (currentPipeType === PipeType.Cross) {
            if (adjacentCells.adjacentBot?.getPipe() instanceof RegularPipe && this.containsPipe(row + 1, col)) {
                possibleConnections.push(this.cells[row + 1][col]);
            }
            if (adjacentCells.adjacentTop?.getPipe() instanceof RegularPipe && this.containsPipe(row - 1, col)) {
                possibleConnections.push(this.cells[row - 1][col]);
            }
            if (adjacentCells.adjacentRight?.getPipe() instanceof RegularPipe && this.containsPipe(row, col + 1)) {
                possibleConnections.push(this.cells[row][col + 1]);
            }
            if (adjacentCells.adjacentLeft?.getPipe() instanceof RegularPipe && this.containsPipe(row, col - 1)) {
                possibleConnections.push(this.cells[row][col - 1]);
            }
        } else if (currentPipeType === PipeType.CurvedBottomLeft) {
            if (adjacentCells.adjacentBot?.getPipe() instanceof RegularPipe && this.containsPipe(row + 1, col)) {
                possibleConnections.push(this.cells[row + 1][col]);
            }
            if (adjacentCells.adjacentLeft?.getPipe() instanceof RegularPipe && this.containsPipe(row, col - 1)) {
                possibleConnections.push(this.cells[row][col - 1]);
            }
        } else if (currentPipeType === PipeType.CurvedBottomRight) {
            if (adjacentCells.adjacentBot?.getPipe() instanceof RegularPipe && this.containsPipe(row + 1, col)) {
                possibleConnections.push(this.cells[row + 1][col]);
            }
            if (adjacentCells.adjacentRight?.getPipe() instanceof RegularPipe && this.isValidCell(row, col + 1) && this.containsPipe(row, col + 1)) {
                possibleConnections.push(this.cells[row][col + 1]);
            }
        } else if (currentPipeType === PipeType.CurvedTopLeft) {
            if (adjacentCells.adjacentTop?.getPipe() instanceof RegularPipe && this.containsPipe(row - 1, col)) {
                possibleConnections.push(this.cells[row - 1][col]);
            }
            if (adjacentCells.adjacentLeft?.getPipe() instanceof RegularPipe && this.containsPipe(row, col - 1)) {
                possibleConnections.push(this.cells[row][col - 1]);
            }
        } else if (currentPipeType === PipeType.CurvedTopRight) {
            if (adjacentCells.adjacentTop?.getPipe() instanceof RegularPipe && this.containsPipe(row - 1, col)) {
                possibleConnections.push(this.cells[row - 1][col]);
            }
            if (adjacentCells.adjacentRight?.getPipe() instanceof RegularPipe && this.containsPipe(row, col + 1)) {
                possibleConnections.push(this.cells[row][col + 1]);
            }
        }

        return possibleConnections;
    }

    private getAdjacentCells(row: number, col: number): Record<string, Cell | null> {
        const top = this.isValidCell(row - 1, col) ? this.cells[row - 1][col] : null;
        const bot = this.isValidCell(row + 1, col) ? this.cells[row + 1][col] : null;
        const left = this.isValidCell(row, col - 1) ? this.cells[row][col - 1] : null;
        const right = this.isValidCell(row, col + 1) ? this.cells[row][col + 1] : null;

        return {
            adjacentTop: top,
            adjacentBot: bot,
            adjacentLeft: left,
            adjacentRight: right
        };
    }

    private isValidCell(row: number, col: number): boolean {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols && !this.cells[row][col].isBlocked();
    }

    private containsPipe(row: number, col: number) {
        return this.cells[row][col].getPipe();
    }

    public getGridCell(row: number, col: number): Cell {
        return this.cells[row][col];
    }

}
