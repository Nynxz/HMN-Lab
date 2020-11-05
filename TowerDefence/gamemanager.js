class GameManager {

    
    
    //Array of all Players Active
    static allPlayers = [];

    static activePlayer = null;
    static gamePaused = false;
    
    //TODO MOVE?
    static SpriteGroupPaused;
    static debugHUD;

    //#region LAYERS
    static Layers = {};
    static initLayers(){

        GameManager.Layers.GroundFloor = createGraphics(1440, 816);
        GameManager.Layers.GroundFloor.isEnabled = true;

        //GameManager.Layers.GroundFloorExtras
        //GameManager.Layers.GroundFloorInteractables
        //GameManager.Layers.HouseFloor
        //GameManager.Layers.HouseWalls
        //GameManager.Layers.HouseInteractables
        //GameManager.Layers.EnemySprites

        GameManager.Layers.PlayerCharactersGroup = new Group();
        GameManager.Layers.PlayerCharactersGroup.isEnabled = true;

        //GameManager.Layers.PlayerTools

        GameManager.Layers.Effects = createGraphics(1440, 816);
        GameManager.Layers.Effects.isEnabled = true;

        //GameManager.Layers.Master = createGraphics(1440, 816);
        //GameManager.Layers.Master.isEnabled = true;

    }
    static drawActiveLayers(){

        if(GameManager.Layers.GroundFloor.isEnabled){
            image(GameManager.Layers.GroundFloor, 0, 0);
        }
        
        //GameManager.Layers.GroundFloorExtras
        //GameManager.Layers.GroundFloorInteractables
        //GameManager.Layers.HouseFloor
        //GameManager.Layers.HouseWalls
        //GameManager.Layers.HouseInteractables
        //GameManager.Layers.EnemySprites

        if(GameManager.Layers.PlayerCharactersGroup.isEnabled){
            GameManager.Layers.PlayerCharactersGroup.draw();
        }
        
        //GameManager.Layers.PlayerTools

        if(GameManager.Layers.Effects.isEnabled){
            image(GameManager.Layers.Effects, 0, 0);
        }

        //if(GameManager.Layers.Master.isEnabled){
            //image(GameManager.Layers.Master, 0, 0);
        //}
        
        //drawSprites();

    }
    //#endregion

    //#region GAME HOOKS
    static initGame(){
        GameManager.initLayers()

        GameManager.SpriteGroupPaused = new Group();
        GameManager.debugHUD = new HUD(0,0,300,height);

        Map.generateMap();

        DebugHelpers.toggleButtons();
    }

    static refreshGame() {


        if(Tile.activeTile){
            Tile.activeTile.markActive();
        }
        
        GameManager.allPlayers.forEach(player => {
            player.drawInfo();
            player.debugMovement();
            if(player.isSelected)
                player._selected();
        });

        //TODO: MOVE TO CONTROLS
        if(keyDown(17) && mouseWentUp(LEFT) && !GameManager.gamePaused && mouseX < width && mouseY < height && mouseX > 0 && mouseX > 0){
            //TODO: Implement a "getSprite" or "getActor" or something, stop using onMousePressed for selection of players
            Map.getTileAtWorldPosition(mouseX, mouseY);
            
            console.log(Tile.activeTile);
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
            if(GameManager.activePlayer){
                GameManager.activePlayer.isSelected = false;
                GameManager.activePlayer = null;
            } else {
                if(!GameManager.gamePaused){ 
                    GameManager.SpriteGroupPaused.removeSprites();
                    GameManager.gamePaused = true;
                    Menu.createPauseMenu();
                } else {
                    GameManager.gamePaused = false;
                    GameManager.SpriteGroupPaused.removeSprites();
                }
            }
            console.log("ESC PRESSED");
        }

        //Debug Interactable Spawners
        if(keyWentDown("s")){
           // let spend = new Interactable(Images.Interactables.Debug.SpendTouching, mouseX, mouseY, Interactable.Type.Spend, Interactable.Range.Touching);
        }
    }
    //#endregion
}
    


