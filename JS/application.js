'use strict'
{
  const prev=document.getElementById('prev');
  const next=document.getElementById('next');
  const play=document.getElementById('play');
  
  const main=[];
  const mainImage=document.querySelectorAll('main>div')
  mainImage.forEach((div,index)=>{main.push(div)})

  let currentIndex=0;
  
function remove(){
  for(let i=0;i<main.length;i++){main[i].classList.remove(`main${i}`)}
  for(let i=0;i<main.length;i++){images[i].classList.remove(`selected`)}
}

function change(){
  main[currentIndex].classList.add(`main${currentIndex}`);
  images[currentIndex].classList.add('selected')
}

  const images=[];

  const thumbnails=document.querySelectorAll('[id^=img]')
  thumbnails.forEach((image,index)=>{images.push(image)
 image.addEventListener('click',(e)=>{
 remove()
 main[index].classList.add(`main${index}`);
 currentIndex=index;
e.target.classList.add('selected')});
  });
  
  function countUp(){
   remove()
    currentIndex++
    change()
    if(currentIndex===main.length -1){currentIndex=-1}
  }

prev.addEventListener('click',()=>{
  if(currentIndex===0){return;}
  remove()
  currentIndex--
  change()
})

next.addEventListener('click',()=>{
  if(currentIndex===main.length -1){return;}
remove()
  currentIndex++
  change()
})

let isPlaying=false;
let timeoutId;


function playSlideshow() {
  timeoutId = setTimeout(() => {
    countUp()
    playSlideshow();}, 2000);
}

play.addEventListener('click',()=>{
  if(isPlaying===false){
    playSlideshow()
    play.textContent='Pause'}
    else{clearTimeout(timeoutId);
    play.textContent='Play'};
    isPlaying=!isPlaying
})








class Panel{
  constructor(){
    const section=document.createElement('section');
    section.classList.add('panel');
    this.img=document.createElement('img');
    this.img.src=this.getRandomImage();
    this.timeoutId=undefined;
    this.stop=document.createElement('div');
    this.stop.textContent='STOP';
    this.stop.classList.add('stop','clicked');
    this.stop.addEventListener('click',()=>{
      if(this.stop.classList.contains('clicked')){return;}
      this.stop.classList.add('clicked');
      clearTimeout(this.timeoutId);
      panelsLeft--
      if(panelsLeft===0){checkResult();
        setTimeout(()=>{spin.classList.remove('clicked');},3000)
        panelsLeft=3 
        }  
    });
    section.appendChild(this.img);
    section.appendChild(this.stop);
    const aside=document.querySelector('aside');
    aside.appendChild(section); 
  }//ここまではクラスのオブジェクトをインスタンスでも使えるようにしている

  getRandomImage(){
    const images=['img/seven.png','img/bell.png','img/cherry.png'];
    return images[Math.floor(Math.random()*images.length)];
  }

  spin(){this.img.src=this.getRandomImage();
    this.timeoutId=setTimeout(()=>{this.spin()},20);
  }

  isUnmatched(p1, p2) {
    return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
  }

  unmatch() {
    this.img.classList.add('unmatched');
  }

  activate(){
    this.img.classList.remove('unmatched');
    this.stop.classList.remove('clicked')
  }
}


function checkResult() {
  if (panels[0].isUnmatched(panels[1], panels[2]))
   {panels[0].unmatch();}
  if (panels[1].isUnmatched(panels[0], panels[2]))
   {panels[1].unmatch();}
  if (panels[2].isUnmatched(panels[0], panels[1]))
   {panels[2].unmatch();}
   
}

const panels=[new Panel(),new Panel(),new Panel(),];

let panelsLeft=3;

const spin=document.getElementById('spin');

spin.addEventListener('click',()=>{
  if(spin.classList.contains('clicked')){return;}
  spin.classList.add('clicked');
  panels.forEach(panel=>{
    panel.activate();
    panel.spin(); })
})










const  size=document.querySelector('.number')
const  start=document.querySelector('button');
const sourceNumbers=[];
for(let i=0;i<99;i++)
{sourceNumbers.push(i)}
const timer=document.querySelector('time')
let currentOrder=0
let d;


const mode=6


function selectNumbers(mode){
  const nums=[];
   for(let i=0;i<mode;i++)
   {nums.push(sourceNumbers.splice(Math.floor(Math.random()*sourceNumbers.length),1)[0])}
   nums.sort(function(a,b){return a - b})
   return nums
  }
  let sortednum =selectNumbers(mode)

  class Board{
    constructor(){
      this.cards=[];
      for (let i=0;i<mode;i++)
      {this.cards.push(new Card());}
      this.setup();
  
    }
    setup(){
      const game=document.querySelector('.game');
      this.cards.forEach(card=>{
      game.appendChild(card.getDiv());
    });
    }
    startGame(){
      let nums=sortednum
      if(currentOrder===mode)
      {sortednum=selectNumbers(mode);
      nums=sortednum} 
    console.log(nums)
    let resetnum=[];
    for(let i=0;i<nums.length;i++){sourceNumbers.push(nums[i])}
      this.cards.forEach(card=>{
        const num=nums.splice(Math.floor(Math.random()*nums.length),1)[0]
        resetnum.push(num)
        card.startGame(num); 
      })
      sortednum=resetnum.sort(function(a,b){return a - b})
    }
  }



class Card{
  constructor(){
    this.div=document.createElement('div');
    this.div.classList.add('number');
    this.div.addEventListener('click',()=>{
      this.judge();
    })
  }
  getDiv(){return this.div}
  startGame(num){
    this.div.classList.remove('touched');
    this.div.textContent=parseInt(num, 10)
  }
  judge(){
    if(parseInt(this.div.textContent)===sortednum[currentOrder])
    {this.div.classList.add('touched');
    currentOrder++}
  if(currentOrder===mode)
  {clearTimeout(timeoutId);
    start.classList.remove('touched')}
  }
}

const game=new Board;

start.addEventListener('click',()=>{  
  if(start.classList.contains('touched')){return;}
 game.startGame();
 startTime();
})


function startTime(){
if(start.classList.contains('touched')){return;}
currentOrder=0;
  start.classList.add('touched');
  d=(new Date);
  counting();
  return d ;
}
function counting(){
  const now=new Date
  let timeoutId=undefined;
  if(currentOrder===mode){return}
  timeoutId=setTimeout(()=>{timer.textContent=
    ((now.getTime() - d.getTime()) / 1000).toFixed(2);counting()},10)
}







}
