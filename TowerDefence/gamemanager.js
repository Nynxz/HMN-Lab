class GameManager {
    
    //Array of all Players Active
    static allPlayers = [];

    static activePlayer = null;

    static initGame(){

        //Make an Instance of a Player - DEBUG 100 100
        let debugPlayer1 = new Player("DEBUG1", 200, 400);
        let debugPlayer2 = new Player("DEBUG2", 400, 400);
        let debugPlayer3 = new Player("DEBUG3", 600, 400);

        //Push that Instance to allPlayers.
        GameManager.allPlayers.push(debugPlayer1);
        GameManager.allPlayers.push(debugPlayer2);
        GameManager.allPlayers.push(debugPlayer3);

    }

    static refresh(){
        GameManager.allPlayers.forEach(player => {
            if(player.isSelected)
                player._selected()
        });

        if(mouseWentUp(LEFT)){
            if(GameManager.activePlayer){
                GameManager.activePlayer.sprite.position.x = mouseX;
                GameManager.activePlayer.sprite.position.y = mouseY;
                console.log("Active Player: ", GameManager.activePlayer.name);
            }
            rectMode(CENTER);
            let fire = createSprite(mouseX-25, mouseY-25);
            fire.addAnimation('fire', Images.Effects.Fire1);
            fire.scale = 3;
            
        }
    }
}


/*
        if(mouseWentDown(LEFT)){

            if(GameManager.activePlayer){
                console.log("Current Active: ", GameManager.activePlayer.name);
            }
            console.log("Current Sprites: ", allSprites.length);
            console.log("Current Players: ", GameManager.allPlayers.length);
            console.log("DETECTING CLICK at (x: ", mouseX, "| y: ", mouseY, ")");


            GameManager.allPlayers.forEach((player, i) => {
                if(player.sprite.life <= 0){
                    GameManager.allPlayers = GameManager.allPlayers.splice(i, 1);
                } else {
                    if(player.sprite.overlapPoint(mouseX, mouseY)){
                        player.sprite.shapeColor = 'grey';
                        GameManager.activePlayer = player;
                        console.log("ON PLAYER");
                    } else {
                        if(player !== GameManager.activePlayer){
                            player.sprite.shapeColor = 'purple';
                        }
                    }
                }
            });
            
        }

*/
    


