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
  vertical: 'src/assets/pipes/vertical.png',
  horizontal: 'src/assets/pipes/horizontal.png',
  cross: 'src/assets/pipes/cross.png',
  curvedBottomRight: 'src/assets/pipes/curvedBottomRight.png',
  curvedBottomLeft: 'src/assets/pipes/curvedBottomLeft.png',
  curvedTopRight: 'src/assets/pipes/curvedTopRight.png',
  curvedTopLeft: 'src/assets/pipes/curvedTopLeft.png',
  bgcell: 'src/assets/bgcell.png',
  curvedTopBL66e: 'src/assets/waterflow/curvedTop/BL/66e.jpeg',
  vertical100: 'src/assets/waterflow/vertical/100.jpeg',
  vertical66c: 'src/assets/waterflow/vertical/66c.jpeg',
  vertical66b: 'src/assets/waterflow/vertical/66b.jpeg',
  vertical33c: 'src/assets/waterflow/vertical/33c.jpeg',
  horizontal100: 'src/assets/waterflow/horizontal/100.jpeg',
  horizontal66e: 'src/assets/waterflow/horizontal/66e.jpeg',
  horizontal66d: 'src/assets/waterflow/horizontal/66d.jpeg',
  vertical33b: 'src/assets/waterflow/vertical/33b.jpeg',
  horizontal33e: 'src/assets/waterflow/horizontal/33e.jpeg',
  horizontal33d: 'src/assets/waterflow/horizontal/33d.jpeg',
  curvedTopBR100: 'src/assets/waterflow/curvedTop/BR/100.jpeg',
  curvedTopBR66d: 'src/assets/waterflow/curvedTop/BR/66d.jpeg',
  curvedTopBR66b: 'src/assets/waterflow/curvedTop/BR/66b.jpeg',
  curvedTopBR33d: 'src/assets/waterflow/curvedTop/BR/33d.jpeg',
  curvedTopBR33b: 'src/assets/waterflow/curvedTop/BR/33b.jpeg',
  curvedTopBL100: 'src/assets/waterflow/curvedTop/BL/100.jpeg',
  curvedTopBL66b: 'src/assets/waterflow/curvedTop/BL/66b.jpeg',
  curvedTopBL33e: 'src/assets/waterflow/curvedTop/BL/33e.jpeg',
  curvedTopBL33b: 'src/assets/waterflow/curvedTop/BL/33b.jpeg',
  curvedBottomTL100: 'src/assets/waterflow/curvedBottom/TL/100.jpeg',
  curvedBottomTL66e: 'src/assets/waterflow/curvedBottom/TL/66e.jpeg',
  curvedBottomTL66c: 'src/assets/waterflow/curvedBottom/TL/66c.jpeg',
  curvedBottomTL33e: 'src/assets/waterflow/curvedBottom/TL/33e.jpeg',
  curvedBottomTL33c: 'src/assets/waterflow/curvedBottom/TL/33c.jpeg',
  curvedBottomTL: 'src/assets/waterflow/curvedBottom/TL',
  curvedBottom: 'src/assets/waterflow/curvedBottom',
  cross100V: 'src/assets/waterflow/cross/100V.jpeg',
  cross66e: 'src/assets/waterflow/cross/66e.jpeg',
  cross66d: 'src/assets/waterflow/cross/66d.jpeg',
  cross100H: 'src/assets/waterflow/cross/100H.jpeg',
  cross33e: 'src/assets/waterflow/cross/33e.jpeg',
  cross33d: 'src/assets/waterflow/cross/33d.jpeg',
  curvedBottomTR33c: 'src/assets/waterflow/curvedBottom/TR/33c.jpeg',
  curvedBottomTR33d: 'src/assets/waterflow/curvedBottom/TR/33d.jpeg',
  curvedBottomTR66c: 'src/assets/waterflow/curvedBottom/TR/66c.jpeg',
  curvedBottomTR66d: 'src/assets/waterflow/curvedBottom/TR/66d.jpeg',
  curvedBottomTR100: 'src/assets/waterflow/curvedBottom/TR/100.jpeg',
  blockedcell:'src/assets/blockedcell.png',
};

/**
 * Loaded water images.
 */
export const waterImages = loadImages({
  vertical100: 'src/assets/waterflow/vertical/100.jpeg',
  vertical66c: 'src/assets/waterflow/vertical/66c.jpeg',
  vertical66b: 'src/assets/waterflow/vertical/66b.jpeg',
  vertical33c: 'src/assets/waterflow/vertical/33c.jpeg',
  vertical33b: 'src/assets/waterflow/vertical/33b.jpeg',
  horizontal100: 'src/assets/waterflow/horizontal/100.jpeg',
  horizontal66e: 'src/assets/waterflow/horizontal/66e.jpeg',
  horizontal66d: 'src/assets/waterflow/horizontal/66d.jpeg',
  horizontal33e: 'src/assets/waterflow/horizontal/33e.jpeg',
  horizontal33d: 'src/assets/waterflow/horizontal/33d.jpeg',
  curvedTopBR100: 'src/assets/waterflow/curvedTop/BR/100.jpeg',
  curvedTopBR66d: 'src/assets/waterflow/curvedTop/BR/66d.jpeg',
  curvedTopBR66b: 'src/assets/waterflow/curvedTop/BR/66b.jpeg',
  curvedTopBR33d: 'src/assets/waterflow/curvedTop/BR/33d.jpeg',
  curvedTopBR33b: 'src/assets/waterflow/curvedTop/BR/33b.jpeg',
  curvedTopBL100: 'src/assets/waterflow/curvedTop/BL/100.jpeg',
  curvedTopBL66e: 'src/assets/waterflow/curvedTop/BL/66e.jpeg',
  curvedTopBL66b: 'src/assets/waterflow/curvedTop/BL/66b.jpeg',
  curvedTopBL33e: 'src/assets/waterflow/curvedTop/BL/33e.jpeg',
  curvedTopBL33b: 'src/assets/waterflow/curvedTop/BL/33b.jpeg',
  curvedBottomTR66b: 'src/assets/waterflow/curvedBottom/TR/66b',
  curvedBottomTR100: 'src/assets/waterflow/curvedBottom/TR/100.jpeg',
  curvedBottomTR66c: 'src/assets/waterflow/curvedBottom/TR/66c.jpeg',
  curvedBottomTR33d: 'src/assets/waterflow/curvedBottom/TR/33d.jpeg',
  curvedBottomTR33c: 'src/assets/waterflow/curvedBottom/TR/33c.jpeg',
  curvedBottomTL100: 'src/assets/waterflow/curvedBottom/TL/100.jpeg',
  curvedBottomTL66e: 'src/assets/waterflow/curvedBottom/TL/66e.jpeg',
  curvedBottomTL66c: 'src/assets/waterflow/curvedBottom/TL/66c.jpeg',
  curvedBottomTL33e: 'src/assets/waterflow/curvedBottom/TL/33e.jpeg',
  curvedBottomTL33c: 'src/assets/waterflow/curvedBottom/TL/33c.jpeg',
  cross100V: 'src/assets/waterflow/cross/100V.jpeg',
  cross100H: 'src/assets/waterflow/cross/100H.jpeg',
  cross66e: 'src/assets/waterflow/cross/66e.jpeg',
  cross33e: 'src/assets/waterflow/cross/33e.jpeg',
  cross33d: 'src/assets/waterflow/cross/33d.jpeg',
});

export const images = loadImages(imagePaths);

/**
 * Loaded start images.
 */
export const startImages = loadImages({
  StartLeft: 'src/assets/start/startLeft.png',
  StartRight: 'src/assets/start/startRight.png',
  StartUp: 'src/assets/start/startUp.png',
  StartDown: 'src/assets/start/startDown.png',
});
