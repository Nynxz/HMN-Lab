// let carSpriteImage;
// let carSprite;
let mainMap;

function preload() {
  Images.loadAllImages();
}

function setup() {
  Controls.Init();
  Images.resizeAllImages()
  GameManager.loadBackground();

  
  mainMap = new RaceTrack(debugTrackArray);
  mainMap.loadMap();

  Player.InitPlayer();
}

function draw() {
  GameManager.loadBackground();

  Controls.refresh();
  Player.move();
  
  drawSprites();
}

function mouseClicked(){
  Tile.spawnTileAtMouseDEBUG();
  console.log(mainMap);
}