(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function e(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=e(s);fetch(s.href,r)}})();const u={rows:7,cols:9,cellSize:50,selectedCell:{row:0,col:0}},v=n=>{const t={};for(const[e,i]of Object.entries(n)){const s=new Image;s.src=i,t[e]=s}return t},R={vertical:"assets/pipes/vertical.png",horizontal:"assets/pipes/horizontal.png",cross:"assets/pipes/cross.png",curvedBottomRight:"assets/pipes/curvedBottomRight.png",curvedBottomLeft:"assets/pipes/curvedBottomLeft.png",curvedTopRight:"assets/pipes/curvedTopRight.png",curvedTopLeft:"assets/pipes/curvedTopLeft.png",bgcell:"assets/bgcell.png",curvedTopBL66e:"assets/waterflow/curvedTop/BL/66e.jpeg",vertical100:"assets/waterflow/vertical/100.jpeg",vertical66c:"assets/waterflow/vertical/66c.jpeg",vertical66b:"assets/waterflow/vertical/66b.jpeg",vertical33c:"assets/waterflow/vertical/33c.jpeg",horizontal100:"assets/waterflow/horizontal/100.jpeg",horizontal66e:"assets/waterflow/horizontal/66e.jpeg",horizontal66d:"assets/waterflow/horizontal/66d.jpeg",vertical33b:"assets/waterflow/vertical/33b.jpeg",horizontal33e:"assets/waterflow/horizontal/33e.jpeg",horizontal33d:"assets/waterflow/horizontal/33d.jpeg",curvedTopBR100:"assets/waterflow/curvedTop/BR/100.jpeg",curvedTopBR66d:"assets/waterflow/curvedTop/BR/66d.jpeg",curvedTopBR66b:"assets/waterflow/curvedTop/BR/66b.jpeg",curvedTopBR33d:"assets/waterflow/curvedTop/BR/33d.jpeg",curvedTopBR33b:"assets/waterflow/curvedTop/BR/33b.jpeg",curvedTopBL100:"assets/waterflow/curvedTop/BL/100.jpeg",curvedTopBL66b:"assets/waterflow/curvedTop/BL/66b.jpeg",curvedTopBL33e:"assets/waterflow/curvedTop/BL/33e.jpeg",curvedTopBL33b:"assets/waterflow/curvedTop/BL/33b.jpeg",curvedBottomTL100:"assets/waterflow/curvedBottom/TL/100.jpeg",curvedBottomTL66e:"assets/waterflow/curvedBottom/TL/66e.jpeg",curvedBottomTL66c:"assets/waterflow/curvedBottom/TL/66c.jpeg",curvedBottomTL33e:"assets/waterflow/curvedBottom/TL/33e.jpeg",curvedBottomTL33c:"assets/waterflow/curvedBottom/TL/33c.jpeg",curvedBottomTL:"assets/waterflow/curvedBottom/TL",curvedBottom:"assets/waterflow/curvedBottom",cross100V:"assets/waterflow/cross/100V.jpeg",cross66e:"assets/waterflow/cross/66e.jpeg",cross66d:"assets/waterflow/cross/66d.jpeg",cross100H:"assets/waterflow/cross/100H.jpeg",cross33e:"assets/waterflow/cross/33e.jpeg",cross33d:"assets/waterflow/cross/33d.jpeg",curvedBottomTR33c:"assets/waterflow/curvedBottom/TR/33c.jpeg",curvedBottomTR33d:"assets/waterflow/curvedBottom/TR/33d.jpeg",curvedBottomTR66c:"assets/waterflow/curvedBottom/TR/66c.jpeg",curvedBottomTR66d:"assets/waterflow/curvedBottom/TR/66d.jpeg",curvedBottomTR100:"assets/waterflow/curvedBottom/TR/100.jpeg",blockedcell:"assets/blockedcell.png"},a=v({vertical100:"assets/waterflow/vertical/100.jpeg",vertical66c:"assets/waterflow/vertical/66c.jpeg",vertical66b:"assets/waterflow/vertical/66b.jpeg",vertical33c:"assets/waterflow/vertical/33c.jpeg",vertical33b:"assets/waterflow/vertical/33b.jpeg",horizontal100:"assets/waterflow/horizontal/100.jpeg",horizontal66e:"assets/waterflow/horizontal/66e.jpeg",horizontal66d:"assets/waterflow/horizontal/66d.jpeg",horizontal33e:"assets/waterflow/horizontal/33e.jpeg",horizontal33d:"assets/waterflow/horizontal/33d.jpeg",curvedTopBR100:"assets/waterflow/curvedTop/BR/100.jpeg",curvedTopBR66d:"assets/waterflow/curvedTop/BR/66d.jpeg",curvedTopBR66b:"assets/waterflow/curvedTop/BR/66b.jpeg",curvedTopBR33d:"assets/waterflow/curvedTop/BR/33d.jpeg",curvedTopBR33b:"assets/waterflow/curvedTop/BR/33b.jpeg",curvedTopBL100:"assets/waterflow/curvedTop/BL/100.jpeg",curvedTopBL66e:"assets/waterflow/curvedTop/BL/66e.jpeg",curvedTopBL66b:"assets/waterflow/curvedTop/BL/66b.jpeg",curvedTopBL33e:"assets/waterflow/curvedTop/BL/33e.jpeg",curvedTopBL33b:"assets/waterflow/curvedTop/BL/33b.jpeg",curvedBottomTR66b:"assets/waterflow/curvedBottom/TR/66b.jpeg",curvedBottomTR100:"assets/waterflow/curvedBottom/TR/100.jpeg",curvedBottomTR66c:"assets/waterflow/curvedBottom/TR/66c.jpeg",curvedBottomTR33d:"assets/waterflow/curvedBottom/TR/33d.jpeg",curvedBottomTR33c:"assets/waterflow/curvedBottom/TR/33c.jpeg",curvedBottomTL100:"assets/waterflow/curvedBottom/TL/100.jpeg",curvedBottomTL66e:"assets/waterflow/curvedBottom/TL/66e.jpeg",curvedBottomTL66c:"assets/waterflow/curvedBottom/TL/66c.jpeg",curvedBottomTL33e:"assets/waterflow/curvedBottom/TL/33e.jpeg",curvedBottomTL33c:"assets/waterflow/curvedBottom/TL/33c.jpeg",cross100V:"assets/waterflow/cross/100V.jpeg",cross100H:"assets/waterflow/cross/100H.jpeg",cross66e:"assets/waterflow/cross/66e.jpeg",cross33e:"assets/waterflow/cross/33e.jpeg",cross33d:"assets/waterflow/cross/33d.jpeg",cross66d:"assets/waterflow/cross/66d.jpeg",cross66b:"assets/waterflow/cross/66b.jpeg",cross33b:"assets/waterflow/cross/66b.jpeg",cross33c:"assets/waterflow/cross/33c.jpeg",cross66c:"assets/waterflow/cross/66c.jpeg"}),p=v(R),P=v({StartLeft:"assets/start/startLeft.png",StartRight:"assets/start/startRight.png",StartUp:"assets/start/startUp.png",StartDown:"assets/start/startDown.png"});var o=(n=>(n.Horizontal="horizontal",n.CurvedBottomRight="curvedBottomRight",n.CurvedBottomLeft="curvedBottomLeft",n.Cross="cross",n.Vertical="vertical",n.CurvedTopRight="curvedTopRight",n.CurvedTopLeft="curvedTopLeft",n.StartLeft="StartLeft",n.StartRight="StartRight",n.StartUp="StartUp",n.StartDown="StartDown",n))(o||{});class d{static CONTEXT_STROKE_STYLE="blue";static LINE_WIDTH=2;image;type;constructor(){this.type=this.getRandomPipeType(),this.image=this.getImageByType(this.type)}getRandomPipeType(){const t=[o.Horizontal,o.CurvedBottomRight,o.CurvedBottomLeft,o.Cross,o.Vertical,o.CurvedTopRight,o.CurvedTopLeft],e=Math.floor(Math.random()*t.length);return t[e]}getImageByType(t){switch(t){case o.Horizontal:return p.horizontal;case o.Vertical:return p.vertical;case o.CurvedBottomRight:return p.curvedBottomRight;case o.CurvedBottomLeft:return p.curvedBottomLeft;case o.CurvedTopRight:return p.curvedTopRight;case o.CurvedTopLeft:return p.curvedTopLeft;case o.Cross:return p.cross;default:throw new Error("invalid pipe type")}}draw(t,e,i,s){const r=()=>{t.save(),t.strokeStyle=d.CONTEXT_STROKE_STYLE,t.lineWidth=d.LINE_WIDTH,t.strokeRect(e,i,s,s),t.drawImage(this.image,e,i,s,s),t.restore()};this.image.complete?r():this.image.onload=r}getType(){return this.type}}const C=()=>{const n=[];return{enqueue(t){n.push(t)},dequeue(){return n.shift()},size(){return n.length},isEmpty(){return n.length===0},getItems(){return n},peek(){return n[0]}}};class g{static PIPE_SIZE=50;static QUEUE_SIZE=5;static PIPE_SPACING=10;queue=C();constructor(t=5){for(let e=0;e<t;e++)this.queue.enqueue(this.generatePipe())}drawPipeQueue(t,e,i){this.queue.getItems().forEach((s,r)=>{const l=i+r*(g.PIPE_SIZE+g.PIPE_SPACING);s.draw(t,e,l,g.PIPE_SIZE)})}generatePipe(){return new d}getFirstPipe(){return this.queue.peek()}removeFirst(){this.queue.dequeue()}addLast(t){this.queue.enqueue(t)}}class h{static PIPE_QUEUE_NUMBER=5;static HUD_FONT="20px Arial";static HUD_FILL_STYLE="black";static GAME_OVER_FONT="40px Arial";static GAME_OVER_FILL_STYLE="red";static GAME_OVER_TEXT_ALIGN="center";static CONTEXT="2d";static CANVAS_QUERY_SELECTOR="canvas";static WINNING_SCORE=100;canvas;ctx;grid;pipeQueue=new g(h.PIPE_QUEUE_NUMBER);selectedPipe=null;isRunning=!0;countdown=20;timerInterval=null;score=0;constructor(t,e){this.canvas=t,this.ctx=t.getContext(h.CONTEXT),this.grid=e,this.preloadImages().then(()=>{this.addEventListeners(),this.startGame(this.ctx)})}startGame(t){this.startCountdown(t),this.grid.setOnGameOverCallback(()=>{this.handleGameOver()}),this.runGameLoop()}preloadImages(){const e=Object.values(a).map(i=>new Promise((s,r)=>{i.onload=()=>s(),i.onerror=()=>r(`Failed to load image: ${i.src}`)}));return Promise.all(e).then(()=>console.log("All images loaded successfully")).catch(i=>console.error(i))}startCountdown(t){this.timerInterval=window.setInterval(()=>{this.countdown>0?this.countdown--:(this.stopCountdown(),this.startWaterFlow())},1e3)}stopCountdown(){this.timerInterval!==null&&(clearInterval(this.timerInterval),this.timerInterval=null)}startWaterFlow(){this.grid.setOnPipeFilledCallback(()=>{this.countdown===0&&this.increaseScore(10)});const t=this.grid.getInitialPipePosition(),e=t?.row,i=t?.col;this.grid.updateAdjacentCellsWithWater(this.ctx,e,i)}increaseScore(t){this.score+=t,this.score>=h.WINNING_SCORE&&this.notifyWinGame()}runGameLoop(){const t=()=>{this.isRunning&&(this.drawGame(),requestAnimationFrame(t))};requestAnimationFrame(t)}drawGame(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.grid.draw(this.ctx),this.grid.drawInitialPipe(this.ctx,50),this.pipeQueue.drawPipeQueue(this.ctx,10,150),this.drawHUD()}drawHUD(){this.ctx.font=h.HUD_FONT,this.ctx.fillStyle=h.HUD_FILL_STYLE,this.ctx.fillText(`Time until water: ${this.countdown}s`,10,20),this.ctx.fillText(`Score to win: ${h.WINNING_SCORE}`,10,50),this.ctx.fillText(`Score: ${this.score}`,10,70)}addEventListeners(){this.canvas.addEventListener("click",this.handleGridClick.bind(this))}handleGridClick(t){const e=t.clientX-this.grid.getStartX(this.ctx),i=t.clientY-this.grid.getStartY(this.ctx),s=Math.floor(e/u.cellSize),r=Math.floor(i/u.cellSize);r>=0&&r<u.rows&&s>=0&&s<u.cols&&(this.grid.getGridCell(r,s).isBlocked()||(this.handlePipeSelection(),this.selectedPipe&&this.grid.setPipeInCell(r,s,this.selectedPipe)))}handlePipeSelection(){const t=this.pipeQueue.getFirstPipe();if(t){this.selectedPipe=t,this.pipeQueue.removeFirst();const e=this.pipeQueue.generatePipe();this.pipeQueue.addLast(e)}}handleGameOver(){this.isRunning&&(this.drawGameOverScreen(),this.canvas.addEventListener("click",this.restartGame.bind(this),{once:!0}),this.isRunning=!1)}drawGameOverScreen(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx.font=h.GAME_OVER_FONT,this.ctx.fillStyle=h.GAME_OVER_FILL_STYLE,this.ctx.textAlign=h.GAME_OVER_TEXT_ALIGN,this.ctx.fillText("Game Over",this.canvas.width/2,this.canvas.height/2-20),this.ctx.font=h.HUD_FONT,this.ctx.fillStyle=h.HUD_FILL_STYLE,this.ctx.fillText("Click to Restart",this.canvas.width/2,this.canvas.height/2+20)}restartGame(){this.isRunning=!1,this.stopCountdown(),this.countdown=20,this.score=0,this.grid.reset(),this.pipeQueue=new g(h.PIPE_QUEUE_NUMBER),this.canvas.replaceWith(this.canvas.cloneNode(!0)),this.canvas=document.querySelector(h.CANVAS_QUERY_SELECTOR),this.ctx=this.canvas.getContext(h.CONTEXT),this.grid.setOnGameOverCallback(()=>this.handleGameOver()),this.grid.setOnPipeFilledCallback(()=>{this.countdown===0&&(this.score+=10)}),this.addEventListeners(),this.isRunning=!0,this.startGame(this.ctx)}notifyWinGame(){this.onWinGameCallback&&this.onWinGameCallback()}onWinGameCallback(){this.isRunning=!1,this.drawWinScreen(this.ctx),this.canvas.addEventListener("click",this.restartGame.bind(this),{once:!0})}drawWinScreen(t){t.clearRect(0,0,t.canvas.width,t.canvas.height),t.font=h.GAME_OVER_FONT,t.fillStyle=h.GAME_OVER_FILL_STYLE,t.textAlign=h.GAME_OVER_TEXT_ALIGN,t.fillText("Congratulations! You Win!",t.canvas.width/2,t.canvas.height/2-20),t.font=h.HUD_FONT,t.fillStyle=h.HUD_FILL_STYLE,t.fillText("Click to Restart",t.canvas.width/2,t.canvas.height/2+20)}}class j{row;col;pipe;blocked;image=p.bgcell;constructor(t,e,i,s){this.row=t,this.col=e,this.pipe=null,this.blocked=s}getPipe(){return this.pipe}setPipe(t){this.pipe=t}isBlocked(){return this.blocked}setBlocked(t){this.blocked=t}getRow(){return this.row}getCol(){return this.col}draw(t,e,i,s){this.image.complete?t.drawImage(this.image,e,i,s,s):this.image.onload=()=>{t.drawImage(this.image,e,i,s,s)}}clearPipe(){this.pipe=null}}var c=(n=>(n.Left="left",n.Right="right",n.Up="up",n.Down="down",n))(c||{});class S{image;type;constructor(){this.type=this.generateType(),this.image=this.getStartImage()}draw(t,e,i,s){t.drawImage(this.image,e,i,s,s)}getType(){return this.type}generateType(){const t=[o.StartUp,o.StartDown,o.StartLeft,o.StartRight],e=Math.floor(Math.random()*t.length);return t[e]}getStartImage(){return P[this.type]}}class m{static WATER_LEVELS=3;images;type;currentImage;direction;constructor(t,e){this.type=t,this.direction=e,this.images=this.getImagesByType(this.type,this.direction)}draw(t,e,i,s){this.currentImage&&t.drawImage(this.currentImage,e,i,s,s)}async fillPipeWithWater(t){let e=0;return new Promise(i=>{const s=()=>{e<m.WATER_LEVELS?(this.currentImage=this.images[e],e++,setTimeout(s,500)):(t&&t(),i())};s()})}getImagesByType(t,e){if(t===o.Horizontal&&e===c.Right)return[a.horizontal33e,a.horizontal66e,a.horizontal100];if(t===o.Horizontal&&e===c.Left)return[a.horizontal33d,a.horizontal66d,a.horizontal100];if(t===o.Vertical&&e===c.Down)return[a.vertical33c,a.vertical66c,a.vertical100];if(t===o.Vertical&&e===c.Up)return[a.vertical33b,a.vertical66b,a.vertical100];if(t===o.CurvedBottomRight&&e===c.Left)return[a.curvedTopBR33d,a.curvedTopBR66d,a.curvedTopBR100];if(t===o.CurvedBottomRight&&e===c.Up)return[a.curvedTopBR33b,a.curvedTopBR66b,a.curvedTopBR100];if(t===o.CurvedBottomLeft&&e===c.Right)return[a.curvedTopBL33e,a.curvedTopBL66e,a.curvedTopBL100];if(t===o.CurvedBottomLeft&&e===c.Up)return[a.curvedTopBL33b,a.curvedTopBL66b,a.curvedTopBL100];if(t===o.CurvedTopLeft&&e===c.Right)return[a.curvedBottomTL33e,a.curvedBottomTL66e,a.curvedBottomTL100];if(t===o.CurvedTopLeft&&e===c.Down)return[a.curvedBottomTL33c,a.curvedBottomTL66c,a.curvedBottomTL100];if(t===o.CurvedTopRight&&e===c.Left)return[a.curvedBottomTR33d,a.curvedBottomTR66c,a.curvedBottomTR100];if(t===o.CurvedTopRight&&e===c.Down)return[a.curvedBottomTR33c,a.curvedBottomTR66c,a.curvedBottomTR100];if(t===o.Cross&&e===c.Up)return[a.cross33c,a.cross66c,a.cross100V];if(t===o.Cross&&e===c.Down)return[a.cross33b,a.cross66b,a.cross100V];if(t===o.Cross&&e===c.Left)return[a.cross33d,a.cross66d,a.cross100H];if(t===o.Cross&&e===c.Right)return[a.cross33e,a.cross66e,a.cross100H];throw new Error("invalid pipe type")}getType(){return this.type}getDirection(){return this.direction}}class f{static YELLOW="yellow";static BLOCKED_CELLS_PERCENTAGE=.1;static LINE_WIDTH=3;rows;cols;cellSize;cells;initialPipePosition=null;initialPipe=null;constructor(t,e,i){this.rows=t,this.cols=e,this.cellSize=i,this.cells=[],this.initializeGrid()}initializeGrid(){const t=this.generateBlockedIndices();this.cells=this.createGrid(t)}generateBlockedIndices(){const t=this.rows*this.cols,e=Math.floor(t*f.BLOCKED_CELLS_PERCENTAGE),i=new Set;for(;i.size<e;){const s=Math.floor(Math.random()*t);i.add(s)}return i}createGrid(t){const e=[];for(let i=0;i<this.rows;i++){const s=[];for(let r=0;r<this.cols;r++){const l=i*this.cols+r,w=t.has(l);s.push(new j(i,r,this.cellSize,w))}e.push(s)}return e}getStartX(t){return t.canvas.getBoundingClientRect().x+this.getBorderIntervalX(t)}getBorderIntervalX(t){return(t.canvas.width-this.cols*this.cellSize)/2}getStartY(t){return t.canvas.getBoundingClientRect().y+this.getBorderIntervalY(t)}getInitialPipePosition(){return this.initialPipePosition}getBorderIntervalY(t){return(t.canvas.height-this.rows*this.cellSize)/2}getCellPosition(t,e,i){const{borderIntervalX:s,borderIntervalY:r}=this.getBorderIntervals(i);return this.getGridCoordinate(t,e,s,r)}getBorderIntervals(t){const e=this.getBorderIntervalX(t),i=this.getBorderIntervalY(t);return{borderIntervalX:e,borderIntervalY:i}}getGridCoordinate(t,e,i,s){const r=i+e*this.cellSize,l=s+t*this.cellSize;return{x:r,y:l}}setPipeInCell(t,e,i){const s=this.cells[t][e];s&&!s.isBlocked()&&s.setPipe(i)}draw(t){t.clearRect(0,0,this.cols*this.cellSize,this.rows*this.cellSize);for(let e=0;e<this.rows;e++)for(let i=0;i<this.cols;i++)this.drawCellAndPipe(t,e,i)}drawCellAndPipe(t,e,i){const s=this.cells[e][i],{x:r,y:l}=this.getCellPosition(e,i,t);s?.isBlocked()?t.drawImage(p.blockedcell,r,l,this.cellSize,this.cellSize):s?.getPipe()?s.getPipe()?.draw(t,r,l,this.cellSize):s.draw(t,r,l,this.cellSize),t.strokeStyle=f.YELLOW,t.lineWidth=f.LINE_WIDTH,t.strokeRect(r,l,this.cellSize,this.cellSize)}drawInitialPipe(t,e){if(this.initialPipePosition||this.initializeInitialPipe(),this.initialPipePosition){const{x:i,y:s}=this.getCellPosition(this.initialPipePosition.row,this.initialPipePosition.col,t);this.initialPipe?.draw(t,i,s,e),this.blockCellAtInitialPipe()}}initializeInitialPipe(){this.initialPipe||(this.initialPipe=new S),this.initialPipePosition=this.generateRandomStartingCellCoordinates(this.initialPipe.getType());const{row:t,col:e}=this.initialPipePosition;this.cells[t][e].setPipe(this.initialPipe)}blockCellAtInitialPipe(){const{row:t,col:e}=this.initialPipePosition;this.cells[t][e]?.setBlocked(!0)}generateRandomStartingCellCoordinates(t){const e=this.cells.length-2,i=this.cells[0].length-2;let s=0,r=0;for(;s=Math.floor(Math.random()*e)+1,r=Math.floor(Math.random()*i)+1,!(!(t==o.StartUp&&this.cells[s-1][r].isBlocked())&&!(t==o.StartLeft&&this.cells[s][r-1].isBlocked())&&!(t==o.StartDown&&this.cells[s+1][r].isBlocked())&&!(t==o.StartRight&&this.cells[s][r+1].isBlocked())););return{row:s,col:r}}async updateAdjacentCellsWithWater(t,e,i){const s=this.getPossibleConnectionsToAdjacentPipes(this.cells[e][i])||[];if(s.length===0){this.notifyGameOver();return}for(const r of s)await this.updateAdjacentCellWithWaterPipe(t,e,i,r)}onGameOverCallback;setOnGameOverCallback(t){this.onGameOverCallback=t}notifyGameOver(){this.onGameOverCallback&&this.onGameOverCallback()}reset(){this.initialPipePosition=null,this.initialPipe=null,this.initializeGrid()}async updateAdjacentCellWithWaterPipe(t,e,i,s){const r=s.getRow(),l=s.getCol(),w=this.getDirection(r,l,e,i),L=this.cells[e][i].getPipe(),T=this.cells[r][l].getPipe();if(this.arePipesCompatible(L,T,w)){const B=new m(T.getType(),w);this.cells[r][l].setPipe(B),await B.fillPipeWithWater(()=>{this.notifyPipeFilled()}),await this.updateAdjacentCellsWithWater(t,r,l)}else this.notifyGameOver()}onPipeFilledCallback;setOnPipeFilledCallback(t){this.onPipeFilledCallback=t}notifyPipeFilled(){this.onPipeFilledCallback&&this.onPipeFilledCallback()}arePipesCompatible(t,e,i){const s={[o.Vertical]:{up:!0,down:!0},[o.Horizontal]:{left:!0,right:!0},[o.Cross]:{up:!0,down:!0,left:!0,right:!0},[o.CurvedBottomLeft]:{up:!1,down:!0,left:!0,right:!1},[o.CurvedBottomRight]:{up:!1,down:!0,left:!1,right:!0},[o.CurvedTopLeft]:{up:!0,down:!1,left:!0,right:!1},[o.CurvedTopRight]:{up:!0,down:!1,left:!1,right:!0},[o.StartUp]:{up:!0},[o.StartDown]:{down:!0},[o.StartLeft]:{left:!0},[o.StartRight]:{right:!0}};return s[t.getType()]?.[i]&&s[e.getType()]?.[this.getOppositeDirection(i)]}getDirection(t,e,i,s){return t<i?c.Up:t>i?c.Down:e>s?c.Right:e<s?c.Left:null}getOppositeDirection(t){return{up:c.Down,down:c.Up,left:c.Right,right:c.Left}[t]}getPossibleConnectionsToAdjacentPipes(t){const e=[],i=t.getRow(),s=t.getCol(),r=t.getPipe()?.getType(),l=this.getAdjacentCells(i,s);return r===o.Horizontal||r===o.StartLeft||r===o.StartRight?(l.adjacentRight?.getPipe()instanceof d&&this.containsPipe(i,s+1)&&e.push(this.cells[i][s+1]),l.adjacentLeft?.getPipe()instanceof d&&this.containsPipe(i,s-1)&&e.push(this.cells[i][s-1])):r===o.Vertical||r===o.StartUp||r===o.StartDown?(l.adjacentBot?.getPipe()instanceof d&&this.containsPipe(i+1,s)&&e.push(this.cells[i+1][s]),l.adjacentTop?.getPipe()instanceof d&&this.containsPipe(i-1,s)&&e.push(this.cells[i-1][s])):r===o.Cross?(l.adjacentBot?.getPipe()instanceof d&&this.containsPipe(i+1,s)&&e.push(this.cells[i+1][s]),l.adjacentTop?.getPipe()instanceof d&&this.containsPipe(i-1,s)&&e.push(this.cells[i-1][s]),l.adjacentRight?.getPipe()instanceof d&&this.containsPipe(i,s+1)&&e.push(this.cells[i][s+1]),l.adjacentLeft?.getPipe()instanceof d&&this.containsPipe(i,s-1)&&e.push(this.cells[i][s-1])):r===o.CurvedBottomLeft?(l.adjacentBot?.getPipe()instanceof d&&this.containsPipe(i+1,s)&&e.push(this.cells[i+1][s]),l.adjacentLeft?.getPipe()instanceof d&&this.containsPipe(i,s-1)&&e.push(this.cells[i][s-1])):r===o.CurvedBottomRight?(l.adjacentBot?.getPipe()instanceof d&&this.containsPipe(i+1,s)&&e.push(this.cells[i+1][s]),l.adjacentRight?.getPipe()instanceof d&&this.isValidCell(i,s+1)&&this.containsPipe(i,s+1)&&e.push(this.cells[i][s+1])):r===o.CurvedTopLeft?(l.adjacentTop?.getPipe()instanceof d&&this.containsPipe(i-1,s)&&e.push(this.cells[i-1][s]),l.adjacentLeft?.getPipe()instanceof d&&this.containsPipe(i,s-1)&&e.push(this.cells[i][s-1])):r===o.CurvedTopRight&&(l.adjacentTop?.getPipe()instanceof d&&this.containsPipe(i-1,s)&&e.push(this.cells[i-1][s]),l.adjacentRight?.getPipe()instanceof d&&this.containsPipe(i,s+1)&&e.push(this.cells[i][s+1])),e}getAdjacentCells(t,e){const i=this.isValidCell(t-1,e)?this.cells[t-1][e]:null,s=this.isValidCell(t+1,e)?this.cells[t+1][e]:null,r=this.isValidCell(t,e-1)?this.cells[t][e-1]:null,l=this.isValidCell(t,e+1)?this.cells[t][e+1]:null;return{adjacentTop:i,adjacentBot:s,adjacentLeft:r,adjacentRight:l}}isValidCell(t,e){return t>=0&&t<this.rows&&e>=0&&e<this.cols&&!this.cells[t][e].isBlocked()}containsPipe(t,e){return this.cells[t][e].getPipe()}getGridCell(t,e){return this.cells[t][e]}}document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("gameCanvas");n.width=u.cols*u.cellSize+200,n.height=u.rows*u.cellSize+200;const t=new f(u.rows,u.cols,u.cellSize);new h(n,t)});
