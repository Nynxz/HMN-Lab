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

        //Why should we Normalize here? ! U tell me.
        let normalVector = Controls.ControlsVector2.normalize()
        Player.playerSprite.position.x += normalVector.x;
        Player.playerSprite.position.y -= normalVector.y;
    }

    static isOnScreen(){
        if(Player.playerSprite)
        return true;
    }
}