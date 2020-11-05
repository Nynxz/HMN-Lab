class SceneManager{

    static Scenes = {MainMenu: 'mainmenu', OptionsMenu: 'optionsmenu', CreditMenu: 'creditmenu', InGame: 'ingame'}
    static CurrentScene = SceneManager.Scenes.InGame;

    static debugNext(){
        let button = createSprite(width/2, height/2);
        button.onMousePressed = function(){
            allSprites.clear();
            SceneManager.CurrentScene = SceneManager.Scenes.InGame;
            GameManager.initializeGame();
        }
    }
}

class GrassDebug {
    constructor() {
        this.length = length;
        this.width = width;
    }
    debugCreateBackground() {
        let debugBackground = createSprite(0,0);
        debugBackground.addImage("/TowerDefence/assets/debug/GrassDebug.png")
        console.log(debugBackground);
    }

}

