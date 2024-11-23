import { PipeType } from "@/classes/PipeType";

export const GameConfiguration = {
  rows: 7,
  cols: 9,
  cellSize: 50,
  selectedCell: {
      row: 0,
      col: 0,
  },
};


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
  curvedTopBL66e: 'src/assets/waterflow/curvedTop/BL/66e.png',
  vertical100: 'src/assets/waterflow/vertical/100.png',
  vertical66c: 'src/assets/waterflow/vertical/66c.png',
  vertical66b: 'src/assets/waterflow/vertical/66b.png',
  vertical33c: 'src/assets/waterflow/vertical/33c.png',
  horizontal100: 'src/assets/waterflow/horizontal/100.png',
  horizontal66e: 'src/assets/waterflow/horizontal/66e.png',
  horizontal66d: 'src/assets/waterflow/horizontal/66d.png',
  vertical33b: 'src/assets/waterflow/vertical/33b.png',
  horizontal33e: 'src/assets/waterflow/horizontal/33e.png',
  horizontal33d: 'src/assets/waterflow/horizontal/33d.png',
  curvedTopBR100: 'src/assets/waterflow/curvedTop/BR/100.png',
  curvedTopBR66d: 'src/assets/waterflow/curvedTop/BR/66d.png',
  curvedTopBR66b: 'src/assets/waterflow/curvedTop/BR/66b.png',
  curvedTopBR33d: 'src/assets/waterflow/curvedTop/BR/33d.png',
  curvedTopBR33b: 'src/assets/waterflow/curvedTop/BR/33b.png',
  curvedTopBL100: 'src/assets/waterflow/curvedTop/BL/100.png',
  curvedTopBL66b: 'src/assets/waterflow/curvedTop/BL/66b.png',
  curvedTopBL33e: 'src/assets/waterflow/curvedTop/BL/33e.png',
  curvedTopBL33b: 'src/assets/waterflow/curvedTop/BL/33b.png',
  curvedBottomTL100: 'src/assets/waterflow/curvedBottom/TL/100.png',
  curvedBottomTL66e: 'src/assets/waterflow/curvedBottom/TL/66e.png',
  curvedBottomTL66c: 'src/assets/waterflow/curvedBottom/TL/66c.png',
  curvedBottomTL33e: 'src/assets/waterflow/curvedBottom/TL/33e.png',
  curvedBottomTL33c: 'src/assets/waterflow/curvedBottom/TL/33c.png',
  curvedBottomTL: 'src/assets/waterflow/curvedBottom/TL',
  curvedBottom: 'src/assets/waterflow/curvedBottom',
  cross100V: 'src/assets/waterflow/cross/100V.png',
  cross66e: 'src/assets/waterflow/cross/66e.png',
  cross100H: 'src/assets/waterflow/cross/100H.png',
  cross33e: 'src/assets/waterflow/cross/33e.png',
  cross33d: 'src/assets/waterflow/cross/33d.png',
  curvedBottomTR33c: 'src/assets/waterflow/curvedBottom/TR/33c.png',
  curvedBottomTR33d: 'src/assets/waterflow/curvedBottom/TR/33d.png',
  curvedBottomTR66c: 'src/assets/waterflow/curvedBottom/TR/66c.png',
  curvedBottomTR66d: 'src/assets/waterflow/curvedBottom/TR/66d.png',
  curvedBottomTR100: 'src/assets/waterflow/curvedBottom/TR/100.png',
  blockedcell:'src/assets/blockedcell.png',
};

// Carregar imagens de água
export const waterImages = loadImages({
  curvedTopBL66e: 'src/assets/waterflow/curvedTop/BL/66e.png',
  vertical100: 'src/assets/waterflow/vertical/100.png',
  vertical66c: 'src/assets/waterflow/vertical/66c.png',
  vertical66b: 'src/assets/waterflow/vertical/66b.png',
  vertical33c: 'src/assets/waterflow/vertical/33c.png',
  horizontal100: 'src/assets/waterflow/horizontal/100.png',
  horizontal66e: 'src/assets/waterflow/horizontal/66e.png',
  horizontal66d: 'src/assets/waterflow/horizontal/66d.png',
  vertical33b: 'src/assets/waterflow/vertical/33b.png',
  horizontal33e: 'src/assets/waterflow/horizontal/33e.png',
  horizontal33d: 'src/assets/waterflow/horizontal/33d.png',
  curvedTopBR100: 'src/assets/waterflow/curvedTop/BR/100.png',
  curvedTopBR66d: 'src/assets/waterflow/curvedTop/BR/66d.png',
  curvedTopBR66b: 'src/assets/waterflow/curvedTop/BR/66b.png',
  curvedTopBR33d: 'src/assets/waterflow/curvedTop/BR/33d.png',
  curvedTopBR33b: 'src/assets/waterflow/curvedTop/BR/33b.png',
  curvedTopBL100: 'src/assets/waterflow/curvedTop/BL/100.png',
  curvedTopBL66b: 'src/assets/waterflow/curvedTop/BL/66b.png',
  curvedTopBL33e: 'src/assets/waterflow/curvedTop/BL/33e.png',
  curvedTopBL33b: 'src/assets/waterflow/curvedTop/BL/33b.png',
  curvedBottomTL100: 'src/assets/waterflow/curvedBottom/TL/100.png',
  curvedBottomTL66e: 'src/assets/waterflow/curvedBottom/TL/66e.png',
  curvedBottomTL66c: 'src/assets/waterflow/curvedBottom/TL/66c.png',
  curvedBottomTL33e: 'src/assets/waterflow/curvedBottom/TL/33e.png',
  curvedBottomTL33c: 'src/assets/waterflow/curvedBottom/TL/33c.png',
  curvedBottomTL: 'src/assets/waterflow/curvedBottom/TL',
  curvedBottom: 'src/assets/waterflow/curvedBottom',
  cross100V: 'src/assets/waterflow/cross/100V.png',
  cross66e: 'src/assets/waterflow/cross/66e.png',
  cross100H: 'src/assets/waterflow/cross/100H.png',
  cross33e: 'src/assets/waterflow/cross/33e.png',
  cross33d: 'src/assets/waterflow/cross/33d.png',
  curvedBottomTR33c: 'src/assets/waterflow/curvedBottom/TR/33c.png',
  curvedBottomTR33d: 'src/assets/waterflow/curvedBottom/TR/33d.png',
  curvedBottomTR66c: 'src/assets/waterflow/curvedBottom/TR/66c.png',
  curvedBottomTR66d: 'src/assets/waterflow/curvedBottom/TR/66d.png',
  curvedBottomTR100: 'src/assets/waterflow/curvedBottom/TR/100.png',
});

// Carregue todas as imagens
export const images = loadImages(imagePaths);


// Carregue imagens de início separadamente
export const startImages = loadImages({
  StartLeft: 'src/assets/start/startLeft.png',
  StartRight: 'src/assets/start/startRight.png',
  StartUp: 'src/assets/start/startUp.png',
  StartDown: 'src/assets/start/startDown.png',
});
