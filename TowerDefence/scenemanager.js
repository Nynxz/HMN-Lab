class SceneManager{

    static Scenes = {MainMenu: 0, InGame: 1}
    static CurrentScene = SceneManager.Scenes.MainMenu;

    static debugNext(){
        let button = createSprite(width/2, height/2);
        button.onMousePressed = function(){
            allSprites.clear();
            SceneManager.CurrentScene = SceneManager.Scenes.InGame;
            GameManager.initializeGame();
        }
    }
}