function preload() {

}

function setup() {
  createCanvas(1000, 1000);
  background("red");
  GameManager.initGame();
}

function draw() {
  GameManager.refresh();
  drawSprites();
}
