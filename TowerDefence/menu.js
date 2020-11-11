//create menu
//main menu 
//start game
//option 
//credit button

class MenuButton{
    constructor(img, scale, x, y){
        this.sprite = createSprite(x, y);
        this.sprite.addImage(img);
        this.sprite.scale = scale;
        //this.sprite.onMousePressed = func;
    }
}


class Menu {

    static createMainMenu(){

             // //Toggle Debug Buttons
       
        //These are buttons, we pass in an Image, "scale", position, then bind function to onMousePressed

        let startButton = new MenuButton(Images.Menu.LavaStartButton, 3, width/2, height/4)
        startButton.sprite.onMousePressed = function() {

            allSprites.clear();
            SceneManager.CurrentScene = SceneManager.Scenes.InGame;
            GameManager.initGame();
            MapEditor.debugLoadSaveMapButtons();
        };
        
        let optionButton = new MenuButton(Images.Menu.OptionsButton, 1, width/2, (height/4)* 3);
        optionButton.sprite.onMousePressed = function(){

            allSprites.clear();
            //"When we click Options Button, we want to create a way to get back, so we create a back button
            //    Which 'goes to' MainMenu and calls the createMainMenu() 'this function youre inside' "
            Menu.createBackButton(SceneManager.Scenes.MainMenu, function(){
                Menu.createMainMenu();
            });
            SceneManager.CurrentScene = SceneManager.Scenes.OptionsMenu;
        }

        let creditsButton = new MenuButton(Images.Menu.OptionsButton, .5, width/4, (height/4)* 3)
        creditsButton.sprite.onMousePressed = function() {
            
            allSprites.clear();
            SceneManager.CurrentScene = SceneManager.Scenes.CreditMenu;
            Menu.createCreditMenu();
        };

        let mapEditorButton = new MenuButton(Images.Menu.EditorButton, 2, width/2, height/2);
        mapEditorButton.sprite.onMousePressed = function(){

            GameManager.initGame();

            //Load Map Editor
            LayerManager.clearLayers();
            LayerManager.Layers.PauseMenuGroup.clear();
            LayerManager.Layers.GroundFloor.clear();
            LayerManager.Layers.PlayerCharactersGroup.clear();

            allSprites.clear();
            SceneManager.CurrentScene = SceneManager.Scenes.MapEditor;
            console.log("LOADING MAP EDITOR");

            MapEditor.createButtons();
        }

    }

    static createBackButton(toWhere, doWhat){
        //Create a new MenuButton
        let backButton = new MenuButton(Images.Menu.OptionsButton, 1, (width/4) * 3, (height/4) * 3);
        //Cookie Cutter for passing in where to go and what to do
        backButton.sprite.onMousePressed = function(){
            allSprites.clear();
            SceneManager.CurrentScene = toWhere;
            doWhat();
        }
        //Return incase we need to modify it
        return backButton;
    }
    
    static createPauseMenu(){
        //TODO: Implement a better pause
        console.log("CREATING BACK MENU");
        let back = Menu.createBackButton(SceneManager.Scenes.MainMenu, function(){
            Menu.createMainMenu();
            GameManager.allPlayers = [];
        });
        //Add to a group so we can wipe it easily
        back.sprite.addToGroup(LayerManager.Layers.PauseMenuGroup);
    }

    static createCreditMenu(){
        //TODO: Implement a credit menu
        console.log("CREATING CREDIT MENU");
        let back = Menu.createBackButton(SceneManager.Scenes.MainMenu, function(){
            Menu.createMainMenu();
        });
        back.sprite.addToGroup(LayerManager.Layers.PauseMenuGroup);

    }
    

    static drawOptionsMenu(){
        //Draw Background Container
    }
}
