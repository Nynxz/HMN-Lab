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
  Tile.Refresh();
  drawSprites();
}

function mouseClicked(){
  for(let i = 0; i < 10; i++){
    Tile.spawnTileAtMouseDEBUG();
  }
  console.log(mainMap);
}