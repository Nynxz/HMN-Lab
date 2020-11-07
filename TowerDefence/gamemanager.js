class GameManager {

    
    
    //Array of all Players Active
    static allPlayers = [];

    static activePlayer = null;
    static gamePaused = false;
    
    //TODO MOVE?
    static debugHUD;   

    //#region GAME HOOKS
    static initGame(){
        GameManager.gamePaused = false;
        LayerManager.initLayers()

        GameManager.debugHUD = new HUD(0,0,300,height);

        //16, 32, 48
        Map.generateMap(24, width, height);

        DebugHelpers.toggleButtons();
        
        console.log("MAP: " , Map.floorTiles);

        GameManager.pathfinding = new Pathfinding();
        GameManager.pathfinding.loadGrid(Map.floorTiles, 0, 0, false);

        console.log(GameManager.pathfinding.nodes);
    }

    static refreshGame() {

        if(Map.activeTile){
            Map.activeTile.markActive();
        }

        //MULTI SELECT KINDA
        // Map.floorTiles.forEach(col => {
        //     col.forEach(tile => {
        //         if(tile.debugActive){
        //             //console.log("MARKING");
        //             tile.markActive(Tile.visualRedCircle);
        //         }
        //     })
        // });
        
        GameManager.allPlayers.forEach(player => {
            player.drawInfo();
            player.debugMovement();
            player.andyMovement()
            //player.debugRefresh();
            //player.pathingMovement(1);
            if(player.isSelected)
                player._selected();
        });
 
        //TODO: MOVE TO CONTROLS
        if(keyDown(17) && mouseWentDown(LEFT) && !GameManager.gamePaused && mouseX < width && mouseY < height && mouseX > 0 && mouseX > 0){

            //TODO: Implement a "getSprite" or "getActor" or something, stop using onMousePressed for selection of players
            let tile = Map.getTileAtWorldPosition(mouseX, mouseY);
            //Toggle Tile on and off
            if(Map.activeTile == tile){
                Map.activeTile = null
            } else {
                Map.activeTile = tile;
            }
            tile.debugActive = true;

            console.log(Map.activeTile);
            if(GameManager.activePlayer){
                
                //let playerTile = Map.getTileAtWorldPosition(GameManager.activePlayer.sprite.x, GameManager.activePlayer.sprite.y);
                GameManager.activePlayer.path = GameManager.pathfinding.findPath(GameManager.activePlayer.sprite.position.x, GameManager.activePlayer.sprite.position.y, mouseX, mouseY);
                GameManager.activePlayer.pathIndex = 0;
                GameManager.activePlayer.walking = true;
                GameManager.activePlayer.nextPoint = GameManager.activePlayer.path[0];
                GameManager.activePlayer.sprite.position.x =  GameManager.activePlayer.nextPoint.x;
                GameManager.activePlayer.sprite.position.y =  GameManager.activePlayer.nextPoint.y;

                //GameManager.activePlayer.sprite.position.x = mouseX;
                //GameManager.activePlayer.sprite.position.y = mouseY;
                console.log("Active Player: ", GameManager.activePlayer.name);
            }
            //let fire = createSprite(mouseX, mouseY-25);
            //fire.addAnimation('fire', Images.Effects.Fire2);
            //fire.scale = 1;
        }

        if(GameManager.activePlayer){
            if(GameManager.activePlayer.walking){
                drawPath(GameManager.activePlayer.path);
                //GameManager.activePlayer.andyMovement()
            }

        }
        
        if(keyWentDown("esc")){
            if(GameManager.activePlayer){
                GameManager.activePlayer.isSelected = false;
                GameManager.activePlayer = null;
            } else {
                if(!GameManager.gamePaused){ 
                    LayerManager.Layers.PauseMenuGroup.removeSprites();
                    GameManager.gamePaused = true;
                    Menu.createPauseMenu();
                } else {
                    GameManager.gamePaused = false;
                    LayerManager.Layers.PauseMenuGroup.removeSprites();
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
    


