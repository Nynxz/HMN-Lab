class Images{
  static carSpriteImage;
  static trackRoadImage;
  static trackGrassImage;

  static loadAllImages(){
    //Load Car Image
    Images.carSpriteImage=loadImage("/CarGame/Assets/yellow_car.png");
    Images.trackRoadImage = loadImage() //TODO GET IMG;
    Images.trackGrassImage = loadImage() //TODO GET IMG;
  }
}
