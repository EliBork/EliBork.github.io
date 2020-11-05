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
    this.velocityX = random(-3, 3);
    this.velocityY = random(-3,3);
    this.draw();
  }
  isOut () {
    return (this.x < 0 || this.x > width || this.y < 0 || this.y > height);
  }
  velocity () {
    this.velocityX += map(noise(this.x * 0.003, this.y * 0.003, millis() * 0.001), 0, 1, -1, 1);
    this.velocityY += map(noise(this.y * 0.003, this.x * 0.003, millis() * 0.001), 0, 1, -1, 1);
  }
  move () {  
    this.x += this.velocityX;
    this.y += this.velocityY;
  }
  draw () {
    line(this.x, this.y, this.px, this.py);
    strokeWeight(1);
    stroke(this.color);
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
  num = random(2, 1000);
  
 
}

function fillWalkers(x, y){
  walkersA = [];
  walkersB = [];
  var xA = random(x -60, x - 200);
  var yA = random(y - 200, y + 200);
   var xB = random(x + 60, x + 200);
  var yB = random(y - 200, y + 200);
  
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
  let cOne = color('rgba(161, 220, 255, 0.4)');
  
  let cTwo = color('rgba(161, 180, 255, 0.4)');
  return lerpColor(cOne, cTwo, random());
}

function randomColorB(){
  let cOne = color('rgba(255, 153, 160, 0.4)');
  
  let cTwo = color('rgba(255, 220, 220, 0.4)');
  return lerpColor(cOne, cTwo, random());
}




//TODO
//-colors
//-background
