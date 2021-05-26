let raindrops = [];
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style("z-index", "-1");
  fill("blue");
  noStroke();
}

function draw() {
  background(240);

  for (let i = 0; i < random(windowWidth / 80); i++) {
    raindrops.push(new Raindrop());
  }
  for (let rain of raindrops) {
    rain.update();
    rain.display();
  }
}

function Raindrop() {
  this.posX = random(width);
  this.posY = random(-20, 0);
  this.size = random(20, 50);

  this.update = function () {
    this.posY += pow(this.size, 0.75) * 2;
  };

  if (this.posY > height) {
    let index = raindrops.indexOf(this);
    raindrops.splice(index, 1);
  }

  this.display = function () {
    rect(this.posX, this.posY, 1, this.size);
  };
}
