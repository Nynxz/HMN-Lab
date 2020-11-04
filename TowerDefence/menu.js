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

        let startButton = new MenuButton(Images.Menu.StartButton, .5, width/2, height/4)
        startButton.sprite.onMousePressed = function() {
            allSprites.clear();

            SceneManager.CurrentScene = SceneManager.Scenes.InGame;

            GameManager.initGame();

            
        };
        
        let optionButton = new MenuButton(Images.Menu.OptionsButton, 1, width/2, (height/4)* 3);
        optionButton.sprite.onMousePressed = function(){
            allSprites.clear();
            
            Menu.createBackButton(SceneManager.Scenes.MainMenu, function(){
                Menu.createMainMenu();
            });


            SceneManager.CurrentScene = SceneManager.Scenes.OptionsMenu;
            
        }

        let creditButton = new MenuButton(Images.Menu.OptionsButton, .5, width/4, (height/4)* 3)
        creditButton.sprite.onMousePressed = function() {
            allSprites.clear();

            SceneManager.CurrentScene = SceneManager.Scenes.CreditMenu;

            Menu.createCreditMenu();
        };
    
    
        
    }

    static createBackButton(toWhere, doWhat){
        let backButton = new MenuButton(Images.Menu.OptionsButton, 1, (width/4) * 3, (height/4) * 3);
        backButton.sprite.onMousePressed = function(){
            allSprites.clear();
            SceneManager.CurrentScene = toWhere;
            doWhat();
        }
        return backButton;
    }
    
    static createPauseMenu(){
        console.log("CREATING BACK MENU");
        
        let back = Menu.createBackButton(SceneManager.Scenes.MainMenu, function(){
            Menu.createMainMenu();
        });
        back.sprite.addToGroup(GameManager.SpriteGroupPaused);

    }

    static createCreditMenu(){

        console.log("CREATING CREDIT MENU");
        let back = Menu.createBackButton(SceneManager.Scenes.MainMenu, function(){
            Menu.createMainMenu();
        });
        back.sprite.addToGroup(GameManager.SpriteGroupPaused);

    }
    

    static drawOptionsMenu(){
        //Draw Background Container
    }
}
