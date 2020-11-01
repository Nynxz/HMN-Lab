let carSpriteImage;
let carSprite;

function preload() {
  Images.loadAllImages();
}

function setup() {
  GameManager.loadBackground();
  Player.InitPlayer();
  console.log(Player.number);
}

function draw() {
  drawSprites();
}

