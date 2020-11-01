class Player{
    //THIS IS JANK
    static number = 10;
    static playerSprite;

    static InitPlayer(){
        Images.carSpriteImage.resize(GameManager.playerSize, GameManager.playerSize*2);
        Player.playerSprite = createSprite();
        Player.playerSprite.addImage(Images.carSpriteImage);
        Player.playerSprite.position.x = width/2;
        Player.playerSprite.position.y = height/2;
    }

    static move(){
        Player.playerSprite.position.x += Controls.ControlsVector2.x;
        Player.playerSprite.position.y -= Controls.ControlsVector2.y;
    }
}