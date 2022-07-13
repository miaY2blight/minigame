'use strict'
{
  {
  function canvas1() {
    class IconDrawer {
      constructor(a) {
        this.ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        this.ctx.scale(dpr, dpr)
        this.width = canvas.width / dpr
        this.height = canvas.height / dpr
        this.r = canvas.width / 8
      }
      draw(b) {
        this.ctx.fillStyle = 'rgba(255,255,255,.3)'
        this.ctx.fillRect(0, 0, this.width, this.height);
        this.ctx.save();
        this.ctx.translate(this.width / 2, this.height / 2,)
        this.ctx.rotate(Math.PI / 180 * b)
        this.ctx.beginPath();
        this.ctx.moveTo(0, - this.r - this.r / 12);
        this.ctx.lineTo(0, - this.r + this.r / 12);
        this.ctx.strokeStyle = 'orange'
        this.ctx.lineWidth = this.r / 12
        this.ctx.stroke();
        this.ctx.restore();
      }
    }

    class Icon {
      constructor(b) {//4.これらの素材を使って
        this.drawer= b;
        this.angle = 0;
      }
      draw() {
        this.drawer.draw(this.angle);
      }
      update() {
        this.angle += 8;
      }
      run() {
        this.update();
        this.draw();
        setTimeout(() => { this.run(); }, 50)
      }
    }

    const canvas = document.getElementById('cav1');
    if (typeof canvas.getContext === 'undefined') { return; }//2.canvasは使えるので
    const icon = new Icon(new IconDrawer('#cav1'));//3.Iconという料理セットを用意します。
    icon.run();//5.特定の料理を作ります
  }
  canvas1();//1.関数を呼び出す
  }


{
  function canvas2()  {
    class ClockDrawer {
      constructor(AAA) {//AAAにはcav2が入る
        this.ctx = AAA.getContext('2d');
        const dpr=window.devicePixelRatio
        this.width = AAA.width*dpr;
        this.height = AAA.height*dpr;
        this.ctx.scale(1/dpr,1/dpr)
      }//cav2についてdprなどを取得して
      draw(EEE, func) {
        this.ctx.save();
        this.ctx.translate(this.width / 2, this.height / 2);
        this.ctx.rotate(Math.PI / 180 * EEE);//angleが仮引数EEEに入る
        this.ctx.beginPath();
        func(this.ctx);
        this.ctx.stroke();
        this.ctx.restore();
      }
      clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
      }
    }
  
    class Clock {
      constructor(BBB) {//ClockDrawerオブジェクト自身をこの仮引数BBBで受け取る
        this.r = 100
        this.CCC = BBB;//さらにCCCへ代入、CCCを鍵として別クラスのメソッドへアクセス
      } 
      drawFace() {
        for (let angle = 0; angle < 360; angle += 6) {
          this.CCC.draw(angle, FFF => {//ここで別クラスのdrawメソッドが呼ばれ実引数
            FFF.moveTo(0, -this.r);
            if (angle % 30 === 0) {
              FFF.lineWidth = 2;
              FFF.lineTo(0, -this.r + 10);
              FFF.font = '13px Arial';
              FFF.textAlign = 'center';
              FFF.fillText(angle / 30 || 12, 0, -this.r + 25);
            } else {
              FFF.lineTo(0, -this.r + 5);
            }
          });
        }
      }
    
      drawHands() {
        // hour
        this.CCC.draw(this.h * 30 + this.m * 0.5, ctx => {
          ctx.lineWidth = 6;
          ctx.moveTo(0, 10);
          ctx.lineTo(0, -this.r + 50);
        });
        // minute
        this.CCC.draw(this.m * 6, ctx => {
          ctx.lineWidth = 4;
          ctx.moveTo(0, 10);
          ctx.lineTo(0, -this.r + 30);
        });
        // second
        this.CCC.draw(this.s * 6, ctx => {
          ctx.strokeStyle = 'red';
          ctx.moveTo(0, 20);
          ctx.lineTo(0, -this.r + 20);
        });
      }
      update() {
        this.h = (new Date()).getHours();
        this.m = (new Date()).getMinutes();
        this.s = (new Date()).getSeconds();
      }
      run() {
        this.update();
        this.CCC.clear();
        this.drawFace();
        this.drawHands();
        setTimeout(() => { this.run();}, 100);
      }
    }
    
    const cav2 = document.getElementById('cav2');
    if (typeof cav2.getContext === 'undefined') {
      return;}
  
    const clock = new Clock(new ClockDrawer(cav2));//どのキャンバスに対して
    clock.run();
  }
canvas2();
}





{
function canvas3(){
class MazeRenderer{
 constructor(M,N,Q){
  this.ctx=Q.getContext('2d');
  this.dpr=window.devicePixelRatio
  this.width = Q.width*this.dpr;
  this.height = Q.height*this.dpr;
  this.m=M;
  this.n=N;
  this.ctx.scale(this.dpr,this.dpr)
 }
 render(D){
  for(let row=0;row<D.length;row++){
    for(let col=0;col<D[0].length;col++){
      if(D[row][col]===1)
      {this.ctx.fillRect(col*(100/this.m)/this.dpr,row*(100/this.n)/this.dpr,(100/this.m)/this.dpr,(100/this.n)/this.dpr)}
    }
  }

 }
}


class Maze{
constructor(M,N,O){
  if(M<5||N<5||M%2===0||N%2===0)
  {alert('Size not valid!');return;}
  this.P=O;
  this.m=M
  this.n=N
  this.data=this.getData();
}
getData(){
  const data=[];
  for(let row=0;row<this.m;row++){
    data[row]=[];
    for(let col=0;col<this.n;col++){
      data[row][col]=1;  }
  }
  for(let row=1;row<this.m - 1;row++){
    for(let col=1;col<this.n- 1;col++){
      data[row][col]=0;  }
  }
  for(let row=2;row<this.m - 2;row+=2){
    for(let col=2;col<this.n - 2;col+=2){
      data[row][col]=1; }
  }
  for(let row=2;row<this.m - 2;row+=2){
    for(let col=2;col<this.n - 2;col+=2){
      let destRow;
      let destCol;
      do{
        const dir=row=== 2?Math.floor(Math.random()*4):
        Math.floor(Math.random()*3)+1 ;
        switch(dir){
          case 0:destRow=row -1;destCol=col;//up
            break;
          case 1:destRow=row +1;destCol=col;//down
            break;
          case 2:destRow=row;destCol=col -1;//left
            break;
          case 3:destRow=row ;destCol=col + 1;//right
            break;
        }
      }while(data[destRow][destCol]===1)
      data[destRow][destCol]=1
     }
}
return data;
}
render(){
  this.P.render(this.data);
}
}
const cav3 = document.getElementById('cav3');
if (typeof cav3.getContext === 'undefined') {
  return;} 
  const maze=new Maze(67,67,new MazeRenderer(39,29,cav3));
  maze.render();
}
canvas3();
}



function canvas4(){
  class PuzzleRenderer{
    constructor(puz,cav){
      this.puzzle=puz;
      this.cav=cav;
      this.ctx=this.cav.getContext('2d');
      this.dpr=window.devicePixelRatio
      this.width = this.cav.width*this.dpr;
      this.height = this.cav.height*this.dpr;
      this.ctx.scale(1/this.dpr,1/this.dpr);
      this.img=document.createElement('img')
      this.img.src='img/animal3.png';
      this.img.addEventListener('load',()=>{
      this.render();
      });
      this.cav.addEventListener('click',(e)=>{
       if(this.puzzle.getCompletedStatus()===true){return;}
       const rect=this.cav.getBoundingClientRect();
       const col=Math.floor(((e.clientX - rect.left)/cav.clientWidth)*4)
       const row=Math.floor(((e.clientY - rect.top)/cav.clientHeight)*4)
       console.log(row,col)
       this.puzzle.swapTiles(col,row);
       this.render();
       if (this.puzzle.isComplete() === true) {
         this.puzzle.setCompletedStatus(true);
         this.renderGameClear();
       }
      });
    }
    renderGameClear(){
      this.ctx.fillStyle='rgba(0,0,0,0.4)'
      this.ctx.fillRect(0,0,this.width,this.height);
      switch(this.width){
        case 200:this.ctx.font = '1.4rem Arial';
        break;
        case 250:this.ctx.font = '1.8rem Arial';
        break;
        case 262.5:this.ctx.font = '1.9rem Arial';
        break
        case 275:this.ctx.font = '2rem Arial';
        break
        case 300:this.ctx.font = '2.1rem Arial';
        break
        case 350:this.ctx.font = '2.4rem Arial';
        break
        case 400:this.ctx.font = '2.7rem Arial';
        break
      }
      this.ctx.fillStyle = '#fff';
      this.ctx.fillText('GAME CLEAR!!', this.width /8, this.height /2);
    }
    render(){
      for(let row=0;row<4;row++){
        for(let col=0;col<4;col++){
        this.renderTile(this.puzzle.getTile(row,col),col,row);
        }
      }
    }
    renderTile(n,col,row){
      if(n===15){
        this.ctx.fillStyle='#eeeeee'
        this.ctx.fillRect(col*this.width / 4,row*this.height / 4,this.width / 4,this.height / 4)
      }else{
     this.ctx.drawImage(this.img,
     (n%4)*70,Math.floor(n/4)*70,70,70,
       col*this.width / 4,row*this.height / 4,this.width / 4,this.height / 4);}
    }
  }


  class Puzzle{
    constructor(Lev){
      this.level=Lev;
       this.tiles=[
        [0,1,2,3],
        [4,5,6,7],
        [8,9,10,11],
        [12,13,14,15],
       ];
       this.UDLR=[[0,-1],[0,1],[-1,0],[1,0]]
       this.isCompleted=false;
       do{
         this.shuffle(this.level)
       }while(this.isComplete()===true);
    }
    getCompletedStatus(){
      return this.isCompleted;
    }
    setCompletedStatus(value) {
      return this.isCompleted = value;
    }
    getTile(row,col){
      return this.tiles[row][col];
    }
    shuffle(n){
      let blankCol=3;
      let blankRow=3;
      for(let i=0;i<n;i++){
        let destCol;
        let destRow;
        do{
          const dir =Math.floor(Math.random()*4);
          destCol = blankCol+this.UDLR[dir][0];
          destRow =blankRow +this.UDLR[dir][1];
        }while(this.isOutside(destCol,destRow)===true);
        [this.tiles[blankRow][blankCol],this.tiles[destRow][destCol]]=
        [this.tiles[destRow][destCol],this.tiles[blankRow][blankCol]];
        [blankCol,blankRow]=[destCol,destRow];
      }
    }
    swapTiles(col, row) {
      if (this.tiles[row][col] === 15) { return; }
      for (let i = 0; i < 4; i++) {
        const destCol=col+this.UDLR[i][0];
        const destRow=row+this.UDLR[i][1];
        if (this.isOutside(destCol,destRow)===true)
         { continue; }
        if (this.tiles[destRow][destCol] === 15) {
          [ this.tiles[row][col],
            this.tiles[destRow][destCol], ] = 
          [this.tiles[destRow][destCol],
            this.tiles[row][col],];
          break;
        }
      }
    }
    isOutside(destCol,destRow){
      return (destCol < 0 || destCol > 3 ||destRow < 0 || destRow > 3)
    }
    isComplete() {
      for(let row=0;row<4;row++){
        for(let col=0;col<4;col++){
          if(this.tiles[row][col]!==row*4+col){return false}
        }
      }
      return true;
    }

  }

  const cav4 = document.getElementById('cav4');
if (typeof cav4.getContext === 'undefined') {
  return;} 
  new PuzzleRenderer(new Puzzle(2),cav4);
}
canvas4()



function canvas5(){
  function rand(min,max){
    return Math.random()*(max-min)+min;
  }
  class Ball {
    constructor(cas) {
      this.cav = cas;
      this.ctx = this.cav.getContext('2d');
      this.dpr=window.devicePixelRatio
      this.width = this.cav.width*this.dpr;
      this.height = this.cav.height*this.dpr;
      this.ctx.scale(1/this.dpr,1/this.dpr);
      this.x = rand(this.width / 10*this.dpr,250,this.width / 1.2*this.dpr);
      this.y = 50;
      this.r = this.width / 30*this.dpr;
      this.vx=rand(this.width/100*this.dpr,this.width / 60*this.dpr)*(Math.random()<0.5?1:-1);
      this.vy=rand(this.height/100*this.dpr,this.height / 60*this.dpr)
      this.isMissed=false;
    }
    getMIssedStatus(){
      return this.isMissed;
    }
    getX(){
      return this.x;
    }
    getY(){
      return this.y;
    }
    getR(){
      return this.r;
    }
    bounce(){
      this.vy*=-1;
    }
    reposition(paddleTop){
      this.y=paddleTop - this.r;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if(this.y -this.r>this.width*this.dpr)
      {this.isMissed=true;}
      if(this.x - this.r<0 || this.x + this.r>this.width*this.dpr)
      {this.vx*=-1;}
      if(this.y - this.r<0)
      {this.vy*=-1;}
    }
    draw() {
      this.ctx.beginPath();
      this.ctx.fillStyle = 'whitesmoke';
      this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }


  class Paddle{
    constructor(pd,jt){
      this.cav=pd;
      this.game=jt;
      this.ctx=this.cav.getContext('2d');
      this.dpr=window.devicePixelRatio
      this.width = this.cav.width*this.dpr
      this.height = this.cav.height*this.dpr
      this.w=(this.width/4)*this.dpr;
      this.h=(this.height/25)*this.dpr;
      this.x=(this.width) -(this.w/2);
      this.y=(this.height*this.dpr)-((this.height/5)*this.dpr);
      this.mouseX=this.x;
      this.addHandler();
;    }
    addHandler(){
      document.addEventListener('mousemove',e=>{
        this.mouseX=e.clientX;
      });
    }
    update(ball){
      const ballBottom=ball.getY()+ball.getR();
      const paddleTop=this.y;
      const ballTop=ball.getY()-ball.getR();
      const paddleBottom=this.y+this.h;
      const ballCenter=ball.getX();
      const paddleLeft=this.x;
      const paddleRight=this.x+this.w;
      if(ballBottom>paddleTop&&ballTop<paddleBottom&&
          ballCenter>paddleLeft&&ballCenter<paddleRight)
        {ball.bounce();
        ball.reposition(paddleTop);
        this.game.addScore()}
      const rect=this.cav.getBoundingClientRect();
      this.x=(((this.mouseX -rect.left)/this.cav.clientWidth)*(this.width*this.dpr))-(this.w/2)
      if(this.x<0){this.x=0}
      if(this.x+this.w>this.width*this.dpr)
      {this.x=this.width*this.dpr-this.w}
    }
    draw(){
      this.ctx.fillStyle='whitesmoke';
      this.ctx.fillRect(this.x,this.y,this.w,this.h);
 
    }
  }

  class Game {
    constructor(cas) {
      this.cv = cas;
      this.ctx = this.cv.getContext('2d');
      this.dpr=window.devicePixelRatio
      this.width = this.cv.width*this.dpr;
      this.height = this.cv.height*this.dpr;
      this.ctx.scale(1/this.dpr,1/this.dpr);
      this.ball = new Ball(this.cv);
      this.paddle=new Paddle(this.cv,this)
      this.loop();
      this.isGameOver=false;
      this.score=0;
    }
    loop() {
      if(this.isGameOver){return;}
      this.update();
      this.draw();     
      requestAnimationFrame(() => {this.loop();});
    }
    update() {
      this.ball.update();
      this.paddle.update(this.ball);
      if(this.ball.getMIssedStatus())
      {this.isGameOver=true;}
    }
    draw() {
      if(this.isGameOver)
      {this.drawGameOver();return;}
      this.ctx.clearRect(0,0,this.width*this.dpr,this.height*this.dpr)
      this.ball.draw();
      this.paddle.draw();
      this.drawScore()
    }
    addScore(){
      this.score+=10;
    }
    drawGameOver(){
      this.ctx.fillStyle='tomato';
      this.ctx.textBaseline='bottom'
      switch(this.width){
        case 200:
          this.ctx.font ='46px "Arial Black"'
          this.ctx.fillText('GAME OVER',this.width/4,this.height);
        break;
        case 250:
          this.ctx.font='58px "Arial Black"';
          this.ctx.fillText('GAME OVER',this.width/2,this.height*1.4);
        break;
        case 262.5:
          this.ctx.font='64px "Arial Black"';
          this.ctx.fillText('GAME OVER',this.width/2,this.height*1.3);
        break
        case 275:
            this.ctx.font ='76px "Arial Black"'
            this.ctx.fillText('GAME OVER',this.width/2,this.height*1.5);
        break
        case 300:
          this.ctx.font='92px "Arial Black"';
          this.ctx.fillText('GAME OVER',this.width/2,this.height*1.6);
        break
        case 350:
            this.ctx.font ='134px "Arial Black"'
            this.ctx.fillText('GAME OVER',this.width/2,this.height*1.8);
        break
        case 400:
            this.ctx.font ='154px "Arial Black"'
            this.ctx.fillText('GAME OVER',this.width*3/4,this.height*2);
        break
      }
    }
    drawScore(){
      this.ctx.fillStyle='whitesmoke';
      switch(this.width){
        case 200:
          this.ctx.font ='33px Arial'
        break;
        case 250:
          this.ctx.font='42px Arial';
        break;
        case 262.5:
          this.ctx.font='46px Arial';
        break
        case 275:
            this.ctx.font ='54px Arial'
        break
        case 300:
          this.ctx.font='66px Arial';
        break
        case 350:
            this.ctx.font ='96px Arial'
        break
        case 400:
            this.ctx.font ='110px Arial'
        break
      }
      this.ctx.textBaseline='top'
      this.ctx.textAlign='left'
      this.ctx.fillText(this.score,0,0);
    }
  }
  
  const cav5 = document.getElementById('cav5');
  if (typeof cav5.getContext === 'undefined') {
    return;} 
    new Game(cav5);
  }
 canvas5();
}


