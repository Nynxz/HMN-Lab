class Images{
  static carSpriteImage;
  static trackRoadImage;
  static trackGrassImage;

  static loadAllImages(){
    //Load Car Image
    Images.carSpriteImage=loadImage("/CarGame/Assets/yellow_car.png");
    Images.trackRoadImage = loadImage("/CarGame/Assets/roaddebug.png") //TODO GET IMG;
    Images.trackGrassImage = loadImage("/CarGame/Assets/grassdebug.png") //TODO GET IMG;
  }
}
