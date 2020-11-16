var num = 0;
var lastWasOut = false;
let walkersA = [];
let walkersB = [];
function setup () {
  const size = floor(min(windowWidth, windowHeight) * 0.9);
  createCanvas(windowWidth, windowHeight);
  setNum();
  fillWalkers(width / 2, height / 2);  
  background(0);
  draw();
}
function windowResized () {
  const size = floor(min(windowWidth, windowHeight) * 0.9);
  resizeCanvas(size, size);
  clear();
}
function mouseClicked () {
  clear();
  
  background(0);
  setNum();
  walkers = [];
  noiseSeed(random(50));
  fillWalkers(mouseX, mouseY); 
}

class Walker {
  
  constructor (x, y) {
    this.x = x;
    this.y = y;
    this.px = x;
    this.py = y;
    this.color = color(0);
    this.velocityX = randomLargerNum(-5, 5);
    this.velocityY = randomLargerNum(-5, 5);
    this.draw();
  }
  isOut () {
    return (this.x < 0 || this.x > width || this.y < 0 || this.y > height);
  }
  velocity () {
    this.velocityX += map(noise(this.x * 0.0015, this.y * 0.0015, millis() * 0.0001), 0, 1, -1, 1);
    this.velocityY += map(noise(this.y * 0.0015, this.x * 0.0015, millis() * 0.0001), 0, 1, -1, 1);
  }
  move () {  
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
  draw () {
    line(this.x, this.y, this.px, this.py);
    strokeWeight(1.7);
    stroke(this.color);
    strokeJoin(ROUND);
    strokeCap(SQUARE);
    this.px = this.x;
    this.py = this.y;
  }
}

function draw () {
  for(var i = 0; i < num; i++){
    if (!walkersA[i].isOut()) {
      walkersA[i].velocity();
      walkersA[i].move();
      walkersA[i].draw();
  }
    
    if (!walkersB[i].isOut()) {
      walkersB[i].velocity();
      walkersB[i].move();
      walkersB[i].draw();
  }
  
  }
}

function setNum(){
  num = random(2, 900);
  
 
}

function fillWalkers(x, y){
  walkersA = [];
  walkersB = [];
  var xA = random(x - 60, x - width / 4);
  var yA = random(y - 200, y + height / 4);
   var xB = random(x + 60, x + width / 4);
  var yB = random(y - 200, y + height / 4);
  
  if(xA > width || xA < 0 || yA > height || yA < 0){
     if(xB > width || xB < 0 || yB > height || yB < 0 || lastWasOut){
       lastWasOut = true;
       fillWalkers();
       return;
     }
     }
  lastWasOut = false;
  for (let i = 0; i < num; i++) {
    walkersA.push(new Walker(xA, yA));
    walkersA[i].color = randomColorA();
    walkersB.push(new Walker(xB, yB));
    walkersB[i].color = randomColorB();
  }
}

function randomColorA(){
  let cOne = color('rgba(70, 126, 255, 0.2)');
  
  let cTwo = color('rgba(129, 233, 255, 0.2)');
  return lerpColor(cOne, cTwo, random());
}

function randomColorB(){
  let cOne = color('rgba(255, 103, 103, 0.2)');
  
  let cTwo = color('rgba(255, 190, 130, 0.2)');
  return lerpColor(cOne, cTwo, random());
}

function randomLargerNum(low, high){
  var i = random(low);
  var j = random(high);
  if(abs(i) > abs(j)){
    return i;
  } else{
    return j;
  }
}




//TODO
//-colors
//-background
