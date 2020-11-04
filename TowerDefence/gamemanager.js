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

        for(let i = 0; i < 1000; i+=50 ){
            for(let y = 0; y < 1000; y+=50){
                let player = new Player("Player", i, y)
                GameManager.allPlayers.push(player);
            }
        }
        // //Make an Instance of a Player - DEBUG 100 100
        // let debugPlayer1 = new Player("DEBUG1", 200, 400);
        // let debugPlayer2 = new Player("DEBUG2", 400, 400);
        // let debugPlayer3 = new Player("DEBUG3", 600, 400);

        // let debugPlayer4 = new Player("DEBUG1", 200, 600);
        // let debugPlayer5 = new Player("DEBUG2", 400, 600);
        // let debugPlayer6 = new Player("DEBUG3", 600, 600);

        // let debugPlayer7 = new Player("DEBUG1", 200, 200);
        // let debugPlayer8 = new Player("DEBUG2", 400, 200);
        // let debugPlayer9 = new Player("DEBUG3", 600, 200);
        // //let debugHealthBar = new HealthBar();

        // //Push that Instance to allPlayers.
        // GameManager.allPlayers.push(debugPlayer1);
        // GameManager.allPlayers.push(debugPlayer2);
        // GameManager.allPlayers.push(debugPlayer3);

        // GameManager.allPlayers.push(debugPlayer4);
        // GameManager.allPlayers.push(debugPlayer5);
        // GameManager.allPlayers.push(debugPlayer6);

        // GameManager.allPlayers.push(debugPlayer7);
        // GameManager.allPlayers.push(debugPlayer8);
        // GameManager.allPlayers.push(debugPlayer9);

        Map.generateMap();

        DebugHelpers.toggleButtons();
        
    }

    static refresh() {
        

        GameManager.allPlayers.forEach(player => {
            player.drawInfo()
            player.debugMovement();
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
           // let spend = new Interactable(Images.Interactables.Debug.SpendTouching, mouseX, mouseY, Interactable.Type.Spend, Interactable.Range.Touching);
        }
    }
}
    


