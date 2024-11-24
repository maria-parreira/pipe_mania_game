﻿import { images } from "../configuration/gameConfiguration";
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
        this.updateAdjacentConnections(ctx, row, col);
    }

    private updateAdjacentConnections(ctx: CanvasRenderingContext2D, row: number, col: number): void {
        debugger;
        const possibleConnections = this.getPossibleConnectionsToAdjacentPipes(this.cells[row][col]) || [];

        for (const cell of possibleConnections) {
            this.updateAdjacentCellWithWaterPipe(ctx,row, col, cell);
        }
    }

    // refatorar este metodo para devolver coordenadas do pipe 

    private updateAdjacentCellWithWaterPipe(ctx: CanvasRenderingContext2D, row: number, col: number, adjacent: Cell): void{
        const adjacentCellRow = adjacent.getRow();
        const adjacentCellCol = adjacent.getCol();

        const direction = this.getDirection(adjacentCellRow, adjacentCellCol, row, col);
        const currentPipe = this.cells[row][col].getPipe();
        const adjacentPipe = this.cells[adjacentCellRow][adjacentCellCol].getPipe();
        
        if (this.arePipesCompatible(currentPipe, adjacentPipe, direction)) {

            const waterPipe = new WaterPipe(adjacentPipe!.getType()); // Garantimos que o adjacente é válido aqui
            this.cells[adjacentCellRow][adjacentCellCol].setPipe(waterPipe);
            waterPipe.fillPipeWithWater()
    
            this.updateAdjacentCellsWithWater(ctx, adjacentCellRow, adjacentCellCol);
        }
    }

        // Novo método para verificar compatibilidade entre pipes
    private arePipesCompatible(currentPipe: Pipe | null, adjacentPipe: Pipe | null, direction: string): boolean {
        if (!currentPipe || !adjacentPipe) return false;
    
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
    
        // Verifica se a direção é compatível no pipe atual e no pipe adjacente
        return compatibilityMap[currentPipe.getType()]?.[direction] && 
                compatibilityMap[adjacentPipe.getType()]?.[this.getOppositeDirection(direction)];
    }


    private getDirection(adjacentCellRow: number, adjacentCellCol: number, row: number, col: number): string {
        if (adjacentCellRow < row) return "up";
        if (adjacentCellRow > row) return "down";
        if (adjacentCellCol > col) return "right";
        if (adjacentCellCol < col) return "left";
        return "";
    }
        
    private getOppositeDirection(direction: string): string {
        const opposites: Record<string, string> = {
            up: "down",
            down: "up",
            left: "right",
            right: "left"
        };
        return opposites[direction];
    }

    //CROSS NAO ESTA A DAR AINDA
    private getPossibleConnectionsToAdjacentPipes(currentCell: Cell) {
        debugger;
        const possibleConnections: Cell[] = [];
        const row = currentCell.getRow();
        const col = currentCell.getCol();
        const currentPipeType = currentCell.getPipe()?.getType();

        // Verifica a direção com base no tipo do pipe
        if (currentPipeType === PipeType.Horizontal || currentPipeType === PipeType.StartLeft || currentPipeType === PipeType.StartRight) {
            // Procura apenas na mesma linha
            if (this.isValidCell(row, col + 1) && this.containsPipe(row, col + 1)) {
                possibleConnections.push(this.cells[row][col + 1]);
            }
            if (this.isValidCell(row, col - 1) && this.containsPipe(row, col - 1)) {
                possibleConnections.push(this.cells[row][col - 1]);
            }
        } else if (currentPipeType === PipeType.Vertical || currentPipeType === PipeType.StartUp || currentPipeType === PipeType.StartDown) {
            // Procura apenas na mesma coluna
            if (this.isValidCell(row + 1, col) && this.containsPipe(row + 1, col)) {
                possibleConnections.push(this.cells[row + 1][col]);
            }
            if (this.isValidCell(row - 1, col) && this.containsPipe(row - 1, col)) {
                possibleConnections.push(this.cells[row - 1][col]);
            }
        } else if (currentPipeType === PipeType.Cross) {
            // Se for um cruzamento, procura em todas as direções
            if (this.isValidCell(row + 1, col) && this.containsPipe(row + 1, col)) {
                possibleConnections.push(this.cells[row + 1][col]);
            }
            if (this.isValidCell(row - 1, col) && this.containsPipe(row - 1, col)) {
                possibleConnections.push(this.cells[row - 1][col]);
            }
            if (this.isValidCell(row, col + 1) && this.containsPipe(row, col + 1)) {
                possibleConnections.push(this.cells[row][col + 1]);
            }
            if (this.isValidCell(row, col - 1) && this.containsPipe(row, col - 1)) {
                possibleConnections.push(this.cells[row][col - 1]);
            }
        }
        else if (currentPipeType === PipeType.CurvedBottomLeft) {
            // Verifica conexões para CurvedBottomLeft
            if (this.isValidCell(row + 1, col) && this.containsPipe(row + 1, col)) {
                possibleConnections.push(this.cells[row + 1][col]); // Conexão para baixo
            }
            if (this.isValidCell(row, col - 1) && this.containsPipe(row, col - 1)) {
                possibleConnections.push(this.cells[row][col - 1]); // Conexão para a esquerda
            }
        } 
        else if (currentPipeType === PipeType.CurvedBottomRight) {
            // Verifica conexões para CurvedBottomRight
            if (this.isValidCell(row + 1, col) && this.containsPipe(row + 1, col)) {
                possibleConnections.push(this.cells[row + 1][col]); // Conexão para baixo
            }
            if (this.isValidCell(row, col + 1) && this.containsPipe(row, col + 1)) {
                possibleConnections.push(this.cells[row][col + 1]); // Conexão para a direita
            }
        } 
        else if (currentPipeType === PipeType.CurvedTopLeft) {
            // Verifica conexões para CurvedTopLeft
            if (this.isValidCell(row - 1, col) && this.containsPipe(row - 1, col)) {
                possibleConnections.push(this.cells[row - 1][col]); // Conexão para cima
            }
            if (this.isValidCell(row, col - 1) && this.containsPipe(row, col - 1)) {
                possibleConnections.push(this.cells[row][col - 1]); // Conexão para a esquerda
            }
        } 
        else if (currentPipeType === PipeType.CurvedTopRight) {
            // Verifica conexões para CurvedTopRight
            if (this.isValidCell(row - 1, col) && this.containsPipe(row - 1, col)) {
                possibleConnections.push(this.cells[row - 1][col]); // Conexão para cima
            }
            if (this.isValidCell(row, col + 1) && this.containsPipe(row, col + 1)) {
                possibleConnections.push(this.cells[row][col + 1]); // Conexão para a direita
            }
        }

        return possibleConnections;
    }

    private isValidCell(row: number, col: number): boolean {
        debugger;
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols && !this.cells[row][col].isBlocked(); 
    }

    private containsPipe(row:number, col: number){
        return this.cells[row][col].getPipe();
    }

    public getGridCell(row: number, col: number): Cell {
        return this.cells[row][col];
    }
}

