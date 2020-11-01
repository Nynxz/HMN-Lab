let carSpriteImage;
let carSprite;

function preload() {
    loadAllImages();
}

function setup() {
  GameManager.loadBackground();
  Player.InitPlayer();
  
}

function draw() {
  drawSprites();
}

