import { Game } from "./Classes/Game";

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
  const queueContainer = document.getElementById("pipe-queue")!;
  const gameStatus = document.getElementById("game-status")!;

  const game = new Game(canvas, queueContainer, gameStatus);
  game.startGame();
});
