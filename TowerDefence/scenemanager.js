class SceneManager{

    static Scenes = {MainMenu: 'mainmenu', OptionsMenu: 'optionsmenu', CreditMenu: 'creditmenu', MapEditor: 'mapeditor', InGame: 'ingame'}
    static CurrentScene = SceneManager.Scenes.MainMenu;

    //THIS IS FUCKED
    static debugNext(){
        let button = createSprite(width/2, height/2);
        button.onMousePressed = function() {
            allSprites.clear();
            SceneManager.CurrentScene = SceneManager.Scenes.InGame;
            GameManager.initializeGame();
        }
    }
}