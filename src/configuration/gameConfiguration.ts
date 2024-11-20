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
  curvedUp: new Image(),
  curvedDown: new Image(),
  cross: new Image(),
  startup:new Image(),
  startdown:new Image(),
  startleft:new Image(),
  startright:new Image(),
  end: new Image()
};

images.vertical.src = 'src/assets/pipes/vertical.png';
images.horizontal.src = 'src/assets/pipes/horizontal.png'
images.curvedUp.src = 'src/assets/pipes/curvedUp.png';
images.curvedDown.src = 'src/assets/pipes/curvedDown.png';
images.cross.src = 'src/assets/pipes/cross.png';
images.startup.src = 'src/assets/start/startUp.png';
images.startdown.src = 'src/assets/start/startDown.png';
images.startleft.src = 'src/assets/start/startLeft.png';
images.startright.src = 'src/assets/start/startRight.png';
images.end.src = 'src/assets/end/end.png';

export const startImages = {
  startup: images.startup,
  startdown: images.startdown,
  startleft: images.startleft,
  startright: images.startright,
};

