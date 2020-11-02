//X Create 1 Player
//X Put Player on Screen
// ~ Click Player - Make Active Player 
//If Active Player - Click Ground - Move POG


class GameManager {
    
    //Array of all Players Active
    static allPlayers = [];

    static activePlayer = null;

    static initGame(){

        //Make an Instance of a Player - DEBUG 100 100
        let debugPlayer1 = new Player("DEBUG1", 100, 100, 400, 400);
        let debugPlayer2 = new Player("DEBUG2", 100, 100, 200, 400);
        let debugPlayer3 = new Player("DEBUG3", 100, 100, 600, 400);

        //Push that Instance to allPlayers.
        GameManager.allPlayers.push(debugPlayer1);
        GameManager.allPlayers.push(debugPlayer2);
        GameManager.allPlayers.push(debugPlayer3);

    }

    static refresh(){
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
    }


}

//If clicked do something (bind onMousePressed)
class Player {

    constructor(_name,_health,_stamina, x, y) {

        this.name=_name;
        this.health=_health;
        this.stamina=_stamina;

        this.sprite = this.debugCreatePlayer(x, y);

    }

    debugCreatePlayer(x, y){
        let sprite = createSprite(x, y, 64, 64);
        sprite.shapeColor = 'purple';
        sprite.Parent = this;
        // sprite.onMousePressed = () => {

        //     //"Unactivate" all Players visually
        //     GameManager.allPlayers.forEach(player => player.sprite.shapeColor = 'purple');
            
        //     //Set active player to this player
        //     GameManager.activePlayer = this;
            
        //     //Visual to show active
        //     sprite.shapeColor = 'blue'
        // }
        sprite.life = 100;
        return sprite;

    }

    debugMovement(xpos, ypos){
        console.log("Moving player to X ", xpos, "   Y ", ypos);

        //Get Target Position - Mouse Pos Click
        //Turn into vector from player, normal. mag 1
        //Face that way
        //Move in that Direction * Speed every frame (or deltaTime)
        //If there stahp

    }
    
}


