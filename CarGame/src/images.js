class Images{
  static carSpriteImage;
  static trackRoadImage;
  static trackGrassImage;

  static loadAllImages(){
    //Load Car Image
    Images.carSpriteImage=loadImage("/CarGame/Assets/yellow_car.png");
    Images.trackRoadImage = loadImage("/CarGame/Assets/roaddebug.png");
    Images.trackGrassImage = loadImage("/CarGame/Assets/grassdebug.png");
    Images.DEBUGBLOCK = loadImage("/CarGame/Assets/debugblock.png");
  }

  static resizeAllImages(){
    Images.trackRoadImage.resize(GameManager.tileSize,GameManager.tileSize);
    Images.trackGrassImage.resize(GameManager.tileSize,GameManager.tileSize);
    Images.DEBUGBLOCK.resize(GameManager.tileSize,GameManager.tileSize);
  }
}
