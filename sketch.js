var num = 0;
var lastWasOut = false;
let walkersA = [];
let walkersB = [];
function setup () {
  const size = floor(min(windowWidth, windowHeight) * 0.9);
  createCanvas(size, size);
  setNum();
  fillWalkers(width / 2, height / 2);  
  stroke(0, 100);
  draw();
}
function windowResized () {
  const size = floor(min(windowWidth, windowHeight) * 0.9);
  resizeCanvas(size, size);
  clear();
}
function mouseClicked () {
  clear();
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
    this.velocityX = random(-5, 5);
    this.velocityY = random(-5, 5);
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
  num = random(2, 100);
  
  if(num < 35 || num > 65){
    num = random(2, 100);
  }
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
    walkersB.push(new Walker(xB, yB));
  }
}


//TODO
//-colors
//-background
