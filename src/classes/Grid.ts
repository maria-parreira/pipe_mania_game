import { images } from "../configuration/gameConfiguration";
import { Cell } from "./Cell";
import { Pipe } from './Pipe';
import { PipeType } from "./PipeType";
import { StartPipe } from "./StartPipe";
import { WaterPipe } from "./WaterPipe";

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

    public getInitialPipePosition(){
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

        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 3;
        ctx.strokeRect(x, y, this.cellSize, this.cellSize);
    }

    public drawInitialPipe(ctx: CanvasRenderingContext2D, cellSize: number) {
        if (!this.initialPipePosition) {
            this.initializeInitialPipe(ctx);
        }

        if (this.initialPipePosition) {
            const { x, y } = this.getCellPosition(this.initialPipePosition.row, this.initialPipePosition.col, ctx);

            this.initialPipe?.draw(ctx, x, y, cellSize);

            this.blockCellAtInitialPipe(ctx);
        }
    }

    private initializeInitialPipe(ctx: CanvasRenderingContext2D) {
        let cellFound = false;

        this.initialPipePosition = this.generateRandomStartingCellCoordinates();

        if (!this.initialPipe) {
            this.initialPipe = new StartPipe();
        }

        const {row, col} = this.initialPipePosition;

        this.cells[row][col].setPipe(this.initialPipe)
    }

    private blockCellAtInitialPipe(ctx: CanvasRenderingContext2D) {
            const { row, col } = this.initialPipePosition!;
            this.cells[row][col]?.setBlocked(true);
    }

    private generateRandomStartingCellCoordinates(): { row: number, col: number} {
        const rows = this.cells.length - 2;
        const cols = this.cells[0].length - 2;

        const randomRow = Math.floor(Math.random() * rows)+1;
        const randomCol = Math.floor(Math.random() * cols)+1;

        return { row: randomRow, col: randomCol };
    }

    // Função para atualizar o estado da célula adjacente e desenhar o water pipe
    public updateAdjacentCellsWithWater(ctx: CanvasRenderingContext2D, row: number, col: number): void {
        debugger;
        this.updateAdjacentConnections(ctx, row, col);
    }

    private updateAdjacentConnections(ctx: CanvasRenderingContext2D, row: number, col: number): void {
        const possibleConnections = this.getPossibleConnectionsToAdjacentPipes(this.cells[row][col]) || [];

        for (const cell of possibleConnections) {
            this.updateAdjacentCellWithWaterPipe(ctx,row, col, cell);
        }
    }

    private updateAdjacentCellWithWaterPipe(ctx: CanvasRenderingContext2D, row: number, col: number, adjacent: Cell): void{
       debugger;
        const adjacentCellRow = adjacent.getRow();
        const adjacentCellCol = adjacent.getCol();

        const direction = this.getDirection(adjacentCellRow, adjacentCellCol, row, col);
        const currentPipeType = this.cells[row][col].getPipe()?.getType();
        const adjacentPipeType = this.cells[adjacentCellRow][adjacentCellCol].getPipe()?.getType();

        let waterPipe: WaterPipe | null = null;
        if( adjacentPipeType != null){
            switch (direction) {
                case "up":
                    if(currentPipeType == PipeType.StartUp || currentPipeType == PipeType.Vertical || currentPipeType == PipeType.Cross || currentPipeType == PipeType.CurvedBottomLeft || currentPipeType == PipeType.CurvedTopRight){
                        waterPipe = new WaterPipe(adjacentPipeType);
                        break;
                    }
                case "down":
                    if(currentPipeType == PipeType.StartDown || currentPipeType == PipeType.Vertical || currentPipeType == PipeType.Cross|| currentPipeType == PipeType.CurvedBottomRight || currentPipeType == PipeType.CurvedTopLeft){
                        waterPipe = new WaterPipe(adjacentPipeType);
                        break;
                    }            
                case "right":
                    if(currentPipeType == PipeType.StartRight || currentPipeType == PipeType.Horizontal || currentPipeType == PipeType.Cross || currentPipeType == PipeType.CurvedBottomRight || currentPipeType == PipeType.CurvedTopRight){
                        waterPipe = new WaterPipe(adjacentPipeType);
                        break;
                    }            
                case "left":
                    if(currentPipeType == PipeType.StartLeft || currentPipeType == PipeType.Horizontal || currentPipeType == PipeType.Cross || currentPipeType == PipeType.CurvedBottomLeft || currentPipeType == PipeType.CurvedTopLeft){
                        waterPipe = new WaterPipe(adjacentPipeType);
                        break;
                    }    
            }
        }
        
        if(waterPipe){
            this.cells[adjacentCellRow][adjacentCellCol].setPipe(waterPipe);
            const { x, y} = this.getCellPosition(adjacentCellRow,adjacentCellCol,ctx);
            waterPipe.fillPipeWithWater()
            //this.cells[adjacentCellRow][adjacentCellCol].setBlocked(true);
        }
    }

    private getDirection(adjacentCellRow: number, adjacentCellCol: number, row:number, col:number): String{
        if(adjacentCellRow - row < 0){
            return "up";
        }
        else if(adjacentCellRow - row > 0){
            return "down";
        }
        else if(adjacentCellCol - col > 0){
            return "right";
        }
        else if(adjacentCellRow - row < 0){
            return"left";
        }
        return "";
    }

    private getPossibleConnectionsToAdjacentPipes(currentCell: Cell) {
        const possibleConnections: Cell[] = [];
        const row = currentCell.getRow();
        const col = currentCell.getCol();

        if(this.isValidCell(row+1,col) && this.containsPipe(row+1,col)){
            possibleConnections.push(this.cells[row+1][col]);
        }
        if(this.isValidCell(row-1,col) && this.containsPipe(row-1,col)){
            possibleConnections.push(this.cells[row-1][col]);
        }
        if(this.isValidCell(row,col+1) && this.containsPipe(row,col+1)){
            possibleConnections.push(this.cells[row][col+1]);
        }
        if(this.isValidCell(row,col-1) && this.containsPipe(row,col-1)){
            possibleConnections.push(this.cells[row][col-1]);
        }

        return possibleConnections;
    }

    private isValidCell(row: number, col: number): boolean {
        return !this.cells[row][col].isBlocked() && row >= 0 && row < this.rows && col >= 0 && col < this.cols; 
    }

    private containsPipe(row:number, col: number){
        return this.cells[row][col].getPipe();
    }

    public getGridCell(row: number, col: number): Cell {
        return this.cells[row][col];
    }
}

