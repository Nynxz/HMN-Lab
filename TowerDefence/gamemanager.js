class GameManager {

    static Layers = {
        GroundFloor: 0,
        GroundFloorExtras: 1, 
        GroundFloorInteractables: 2, 
        HouseFloor: 3, 
        HouseWalls: 4,
        HouseInteractables: 5,
        EnemySprites: 6,
        PlayerCharacters: 7,
        PlayerTools: 8,
        Effects: 9,
        Master: 10
    }
    
    //Array of all Players Active
    static allPlayers = [];

    static activePlayer = null;
    static gamePaused = false;
    static SpriteGroupPaused;

    static initGame(){
        GameManager.SpriteGroupPaused = new Group();
        //Make an Instance of a Player - DEBUG 100 100
        let debugPlayer1 = new Player("DEBUG1", 200, 400);
        let debugPlayer2 = new Player("DEBUG2", 400, 400);
        let debugPlayer3 = new Player("DEBUG3", 600, 400);
        let debugHealthBar = new HealthBar();

        //Push that Instance to allPlayers.
        GameManager.allPlayers.push(debugPlayer1);
        GameManager.allPlayers.push(debugPlayer2);
        GameManager.allPlayers.push(debugPlayer3);

        Map.generateMap();

        DebugHelpers.toggleButtons();
        
    }

    static refresh() {

        GameManager.allPlayers.forEach(player => {
            if(player.isSelected)
                player._selected();
        });

        if(mouseWentUp(LEFT) && !GameManager.gamePaused && mouseX < width && mouseY < height && mouseX > 0 && mouseX > 0){
            
            console.log("X: ", mouseX, "Y: ", mouseY);
            if(GameManager.activePlayer){
                GameManager.activePlayer.sprite.position.x = mouseX;
                GameManager.activePlayer.sprite.position.y = mouseY;
                console.log("Active Player: ", GameManager.activePlayer.name);
            }
            //let fire = createSprite(mouseX, mouseY-25);
            //fire.addAnimation('fire', Images.Effects.Fire2);
            //fire.scale = 1;

        }

        if(keyWentDown("esc")){
            if(!GameManager.gamePaused){ 
                GameManager.SpriteGroupPaused.removeSprites();
                GameManager.gamePaused = true;
                Menu.createPauseMenu();
            } else {
                GameManager.gamePaused = false;
                GameManager.SpriteGroupPaused.removeSprites();
            }
            console.log("ESC PRESSED");
        }

        //Debug Interactable Spawners
        if(keyWentDown("s")){
            let spend = new Interactable(Images.Interactables.Debug.SpendTouching, mouseX, mouseY, Interactable.Type.Spend, Interactable.Range.Touching);
        }
    }
}
    


