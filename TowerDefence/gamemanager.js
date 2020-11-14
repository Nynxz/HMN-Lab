class GameManager {

    //Array of all Players Active
    static allPlayers = [];
    static activePlayer = null;

    static allZombies = [];

    static gamePaused = false;
    
    //TODO MOVE?
    static debugHUD;   

    static pathfindingWorker;

    static resources = {Wood: 250, Rock: 0, Iron: 250}
    static score = 0;

    //We call this once to initalise the main game.
    static initGame(){

        

        //TODO: MOVE TO THREADMANAGER?
        GameManager.pathfindingWorkerPlayer = new Worker('pathfindingwebworker.js');
        GameManager.pathfindingWorkerPlayer.addEventListener('message', function(e) {
            switch(e.data.type){
                case 'find':
                    //console.log('eData:', e.data.path)
                    PathingActor.Actors[e.data.from].path = e.data.path;
                    //console.log('actor: ', PathingActor.Actors[e.data.from]);
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
			//console.log("VALUE: ", e.data);
        }, false);

        GameManager.pathfindingWorker = new Worker('pathfindingwebworker.js');
        GameManager.pathfindingWorker.addEventListener('message', function(e) {
            switch(e.data.type){
                case 'find':
                    //console.log('eData:', e.data.path)
                    PathingActor.Actors[e.data.from].path = e.data.path;
                    //console.log('actor: ', PathingActor.Actors[e.data.from]);
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
                case 'findHorde':
                    //console.log('eData:', e.data.path)
                    let horde = null;
                    Horde.allHordes.forEach(el => {
                        if(el.id == e.data.from){
                            horde = el
                        }
                    })
                    if(horde != null){
                        console.log("Got path: ", e.data.path);
                        console.log("SETTING HORDE PATH");
                        horde.hordePath = e.data.path;
                        horde.hordeMembers.forEach(zombie => {
                            zombie.Parent.path = e.data.path;
                            zombie.Parent.walking = true;
                            zombie.Parent.pathIndex = 0;
                            zombie.Parent.nextPoint = e.data.path[0];
                            zombie.position.x = e.data.path[0].x;
                            zombie.position.y = e.data.path[0].y;
                            zombie.Parent.findingPath = false;
                            zombie.velocity = {x: 0, y: 0}
                        });
                    }


                break;
            }
			//console.log("VALUE: ", e.data);
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

   
    
        Shop.initShop();

        DebugHelpers.loadMap('lv1');

        //We Create a pathfinding instance
        //GameManager.pathfinding = new Pathfinding();

        //We load the map we generated from Map.generateMap
        //GameManager.pathfinding.loadGrid(Map.floorTiles, 0, 0, false);
        LayerManager.Layers.FogOfWar.image(Images.Map.FogOfWar, 0, 0, width, height);
    }

    static refreshGame() {
        

        if(frameCount % 1 == 0 && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
            Shop.refreshShopSelection();
            let tile = Map.getTileAtWorldPosition(mouseX, mouseY);
            if(tile.parentNode || tile.node){
                LayerManager.Layers.HUDLayer.fill(255,255,255, 100);
                LayerManager.Layers.HUDLayer.rect(mouseX, mouseY-50, 200, 100);
                let typeStr = tile.node ? tile.node.type : tile.parentNode.node.type
                LayerManager.Layers.HUDLayer.fill(0,0,0, 255);
                LayerManager.Layers.HUDLayer.text("Type: " + typeStr, mouseX + 10, mouseY-35)
                switch(typeStr){
                    case 'spike':
                        LayerManager.Layers.HUDLayer.text("Info: Deals Damage to \n Players & Zombies", mouseX + 10, mouseY-15);
                    break;
                    case 'tree':
                        LayerManager.Layers.HUDLayer.text("Info: Generates Wood", mouseX + 10, mouseY-15);
                    break;
                    case 'furnace':
                        LayerManager.Layers.HUDLayer.text("Info: Turns 1 Wood & \n 1 Rock into 1 Iron", mouseX + 10, mouseY-15);
                    break;
                    case 'rock':
                        LayerManager.Layers.HUDLayer.text("Info: Generates Rock", mouseX + 10, mouseY-15);
                    break;
                }

            }
            //console.log(tile);
        }

        //If we have an Active Tile, mark it
        if(Map.activeTile.length > 0){
            Map.activeTile.forEach(element => {
                element.markActive();
            });
        }

        //For Each Player
        GameManager.allPlayers.forEach(player => {


            let tile = Map.getTileAtWorldPosition(player.sprite.position.x, player.sprite.position.y+Map.tileSize);
            if(tile.node)
            if(tile.node.type == 'spike'){
                console.log("Spike")
                let actor = player;
                eval(tile.node.info.effect)
            }
            //Draw their HP/Stamina Bar
            player.drawInfo();

            //We call movement, this will move them if they have a path loaded
            player.andyMovement()
            
            //If the player is selected, mark it
            if(player.isSelected)
                player._selected();
                if(keyIsDown(37)&& GameManager.activePlayer && frameCount % 12 == 0) {
                let projectile = createSprite(GameManager.activePlayer.sprite.position.x, GameManager.activePlayer.sprite.position.y, 50, 50);
                    projectile.addImage(Images.Weapons.Bullets.Basic);
                    projectile.rotateToDirection  = true;
                    //We need to draw to a layer
                    projectile.addToGroup(LayerManager.Layers.BulletsGroup);
                    projectile.attractionPoint(3, mouseX, mouseY)
                    projectile.setCollider("circle", 0,0, 16);
                    projectile.debug = true;
                }
            });

        GameManager.allZombies.forEach(zombie => {
            if(zombie.inHorde){
                if(zombie.horde.hordeMembers[0] === zombie.sprite){
                    zombie.horde.refreshHordeInformation();
                }
            }
            zombie.moveZombie();
            zombie.drawInfo();
        });


        LayerManager.Layers.ZombieGroup.overlap(LayerManager.Layers.BulletsGroup, (actor, bullet) => {
            if(actor.Parent instanceof Zombie){
                console.log("HITTING")
                actor.Parent.damage(15);
                bullet.remove();
            }
           
        });

        LayerManager.Layers.ZombieGroupLeaders.overlap(LayerManager.Layers.BulletsGroup, (actor, bullet) => {
            if(actor.Parent instanceof Zombie){
                console.log("HITTING")
                actor.Parent.damage(15);
                bullet.remove();
            }
           
        });

        LayerManager.Layers.BulletsGroup.forEach(bullet => {
            let tile = Map.getTileAtWorldPosition(bullet.position.x, bullet.position.y);
            if(tile.passable == false || bullet.position.x < 20 || bullet.position.y < 20 || bullet.position.x > width-20 || bullet.position.y > height-20){
                bullet.life = 1;
            }
        })

        //TODO: MOVE TO CONTROLS
        // if(keyDown(17) && mouseWentDown(LEFT) && !GameManager.gamePaused && mouseX < width && mouseY < height && mouseX > 0 && mouseX > 0){
        //TODO: Implement a "getSprite" or "getActor" or something, stop using onMousePressed for selection of players
        //     //console.log(Map.activeTile);
        //     if(GameManager.activePlayer){
        //         GameManager.activePlayer.WWfindPath(mouseX, mouseY);
        //     }
        // }

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

        if(Turret.allTurrets.length > 0){
            Turret.allTurrets.forEach(turret =>{
                turret.refreshTurret();
            })
        }
    }
    static refreshHUD() {   
    }
    //#endregion
}
    


