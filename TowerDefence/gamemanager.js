class GameManager {

    //Array of all Players Active
    static allPlayers = [];
    static activePlayer = null;


    static gamePaused = false;
    
    //TODO MOVE?
    static debugHUD;   

    //We call this once to initalise the main game.
    static initGame(){
        //Reset Pause to False
        GameManager.gamePaused = false;

        //Init the Layers
        LayerManager.initLayers()

        //Create a HUD
        GameManager.debugHUD = new HUD(0,0,300,height);

        //Generate a Map
        //16, 24, 48 
        Map.generateMap(24, width, height);

        //Toggle Debug Buttons
        DebugHelpers.toggleButtons();
    
        //We Create a pathfinding instance
        GameManager.pathfinding = new Pathfinding();

        //We load the map we generated from Map.generateMap
        GameManager.pathfinding.loadGrid(Map.floorTiles, 0, 0, false);

    }

    static refreshGame() {

        //If we have an Active Tile, mark it
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
        
        //For Each Player
        GameManager.allPlayers.forEach(player => {
            
            //Draw their HP/Stamina Bar
            player.drawInfo();
            
            player.debugMovement(); //UNUSED MOVE ANIMS

            //We call movement, this will move them if they have a path loaded
            player.andyMovement()
            
            //player.debugRefresh();
            //player.pathingMovement(1);

            //If the player is selected, mark it
            if(player.isSelected)
                player._selected();
                if (keyIsDown(37)) {
                    let projectile = createSprite(activePlayer.sprite.x, activePlayer.sprite.y, 50, 50);
                    projectile.setSpeed(5,5);
                    this.ammo--;
                  }
                  if ((this.ammo = 0)) {
                    console.log("no ammo!");
                  }
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
    static refreshHUD() {
        
    }
    //#endregion
}
    


