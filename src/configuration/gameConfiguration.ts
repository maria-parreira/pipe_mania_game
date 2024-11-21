export const GameConfiguration = {
  rows: 7,
  cols: 9,
  cellSize: 50,
  selectedCell: {
      row: 0,
      col: 0,
  },
};


export const images = {
  vertical: new Image(),
  horizontal: new Image(),
  cross: new Image(),
  startup:new Image(),
  startdown:new Image(),
  startleft:new Image(),
  startright:new Image(),
  end: new Image(),
  watercrosshorizontal: new Image(),
  watercrossvertical:new Image(),
  watercurvedup:new Image(),
  watercurveddown: new Image(),
  waterhorizontal: new Image(),
  watervertical:new Image(),
  curvedBottomRight: new Image(),
  curvedBottomDown: new Image(),
  curvedTopRight: new Image(),
  curvedTopLeft: new Image(),
  bgcell: new Image(),
};

images.vertical.src = 'src/assets/pipes/vertical.png';
images.horizontal.src = 'src/assets/pipes/horizontal.png'
images.cross.src = 'src/assets/pipes/cross.png';
images.startup.src = 'src/assets/start/startUp.png';
images.startdown.src = 'src/assets/start/startDown.png';
images.startleft.src = 'src/assets/start/startLeft.png';
images.startright.src = 'src/assets/start/startRight.png';
images.end.src = 'src/assets/end/end.png';
images.watercrosshorizontal.src = 'src/assets/waterflow/crossHorizontal.png';
images.watercrossvertical.src = 'src/assets/waterflow/crossVertical.png';
images.watercurvedup.src ='src/assets/waterflow/curvedUp.png';
images.watercurveddown.src = 'src/assets/waterflow/curvedDown.png';
images.waterhorizontal.src = 'src/assets/waterflow/horizontal.png';
images.watervertical.src = 'src/assets/waterflow/vertical.png';
images.curvedBottomRight.src = 'src/assets/pipes/curvedBottomRight.png';
images.curvedBottomDown.src = 'src/assets/pipes/curvedBottomDown.png';
images.curvedTopRight.src = 'src/assets/pipes/curvedTopRight.png';
images.curvedTopLeft.src = 'src/assets/pipes/curvedTopLeft.png';
images.bgcell.src = 'src/assets/bgcell.png';


export const startImages = {
  startup: images.startup,
  startdown: images.startdown,
  startleft: images.startleft,
  startright: images.startright,
};

export const waterImages = {
  watercrosshorizontal: images.watercrosshorizontal,
  watercrossvertical: images.watercrossvertical,
  watercurvedup:images.watercurvedup,
  watercurveddown: images.watercurveddown,
  waterhorizontal: images.waterhorizontal,
  watervertical: images.watervertical,
}

