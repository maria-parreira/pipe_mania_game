/**
 * Game configuration.
 * @typedef {Object} GameConfiguration
 * @property {number} rows - Number of rows in the game.
 * @property {number} cols - Number of columns in the game.
 * @property {number} cellSize - Size of each cell.
 * @property {Object} selectedCell - Selected cell.
 * @property {number} selectedCell.row - Row of the selected cell.
 * @property {number} selectedCell.col - Column of the selected cell.
 */
export const GameConfiguration = {
  rows: 7,
  cols: 9,
  cellSize: 50,
  selectedCell: {
      row: 0,
      col: 0,
  },
};

/**
 * Loads images from an object of image paths.
 */
const loadImages = (imagePaths: { [key: string]: string }) => {
  const images: { [key: string]: HTMLImageElement } = {};
  for (const [key, path] of Object.entries(imagePaths)) {
    const img = new Image();
    img.src = path as string;
    images[key] = img;
  }
  return images;
};

const imagePaths: { [key: string]: string } = {
  vertical: 'assets/pipes/vertical.png',
  horizontal: 'assets/pipes/horizontal.png',
  cross: 'assets/pipes/cross.png',
  curvedBottomRight: 'assets/pipes/curvedBottomRight.png',
  curvedBottomLeft: 'assets/pipes/curvedBottomLeft.png',
  curvedTopRight: 'assets/pipes/curvedTopRight.png',
  curvedTopLeft: 'assets/pipes/curvedTopLeft.png',
  bgcell: 'assets/bgcell.png',
  curvedTopBL66e: 'assets/waterflow/curvedTop/BL/66e.jpeg',
  vertical100: 'assets/waterflow/vertical/100.jpeg',
  vertical66c: 'assets/waterflow/vertical/66c.jpeg',
  vertical66b: 'assets/waterflow/vertical/66b.jpeg',
  vertical33c: 'assets/waterflow/vertical/33c.jpeg',
  horizontal100: 'assets/waterflow/horizontal/100.jpeg',
  horizontal66e: 'assets/waterflow/horizontal/66e.jpeg',
  horizontal66d: 'assets/waterflow/horizontal/66d.jpeg',
  vertical33b: 'assets/waterflow/vertical/33b.jpeg',
  horizontal33e: 'assets/waterflow/horizontal/33e.jpeg',
  horizontal33d: 'assets/waterflow/horizontal/33d.jpeg',
  curvedTopBR100: 'assets/waterflow/curvedTop/BR/100.jpeg',
  curvedTopBR66d: 'assets/waterflow/curvedTop/BR/66d.jpeg',
  curvedTopBR66b: 'assets/waterflow/curvedTop/BR/66b.jpeg',
  curvedTopBR33d: 'assets/waterflow/curvedTop/BR/33d.jpeg',
  curvedTopBR33b: 'assets/waterflow/curvedTop/BR/33b.jpeg',
  curvedTopBL100: 'assets/waterflow/curvedTop/BL/100.jpeg',
  curvedTopBL66b: 'assets/waterflow/curvedTop/BL/66b.jpeg',
  curvedTopBL33e: 'assets/waterflow/curvedTop/BL/33e.jpeg',
  curvedTopBL33b: 'assets/waterflow/curvedTop/BL/33b.jpeg',
  curvedBottomTL100: 'assets/waterflow/curvedBottom/TL/100.jpeg',
  curvedBottomTL66e: 'assets/waterflow/curvedBottom/TL/66e.jpeg',
  curvedBottomTL66c: 'assets/waterflow/curvedBottom/TL/66c.jpeg',
  curvedBottomTL33e: 'assets/waterflow/curvedBottom/TL/33e.jpeg',
  curvedBottomTL33c: 'assets/waterflow/curvedBottom/TL/33c.jpeg',
  curvedBottomTL: 'assets/waterflow/curvedBottom/TL',
  curvedBottom: 'assets/waterflow/curvedBottom',
  cross100V: 'assets/waterflow/cross/100V.jpeg',
  cross66e: 'assets/waterflow/cross/66e.jpeg',
  cross66d: 'assets/waterflow/cross/66d.jpeg',
  cross100H: 'assets/waterflow/cross/100H.jpeg',
  cross33e: 'assets/waterflow/cross/33e.jpeg',
  cross33d: 'assets/waterflow/cross/33d.jpeg',
  curvedBottomTR33c: 'assets/waterflow/curvedBottom/TR/33c.jpeg',
  curvedBottomTR33d: 'assets/waterflow/curvedBottom/TR/33d.jpeg',
  curvedBottomTR66c: 'assets/waterflow/curvedBottom/TR/66c.jpeg',
  curvedBottomTR66d: 'assets/waterflow/curvedBottom/TR/66d.jpeg',
  curvedBottomTR100: 'assets/waterflow/curvedBottom/TR/100.jpeg',
  blockedcell: 'assets/blockedcell.png',
};

/**
 * Loaded water images.
 */
export const waterImages = loadImages({
  vertical100: 'assets/waterflow/vertical/100.jpeg',
  vertical66c: 'assets/waterflow/vertical/66c.jpeg',
  vertical66b: 'assets/waterflow/vertical/66b.jpeg',
  vertical33c: 'assets/waterflow/vertical/33c.jpeg',
  vertical33b: 'assets/waterflow/vertical/33b.jpeg',
  horizontal100: 'assets/waterflow/horizontal/100.jpeg',
  horizontal66e: 'assets/waterflow/horizontal/66e.jpeg',
  horizontal66d: 'assets/waterflow/horizontal/66d.jpeg',
  horizontal33e: 'assets/waterflow/horizontal/33e.jpeg',
  horizontal33d: 'assets/waterflow/horizontal/33d.jpeg',
  curvedTopBR100: 'assets/waterflow/curvedTop/BR/100.jpeg',
  curvedTopBR66d: 'assets/waterflow/curvedTop/BR/66d.jpeg',
  curvedTopBR66b: 'assets/waterflow/curvedTop/BR/66b.jpeg',
  curvedTopBR33d: 'assets/waterflow/curvedTop/BR/33d.jpeg',
  curvedTopBR33b: 'assets/waterflow/curvedTop/BR/33b.jpeg',
  curvedTopBL100: 'assets/waterflow/curvedTop/BL/100.jpeg',
  curvedTopBL66e: 'assets/waterflow/curvedTop/BL/66e.jpeg',
  curvedTopBL66b: 'assets/waterflow/curvedTop/BL/66b.jpeg',
  curvedTopBL33e: 'assets/waterflow/curvedTop/BL/33e.jpeg',
  curvedTopBL33b: 'assets/waterflow/curvedTop/BL/33b.jpeg',
  curvedBottomTR66b: 'assets/waterflow/curvedBottom/TR/66b.jpeg',
  curvedBottomTR100: 'assets/waterflow/curvedBottom/TR/100.jpeg',
  curvedBottomTR66c: 'assets/waterflow/curvedBottom/TR/66c.jpeg',
  curvedBottomTR33d: 'assets/waterflow/curvedBottom/TR/33d.jpeg',
  curvedBottomTR33c: 'assets/waterflow/curvedBottom/TR/33c.jpeg',
  curvedBottomTL100: 'assets/waterflow/curvedBottom/TL/100.jpeg',
  curvedBottomTL66e: 'assets/waterflow/curvedBottom/TL/66e.jpeg',
  curvedBottomTL66c: 'assets/waterflow/curvedBottom/TL/66c.jpeg',
  curvedBottomTL33e: 'assets/waterflow/curvedBottom/TL/33e.jpeg',
  curvedBottomTL33c: 'assets/waterflow/curvedBottom/TL/33c.jpeg',
  cross100V: 'assets/waterflow/cross/100V.jpeg',
  cross100H: 'assets/waterflow/cross/100H.jpeg',
  cross66e: 'assets/waterflow/cross/66e.jpeg',
  cross33e: 'assets/waterflow/cross/33e.jpeg',
  cross33d: 'assets/waterflow/cross/33d.jpeg',
  cross66d: 'assets/waterflow/cross/66d.jpeg',
  cross66b: 'assets/waterflow/cross/66b.jpeg',
  cross33b: 'assets/waterflow/cross/66b.jpeg',
  cross33c: 'assets/waterflow/cross/33c.jpeg',
  cross66c: 'assets/waterflow/cross/66c.jpeg',
});

export const images = loadImages(imagePaths);

/**
 * Loaded start images.
 */
export const startImages = loadImages({
  StartLeft: 'assets/start/startLeft.png',
  StartRight: 'assets/start/startRight.png',
  StartUp: 'assets/start/startUp.png',
  StartDown: 'assets/start/startDown.png',
});
