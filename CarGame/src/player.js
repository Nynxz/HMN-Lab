class Player{

    static InitPlayer(){
        carSpriteImage.resize(GameManager.playerSize, GameManager.playerSize*2);
        carSprite=createSprite();
        carSprite.addImage(carSpriteImage);
        carSprite.position.x = width/2;
        carSprite.position.y = height/2;
    }
}