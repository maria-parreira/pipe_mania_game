import { waterImages } from "@/configuration/gameConfiguration";
import { Pipe, PipeType } from "./Pipe";
import { Grid } from "./Grid";

export class WaterPipe {
  private pipe: Pipe;
  private grid : Grid;
  private ctx: CanvasRenderingContext2D;

  constructor(pipe: Pipe, grid: Grid, ctx: CanvasRenderingContext2D) {
    this.pipe = pipe;
    this.grid = grid;
    this.ctx = ctx;
  }

  public drawWaterPipe(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    let images: HTMLImageElement[];
    switch (this.pipe.getType()) {
      case "horizontal":
        images = [waterImages.horizontal33, waterImages.horizontal66, waterImages.horizontal100]
        this.drawFillingPipeWithWater(ctx, x, y, size, images);
        break;
      case "vertical":
        images = [waterImages.vertical33, waterImages.vertical66, waterImages.vertical100]
        break;
      case "curvedBottomRight":
        images = [waterImages.curvedTopBR33, waterImages.curvedTopBR66, waterImages.curvedTopBR100]
        this.drawFillingPipeWithWater(ctx, x, y, size, images);
        break;
      case "curvedBottomLeft":
        images = [waterImages.curvedBottomTR33, waterImages.curvedBottomTR66, waterImages.curvedBottomTR100]
        this.drawFillingPipeWithWater(ctx, x, y, size, images);
        break;
      case "curvedTopRight":
        images = [waterImages.curvedTopBL33, waterImages.curvedTopBL66, waterImages.curvedTopBL100]
        this.drawFillingPipeWithWater(ctx, x, y, size, images);
        break;
      case "curvedTopLeft":
        images = [waterImages.curvedTopBL33, waterImages.curvedTopBL66, waterImages.curvedTopBL100]
        this.drawFillingPipeWithWater(ctx, x, y, size, images);
        break;
      case "cross":
        images = [waterImages.cross33H, waterImages.cross66H, waterImages.cross100H]
        this.drawFillingPipeWithWater(ctx, x, y, size, images);
        break;
      default:
        throw new Error("invalid pipe type");
    }
  }

  private drawFillingPipeWithWater(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, images: HTMLImageElement[] ){
    let fillLevel = 0; // 0: empty, 1: 33%, 2: 66%, 3: 100%

    const draw = () => {
      if (fillLevel < images.length) {
        ctx.drawImage(images[fillLevel], x, y, size, size);
        fillLevel++;
        setTimeout(draw, 500);
      }
    };

    draw();
  }

  public fillWithWater(){
    this.pipe.getContainsWater();
  }

  public flowWaterFromCell(row: number, col: number) {
    const cell = this.grid.getGridCell(row, col);
    console.log("Célula inicial:", cell);
    if (cell && !cell.isBlocked() && cell.getPipe()) {
        const ctx = this.ctx;
        cell.fillPipeWithWater(ctx); // Preenche a célula com água
  
        // Verifica as direções possíveis para o fluxo de água
        const currentPipe = cell.getPipe();
        const possibleDirections = currentPipe?.getPossibleConnectionsToAdjacentPipes();
  
        // Verifica se possibleDirections está definido antes de iterar
        if (possibleDirections) {
            for (const direction of possibleDirections) {
                let adjacentRow = row;
                let adjacentCol = col;
  
                // Determina a célula adjacente com base na direção
                switch (direction) {
                    case "top":
                        adjacentRow--;
                        break;
                    case "bottom":
                        adjacentRow++;
                        break;
                    case "right":
                        adjacentCol++;
                        break;
                    case "left":
                        adjacentCol--;
                        break;
                }
  
                // Verifica se a célula adjacente é válida e se pode receber água
                if (this.grid.isValidCell(adjacentRow, adjacentCol)) {
                    const adjacentCell = this.grid.getGridCell(adjacentRow, adjacentCol);
                    if (adjacentCell && !adjacentCell.isBlocked() && adjacentCell.getPipe()) {
                        this.grid.updateAdjacentCellWithWater(ctx, adjacentRow, adjacentCol); // Atualiza a célula adjacente
                    }
                }
            }
        }
    }
  }



}
