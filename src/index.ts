import { Game } from "./classes/Game";
import { GameConfiguration } from "./configuration/gameConfiguration";
import { Grid } from "./classes/Grid";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;

  canvas.width = (GameConfiguration.cols * GameConfiguration.cellSize) + 200
  canvas.height = (GameConfiguration.rows * GameConfiguration.cellSize) + 200

  const queueContainer = document.getElementById("pipe-queue")!;
  const gameStatus = document.getElementById("game-status")!;
  const grid = new Grid(GameConfiguration.rows, GameConfiguration.cols, GameConfiguration.cellSize);

  const game = new Game(canvas, queueContainer, gameStatus, grid);
  game.startGame();
});
