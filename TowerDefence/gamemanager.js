class GameManager {

    //Array of all Players Active
    static allPlayers = [];
    static activePlayer = null;

    static allZombies = [];

    static gamePaused = false;
    
    //TODO MOVE?
    static debugHUD;   

    static pathfindingWorker;

    static resources = {Wood: 0}

    //We call this once to initalise the main game.
    static initGame(){

        //TODO: MOVE TO THREADMANAGER?
        GameManager.pathfindingWorkerPlayer = new Worker('pathfindingwebworker.js');
        GameManager.pathfindingWorkerPlayer.addEventListener('message', function(e) {
            switch(e.data.type){
                case 'find':
                    console.log('eData:', e.data.path)
                    PathingActor.Actors[e.data.from].path = e.data.path;
                    console.log('actor: ', PathingActor.Actors[e.data.from]);
                    if(PathingActor.Actors[e.data.from].path.length > 0){
                        PathingActor.Actors[e.data.from].pathIndex = 0;
                        PathingActor.Actors[e.data.from].walking = true;
                        PathingActor.Actors[e.data.from].sprite.velocity.x = 0;
                        PathingActor.Actors[e.data.from].sprite.velocity.y = 0;
                        PathingActor.Actors[e.data.from].nextPoint = PathingActor.Actors[e.data.from].path[0];
                        PathingActor.Actors[e.data.from].sprite.position.x =  PathingActor.Actors[e.data.from].nextPoint.x;
                        PathingActor.Actors[e.data.from].sprite.position.y =  PathingActor.Actors[e.data.from].nextPoint.y;
                        PathingActor.Actors[e.data.from].findingPath = false;
                    }
                break;
            }
			console.log("VALUE: ", e.data);
        }, false);

        GameManager.pathfindingWorker = new Worker('pathfindingwebworker.js');
        GameManager.pathfindingWorker.addEventListener('message', function(e) {
            switch(e.data.type){
                case 'find':
                    console.log('eData:', e.data.path)
                    PathingActor.Actors[e.data.from].path = e.data.path;
                    console.log('actor: ', PathingActor.Actors[e.data.from]);
                    if(PathingActor.Actors[e.data.from].path.length > 0){
                        PathingActor.Actors[e.data.from].pathIndex = 0;
                        PathingActor.Actors[e.data.from].walking = true;
                        PathingActor.Actors[e.data.from].sprite.velocity.x = 0;
                        PathingActor.Actors[e.data.from].sprite.velocity.y = 0;
                        PathingActor.Actors[e.data.from].nextPoint = PathingActor.Actors[e.data.from].path[0];
                        PathingActor.Actors[e.data.from].sprite.position.x =  PathingActor.Actors[e.data.from].nextPoint.x;
                        PathingActor.Actors[e.data.from].sprite.position.y =  PathingActor.Actors[e.data.from].nextPoint.y;
                    }
                break;
            }
			console.log("VALUE: ", e.data);
        }, false);
        

        //Reset Pause to False
        GameManager.gamePaused = false;

        //Init the Layers
        LayerManager.initLayers()

        //Create a HUD
        GameManager.debugHUD = new HUD(300,height);

        //Generate a Map
        //16, 24, 48 
        Map.generateMap(24, width, height);

        //Toggle Debug Buttons
        DebugHelpers.toggleButtons();
    
        //We Create a pathfinding instance
        //GameManager.pathfinding = new Pathfinding();

        //We load the map we generated from Map.generateMap
        //GameManager.pathfinding.loadGrid(Map.floorTiles, 0, 0, false);
    }

    static refreshGame() {

        //If we have an Active Tile, mark it
        if(Map.activeTile.length > 0){
            Map.activeTile.forEach(element => {
                element.markActive();
            });
        }

        //For Each Player
        GameManager.allPlayers.forEach(player => {
            
            //Draw their HP/Stamina Bar
            player.drawInfo();

            //We call movement, this will move them if they have a path loaded
            player.andyMovement()
            
            //If the player is selected, mark it
            if(player.isSelected)
                player._selected();
                if(keyIsDown(37)&& GameManager.activePlayer) {
                let projectile = createSprite(GameManager.activePlayer.sprite.position.x, GameManager.activePlayer.sprite.position.y, 50, 50);
                    //We need to draw to a layer
                    projectile.addToGroup(LayerManager.Layers.PlayerCharactersGroup);
                }
            });

        GameManager.allZombies.forEach(zombie => {
            zombie.moveZombie();
        })

        //TODO: MOVE TO CONTROLS
        if(keyDown(17) && mouseWentDown(LEFT) && !GameManager.gamePaused && mouseX < width && mouseY < height && mouseX > 0 && mouseX > 0){
            //TODO: Implement a "getSprite" or "getActor" or something, stop using onMousePressed for selection of players
            //console.log(Map.activeTile);
            if(GameManager.activePlayer){
                GameManager.activePlayer.WWfindPath(mouseX, mouseY);
            }
        }

        if(GameManager.activePlayer){
            if(GameManager.activePlayer.walking){
                drawPath(GameManager.activePlayer.path);
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
    


