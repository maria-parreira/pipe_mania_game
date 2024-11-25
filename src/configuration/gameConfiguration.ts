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
  vertical: 'public/assets/pipes/vertical.png',
  horizontal: 'public/assets/pipes/horizontal.png',
  cross: 'public/assets/pipes/cross.png',
  curvedBottomRight: 'public/assets/pipes/curvedBottomRight.png',
  curvedBottomLeft: 'public/assets/pipes/curvedBottomLeft.png',
  curvedTopRight: 'public/assets/pipes/curvedTopRight.png',
  curvedTopLeft: 'public/assets/pipes/curvedTopLeft.png',
  bgcell: 'public/assets/bgcell.png',
  curvedTopBL66e: 'public/assets/waterflow/curvedTop/BL/66e.jpeg',
  vertical100: 'public/assets/waterflow/vertical/100.jpeg',
  vertical66c: 'public/assets/waterflow/vertical/66c.jpeg',
  vertical66b: 'public/assets/waterflow/vertical/66b.jpeg',
  vertical33c: 'public/assets/waterflow/vertical/33c.jpeg',
  horizontal100: 'public/assets/waterflow/horizontal/100.jpeg',
  horizontal66e: 'public/assets/waterflow/horizontal/66e.jpeg',
  horizontal66d: 'public/assets/waterflow/horizontal/66d.jpeg',
  vertical33b: 'public/assets/waterflow/vertical/33b.jpeg',
  horizontal33e: 'public/assets/waterflow/horizontal/33e.jpeg',
  horizontal33d: 'public/assets/waterflow/horizontal/33d.jpeg',
  curvedTopBR100: 'public/assets/waterflow/curvedTop/BR/100.jpeg',
  curvedTopBR66d: 'public/assets/waterflow/curvedTop/BR/66d.jpeg',
  curvedTopBR66b: 'public/assets/waterflow/curvedTop/BR/66b.jpeg',
  curvedTopBR33d: 'public/assets/waterflow/curvedTop/BR/33d.jpeg',
  curvedTopBR33b: 'public/assets/waterflow/curvedTop/BR/33b.jpeg',
  curvedTopBL100: 'public/assets/waterflow/curvedTop/BL/100.jpeg',
  curvedTopBL66b: 'public/assets/waterflow/curvedTop/BL/66b.jpeg',
  curvedTopBL33e: 'public/assets/waterflow/curvedTop/BL/33e.jpeg',
  curvedTopBL33b: 'public/assets/waterflow/curvedTop/BL/33b.jpeg',
  curvedBottomTL100: 'public/assets/waterflow/curvedBottom/TL/100.jpeg',
  curvedBottomTL66e: 'public/assets/waterflow/curvedBottom/TL/66e.jpeg',
  curvedBottomTL66c: 'public/assets/waterflow/curvedBottom/TL/66c.jpeg',
  curvedBottomTL33e: 'public/assets/waterflow/curvedBottom/TL/33e.jpeg',
  curvedBottomTL33c: 'public/assets/waterflow/curvedBottom/TL/33c.jpeg',
  curvedBottomTL: 'public/assets/waterflow/curvedBottom/TL',
  curvedBottom: 'public/assets/waterflow/curvedBottom',
  cross100V: 'public/assets/waterflow/cross/100V.jpeg',
  cross66e: 'public/assets/waterflow/cross/66e.jpeg',
  cross66d: 'public/assets/waterflow/cross/66d.jpeg',
  cross100H: 'public/assets/waterflow/cross/100H.jpeg',
  cross33e: 'public/assets/waterflow/cross/33e.jpeg',
  cross33d: 'public/assets/waterflow/cross/33d.jpeg',
  curvedBottomTR33c: 'public/assets/waterflow/curvedBottom/TR/33c.jpeg',
  curvedBottomTR33d: 'public/assets/waterflow/curvedBottom/TR/33d.jpeg',
  curvedBottomTR66c: 'public/assets/waterflow/curvedBottom/TR/66c.jpeg',
  curvedBottomTR66d: 'public/assets/waterflow/curvedBottom/TR/66d.jpeg',
  curvedBottomTR100: 'public/assets/waterflow/curvedBottom/TR/100.jpeg',
  blockedcell:'public/assets/blockedcell.png',
};

/**
 * Loaded water images.
 */
export const waterImages = loadImages({
  vertical100: 'public/assets/waterflow/vertical/100.jpeg',
  vertical66c: 'public/assets/waterflow/vertical/66c.jpeg',
  vertical66b: 'public/assets/waterflow/vertical/66b.jpeg',
  vertical33c: 'public/assets/waterflow/vertical/33c.jpeg',
  vertical33b: 'public/assets/waterflow/vertical/33b.jpeg',
  horizontal100: 'public/assets/waterflow/horizontal/100.jpeg',
  horizontal66e: 'public/assets/waterflow/horizontal/66e.jpeg',
  horizontal66d: 'public/assets/waterflow/horizontal/66d.jpeg',
  horizontal33e: 'public/assets/waterflow/horizontal/33e.jpeg',
  horizontal33d: 'public/assets/waterflow/horizontal/33d.jpeg',
  curvedTopBR100: 'public/assets/waterflow/curvedTop/BR/100.jpeg',
  curvedTopBR66d: 'public/assets/waterflow/curvedTop/BR/66d.jpeg',
  curvedTopBR66b: 'public/assets/waterflow/curvedTop/BR/66b.jpeg',
  curvedTopBR33d: 'public/assets/waterflow/curvedTop/BR/33d.jpeg',
  curvedTopBR33b: 'public/assets/waterflow/curvedTop/BR/33b.jpeg',
  curvedTopBL100: 'public/assets/waterflow/curvedTop/BL/100.jpeg',
  curvedTopBL66e: 'public/assets/waterflow/curvedTop/BL/66e.jpeg',
  curvedTopBL66b: 'public/assets/waterflow/curvedTop/BL/66b.jpeg',
  curvedTopBL33e: 'public/assets/waterflow/curvedTop/BL/33e.jpeg',
  curvedTopBL33b: 'public/assets/waterflow/curvedTop/BL/33b.jpeg',
  curvedBottomTR66b: 'public/assets/waterflow/curvedBottom/TR/66b.jpeg',
  curvedBottomTR100: 'public/assets/waterflow/curvedBottom/TR/100.jpeg',
  curvedBottomTR66c: 'public/assets/waterflow/curvedBottom/TR/66c.jpeg',
  curvedBottomTR33d: 'public/assets/waterflow/curvedBottom/TR/33d.jpeg',
  curvedBottomTR33c: 'public/assets/waterflow/curvedBottom/TR/33c.jpeg',
  curvedBottomTL100: 'public/assets/waterflow/curvedBottom/TL/100.jpeg',
  curvedBottomTL66e: 'public/assets/waterflow/curvedBottom/TL/66e.jpeg',
  curvedBottomTL66c: 'public/assets/waterflow/curvedBottom/TL/66c.jpeg',
  curvedBottomTL33e: 'public/assets/waterflow/curvedBottom/TL/33e.jpeg',
  curvedBottomTL33c: 'public/assets/waterflow/curvedBottom/TL/33c.jpeg',
  cross100V: 'public/assets/waterflow/cross/100V.jpeg',
  cross100H: 'public/assets/waterflow/cross/100H.jpeg',
  cross66e: 'public/assets/waterflow/cross/66e.jpeg',
  cross33e: 'public/assets/waterflow/cross/33e.jpeg',
  cross33d: 'public/assets/waterflow/cross/33d.jpeg',
  cross66d: 'public/assets/waterflow/cross/66d.jpeg',
  cross66b: 'public/assets/waterflow/cross/66b.jpeg',
  cross33b: 'public/assets/waterflow/cross/66b.jpeg',
  cross33c: 'public/assets/waterflow/cross/33c.jpeg',
  cross66c: 'public/assets/waterflow/cross/66c.jpeg',
});

export const images = loadImages(imagePaths);

/**
 * Loaded start images.
 */
export const startImages = loadImages({
  StartLeft: 'public/assets/start/startLeft.png',
  StartRight: 'public/assets/start/startRight.png',
  StartUp: 'public/assets/start/startUp.png',
  StartDown: 'public/assets/start/startDown.png',
});
