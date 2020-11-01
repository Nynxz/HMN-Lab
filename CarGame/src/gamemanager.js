class GameManager{
    static playerSize = 32;
    static screenSize = 1000;

    static loadBackground(){
        createCanvas(GameManager.screenSize, GameManager.screenSize );
        background('red');
    }
}