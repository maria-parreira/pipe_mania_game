import { Cell } from "./Cell";

export class WaterFlow {
    private currentCell: Cell = new Cell(0,0); // ou outra inicialização apropriada
    private visitedCells: Cell[]; // Cells already visited by the water.
    private timer: number; // The time between each step of the flow.
    private flowInterval: ReturnType<typeof setInterval> | null; // To store the flow interval.

    constructor() {
        this.visitedCells = [];
        this.timer = 1000; // Example time in milliseconds
        this.flowInterval = null; // Initializes as null
    }

    startFlow(startingCell: Cell) {
        this.currentCell = startingCell;
        this.visitedCells.push(startingCell);
        
        // Starts the flow after a small delay
        setTimeout(() => {
            this.flowInterval = setInterval(() => {
                this.stepFlow();
            }, this.timer);
        }, 500); // Delay of 500ms before starting the flow
    }

    stepFlow() {
        // Logic to move the water to the next cell
        // Example: check adjacent cells and move to a valid cell
        // If there are no more valid cells, stop the flow
    }

    isFlowValid(cell: Cell): boolean {
        // Logic to check if the cell is valid
        return true; // Example, should be implemented correctly
    }

    stopFlow() {
        if (this.flowInterval) {
            clearInterval(this.flowInterval);
            this.flowInterval = null; // Clears the interval
        }
    }
}
