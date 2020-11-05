class GameManager {

    static Layers = {
        GroundFloor: 0, //Inactive - We use Images
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

        for(let i = 0; i < 3; i++ ){
            for(let y = 0; y < 3; y++){
                let player = new Player("Player", random(50,950), random(50,950))
                GameManager.allPlayers.push(player);
            }
        }

        let debugHUD = new HUD(0,0,300,height);
        // //Make an Instance of a Player - DEBUG 100 100
        // let debugPlayer1 = new Player("DEBUG1", 200, 400);

        // //Perfomance Test
        // for(let i = 0; i < 1000; i+=50 ){
        //     for(let y = 0; y < 1000; y+=50){
        //         let player = new Player("Player", i, y)
        //         GameManager.allPlayers.push(player);
        //     }
        // }
        
        //Make an Instance of a Player - DEBUG 100 100
        //let debugPlayer1 = new Player("DEBUG1", 200, 400);


        //let debugHealthBar = new HealthBar();

        //Push that Instance to allPlayers.
        //GameManager.allPlayers.push(debugPlayer1);


        Map.generateMap();

        DebugHelpers.toggleButtons();
        
    }

    static refresh() {

        if(Tile.activeTile){
            Tile.activeTile.markActive();
        }
        
        GameManager.allPlayers.forEach(player => {
            player.drawInfo()
            player.debugMovement();
            if(player.isSelected)
                player._selected();
        });

        if(keyDown(17) && mouseWentUp(LEFT) && !GameManager.gamePaused && mouseX < width && mouseY < height && mouseX > 0 && mouseX > 0){
            Map.getTileAtWorldPosition(mouseX, mouseY)
            console.log(Tile.activeTile)
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
            }else {
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
}
    


