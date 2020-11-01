class Player{
    static number = 10;

    static InitPlayer(){
        Images.carSpriteImage.resize(GameManager.playerSize, GameManager.playerSize*2);
        carSprite = createSprite();
        carSprite.addImage(Images.carSpriteImage);
        carSprite.position.x = width/2;
        carSprite.position.y = height/2;
    }
}