// let carSpriteImage;
// let carSprite;

function preload() {
  Images.loadAllImages();
}

function setup() {
  Controls.Init();

  GameManager.loadBackground();

  Player.InitPlayer();
}

function draw() {
  GameManager.loadBackground();

  Controls.refresh();
  Player.move();
  
  drawSprites();
}