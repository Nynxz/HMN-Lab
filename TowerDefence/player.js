//X Create 1 Player
//X Put Player on Screen
// ~ Click Player - Make Active Player 
//If Active Player - Click Ground - Move POG


class GameManager {
    
    //Array of all Players Active
    static allPlayers = [];

    static activePlayer = null;


    static clickCoolDown = 1;
    static clickCurrentCoolDown = 0;

    static initGame(){
        //Make an Instance of a Player - DEBUG 100 100
        let debugPlayer = new Player("DEBUG", 100, 100, 400, 400);

        //Push that Instance to allPlayers.
        GameManager.allPlayers.push(debugPlayer);

        //Make an Instance of a Player - DEBUG 100 100
        let debugPlayer1 = new Player("DEBUGDDDDD", 100, 100, 200, 400);

        //Push that Instance to allPlayers.
        GameManager.allPlayers.push(debugPlayer1);

        //Make an Instance of a Player - DEBUG 100 100
        let debugPlayer2 = new Player("DEBUGBBBBBBBB", 100, 100, 600, 400);

        //Push that Instance to allPlayers.
        GameManager.allPlayers.push(debugPlayer2);
    }

    static refresh(){
        if(GameManager.activePlayer instanceof Player){
            GameManager.activePlayer.sprite.shapeColor = 'blue';
        }
        if(mouseIsPressed){
            if(GameManager.clickCurrentCoolDown > 0){
                GameManager.mouseClicked();
                GameManager.clickCurrentCoolDown = 1;
            }
        } else {
            GameManager.clickCurrentCoolDown = cons
        }
    }


    static mouseClicked(){
        if(GameManager.activePlayer){
            GameManager.activePlayer.debugMovement(mouseX, mouseY);
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

        this.isActive = false;
    }

    debugCreatePlayer(x, y){
        let sprite = createSprite(x, y, 64, 64);
        sprite.shapeColor = 'purple';
        sprite.onMousePressed = this.debugSayName;
        sprite.Parent = this;
        return sprite;
    }

    debugSayName(){

        //"Unactivate" all Players
        GameManager.allPlayers.forEach(e => {
            e.sprite.shapeColor = 'purple';
            e.isActive = false;
        });

        this.Parent.isActive = true;
        this.Parent.sprite.shapeColor = 'blue';

        GameManager.activePlayer = this.Parent;
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


