(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const l={rows:7,cols:9,cellSize:50,selectedCell:{row:0,col:0}},n={vertical:new Image,horizontal:new Image,curvedUp:new Image,curvedDown:new Image,cross:new Image,startup:new Image,startdown:new Image,startleft:new Image,startright:new Image,end:new Image,watercrosshorizontal:new Image,watercrossvertical:new Image,watercurvedup:new Image,watercurveddown:new Image,waterhorizontal:new Image,watervertical:new Image,bgcell:new Image};n.vertical.src="src/assets/pipes/vertical.png";n.horizontal.src="src/assets/pipes/horizontal.png";n.curvedUp.src="src/assets/pipes/curvedUp.png";n.curvedDown.src="src/assets/pipes/curvedDown.png";n.cross.src="src/assets/pipes/cross.png";n.startup.src="src/assets/start/startUp.png";n.startdown.src="src/assets/start/startDown.png";n.startleft.src="src/assets/start/startLeft.png";n.startright.src="src/assets/start/startRight.png";n.end.src="src/assets/end/end.png";n.watercrosshorizontal.src="src/assets/waterflow/crossHorizontal.png";n.watercrossvertical.src="src/assets/waterflow/crossVertical.png";n.watercurvedup.src="src/assets/waterflow/curvedUp.png";n.watercurveddown.src="src/assets/waterflow/curvedDown.png";n.waterhorizontal.src="src/assets/waterflow/horizontal.png";n.watervertical.src="src/assets/waterflow/vertical.png";n.bgcell.src="src/assets/bgcell.png";const g={startup:n.startup,startdown:n.startdown,startleft:n.startleft,startright:n.startright},p={watercrosshorizontal:n.watercrosshorizontal,watercrossvertical:n.watercrossvertical,watercurvedup:n.watercurvedup,watercurveddown:n.watercurveddown,waterhorizontal:n.waterhorizontal,watervertical:n.watervertical};class w{image;startImage;type;constructor(){this.type=this.getRandomPipeType(),this.image=this.getImageByType(this.type),this.startImage=this.getStartImage()}getRandomPipeType(){const e=["horizontal","curvedUp","curvedDown","cross","vertical"],t=Math.floor(Math.random()*e.length);return e[t]}getImageByType(e){switch(e){case"horizontal":return n.horizontal;case"vertical":return n.vertical;case"curvedUp":return n.curvedUp;case"curvedDown":return n.curvedDown;case"cross":return n.cross;default:throw new Error("invalid pipe type")}}getStartImage(){const e=Object.keys(g),t=Math.floor(Math.random()*e.length);return g[e[t]]}drawPipe(e,t,r,s){const i=()=>{e.save(),e.shadowColor="rgba(0, 0, 0, 0.5)",e.shadowBlur=10,e.shadowOffsetX=5,e.shadowOffsetY=5,e.drawImage(this.image,t,r,s,s),e.restore()};this.image.complete?i():this.image.onload=i}drawStartPipe(e,t,r,s){e.drawImage(this.startImage,t,r,s,s)}drawEndPipe(e,t,r,s){e.drawImage(n.end,t,r,s,s)}drawPipeWithWater(e,t,r,s){let i;switch(this.type){case"horizontal":i=p.waterhorizontal;break;case"vertical":i=p.watervertical;break;case"curvedUp":i=p.watercurvedup;break;case"curvedDown":i=p.watercurveddown;break;case"cross":i=p.watercrosshorizontal;break;default:throw new Error("invalid pipe type")}i.complete?e.drawImage(i,t,r,s,s):i.onload=()=>{e.drawImage(i,t,r,s,s)}}getPossibleConnectionsToAdjacentPipes(){switch(this.type){case"horizontal":return["east","west"];case"vertical":return["north","south"];case"curvedUp":return["north","east","west"];case"curvedDown":return["south","east","west"];case"cross":return["north","south","east","west"];default:return[]}}getType(){return this.type}}const v=()=>{const o=[];return{enqueue(e){o.push(e)},dequeue(){return o.shift()},size(){return o.length},isEmpty(){return o.length===0},getItems(){return o},peek(){return o[0]}}};class I{queue=v();constructor(e=5){for(let t=0;t<e;t++)this.queue.enqueue(this.generatePipe())}drawPipeQueue(e,t,r){this.queue.getItems().forEach((a,c)=>{const h=r+c*60;a.drawPipe(e,t,h,50)})}generatePipe(){return new w}getFirstPipe(){return this.queue.peek()}removeFirst(){this.queue.dequeue()}addLast(e){this.queue.enqueue(e)}}class P{canvas;ctx;grid;pipeQueue=new I(5);selectedPipe=null;isRunning=!0;countdown=10;timerInterval=null;score=0;constructor(e,t,r,s){this.canvas=e,this.ctx=e.getContext("2d"),this.grid=s,this.addEventListeners(),this.startGame()}startGame(){this.startCountdown(),this.runGameLoop()}startCountdown(){this.timerInterval=window.setInterval(()=>{this.countdown>0?this.countdown--:(this.stopCountdown(),this.startWaterFlow())},1e3)}stopCountdown(){this.timerInterval!==null&&(clearInterval(this.timerInterval),this.timerInterval=null)}startWaterFlow(){}runGameLoop(){const e=()=>{this.isRunning&&(this.updateGame(),this.drawGame(),requestAnimationFrame(e))};requestAnimationFrame(e)}updateGame(){this.countdown}drawGame(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.grid.drawGrid(this.ctx),this.grid.drawStartPipeInGrid(this.ctx,50),this.pipeQueue.drawPipeQueue(this.ctx,10,150),this.drawHUD()}drawHUD(){this.ctx.font="20px Arial",this.ctx.fillStyle="black",this.ctx.fillText(`Time until water: ${this.countdown}s`,10,20),this.ctx.fillText(`Score: ${this.score}`,10,50)}addEventListeners(){this.canvas.addEventListener("click",this.handleGridClick.bind(this))}handleGridClick(e){const t=e.clientX-this.grid.getStartX(this.ctx),r=e.clientY-this.grid.getStartY(this.ctx),s=Math.floor(t/l.cellSize),i=Math.floor(r/l.cellSize);i>=0&&i<l.rows&&s>=0&&s<l.cols&&(this.handlePipeSelection(),this.selectedPipe&&(this.grid.setCellPipe(i,s,this.selectedPipe),this.score+=10))}handlePipeSelection(){const e=this.pipeQueue.getFirstPipe();if(e){this.selectedPipe=e,this.pipeQueue.removeFirst();const t=this.pipeQueue.generatePipe();this.pipeQueue.addLast(t)}}}class C{rows;cols;cellSize;cells;startPipePosition=null;startPipe=null;image=n.bgcell;constructor(e,t,r){this.rows=e,this.cols=t,this.cellSize=r,this.cells=[],this.initializeGrid()}initializeGrid(){const e=this.generateBlockedIndices();this.cells=this.createGrid(e)}generateBlockedIndices(){const e=this.rows*this.cols,t=Math.floor(e*.1),r=new Set;for(;r.size<t;){const s=Math.floor(Math.random()*e);r.add(s)}return r}createGrid(e){const t=[];for(let r=0;r<this.rows;r++){const s=[];for(let i=0;i<this.cols;i++){const a=r*this.cols+i,c=e.has(a);s.push({pipe:null,blocked:c,water:!1})}t.push(s)}return t}getStartX(e){return e.canvas.getBoundingClientRect().x+this.getBorderIntervalX(e)}getBorderIntervalX(e){return(e.canvas.width-this.cols*this.cellSize)/2}getStartY(e){return e.canvas.getBoundingClientRect().y+this.getBorderIntervalY(e)}getBorderIntervalY(e){return(e.canvas.height-this.rows*this.cellSize)/2}setCellPipe(e,t,r){const s=this.cells[e][t];return s.blocked?!1:(s.pipe=r,!0)}drawGrid(e){e.clearRect(0,0,this.cols*this.cellSize,this.rows*this.cellSize);for(let t=0;t<this.rows;t++)for(let r=0;r<this.cols;r++)this.drawCell(e,t,r)}drawoneCell(e,t,r,s){this.image.complete?e.drawImage(this.image,t,r,s,s):this.image.onload=()=>{e.drawImage(this.image,t,r,s,s)}}drawCell(e,t,r){const s=this.cells[t][r],{x:i,y:a}=this.getCellPosition(t,r,e);s.blocked?(e.fillStyle="gray",e.fillRect(i,a,this.cellSize,this.cellSize)):s.pipe?s.pipe.drawPipe(e,i,a,this.cellSize):this.drawoneCell(e,i,a,this.cellSize),e.strokeStyle="black",e.strokeRect(i,a,this.cellSize,this.cellSize)}getCellPosition(e,t,r){const{borderIntervalX:s,borderIntervalY:i}=this.getBorderIntervals(r);return this.getGridCoordinate(e,t,s,i)}getBorderIntervals(e){const t=this.getBorderIntervalX(e),r=this.getBorderIntervalY(e);return{borderIntervalX:t,borderIntervalY:r}}getGridCoordinate(e,t,r,s){const i=r+t*this.cellSize,a=s+e*this.cellSize;return{x:i,y:a}}drawStartPipeInGrid(e,t){if(!this.startPipePosition){let i=!1;for(;!i;){const{randomRow:a,randomCol:c}=this.generateRandomPipePosition();this.areStartPipeCoordinatesValid(a,c,e)&&(i=!0)}this.startPipe||(this.startPipe=new w)}const{x:r,y:s}=this.startPipePosition;this.startPipe?.drawStartPipe(e,r,s,t)}areStartPipeCoordinatesValid(e,t,r){if(e===this.rows-1||this.cells[e][t].blocked)return!1;const s=this.getNeighboringCells(e,t);for(const{row:d,col:u}of s)if(this.isCellBlocked(d,u))return this.tryMoveStartPipe(e,t,r);const{borderIntervalX:i,borderIntervalY:a}=this.getBorderIntervals(r),{x:c,y:h}=this.getGridCoordinate(e,t,i,a);return this.startPipePosition={x:c,y:h},!0}tryMoveStartPipe(e,t,r){const s=[{row:e-1,col:t},{row:e+1,col:t},{row:e,col:t-1},{row:e,col:t+1}];for(const{row:i,col:a}of s)if(this.isValidCell(i,a)&&!this.isCellBlocked(i,a)&&this.getNeighboringCells(i,a).every(({row:d,col:u})=>!this.isCellBlocked(d,u))){const{borderIntervalX:d,borderIntervalY:u}=this.getBorderIntervals(r),{x:m,y:f}=this.getGridCoordinate(i,a,d,u);return this.startPipePosition={x:m,y:f},!0}return!1}getNeighboringCells(e,t){return[{row:-1,col:0},{row:1,col:0},{row:0,col:-1},{row:0,col:1}].map(({row:s,col:i})=>({row:e+s,col:t+i})).filter(({row:s,col:i})=>this.isValidCell(s,i))}isValidCell(e,t){return e>=0&&e<this.rows&&t>=0&&t<this.cols}isCellBlocked(e,t){return this.isValidCell(e,t)?this.cells[e][t].blocked:!0}generateRandomPipePosition(){const e=this.cells.length,t=this.cells[0].length,r=Math.floor(Math.random()*e),s=Math.floor(Math.random()*t);return{randomRow:r,randomCol:s}}hasAdjacentConnections(e,t){const s=this.cells[e][t].pipe?.getPossibleConnectionsToAdjacentPipes()||[];for(const i of s){const a=this.getAdjacentCellPipe(e,t,i);if(a){const[c,h]=a,d=this.cells[c][h];if(d&&d.pipe)return{row:a[0],col:a[1]}}}return null}getAdjacentCellPipe(e,t,r){switch(r){case"north":return e>0?[e-1,t]:null;case"south":return e<this.cells.length-1?[e+1,t]:null;case"east":return t<this.cells[0].length-1?[e,t+1]:null;case"west":return t>0?[e,t-1]:null;default:return null}}}document.addEventListener("DOMContentLoaded",()=>{const o=document.getElementById("gameCanvas");o.width=l.cols*l.cellSize+200,o.height=l.rows*l.cellSize+200;const e=document.getElementById("pipe-queue"),t=document.getElementById("game-status"),r=new C(l.rows,l.cols,l.cellSize);new P(o,e,t,r).startGame()});