//X Create 1 Player
//X Put Player on Screen
// ~ Click Player - Make Active Player 
//If Active Player - Click Ground - Move POG



//If clicked do something (bind onMousePressed)
class Player {

    constructor(_name, x, y) {

        this.name=_name;
        this.selected = false;
        this.sprite = this.debugCreatePlayer(x, y);
        
    }

    debugCreatePlayer(x, y){

        let sprite = createSprite(x, y, 64, 64);

        sprite.addAnimation('walkup', Images.Player.SpriteSheets.Walking.Up);
        sprite.addAnimation('walkdown', Images.Player.SpriteSheets.Walking.Down);
        sprite.addAnimation('walkleft', Images.Player.SpriteSheets.Walking.Left);
        sprite.addAnimation('walkright', Images.Player.SpriteSheets.Walking.Right);
        sprite.addAnimation('stand', Images.Player.SpriteSheets.Stand);
        sprite.changeAnimation('stand');

        sprite.Parent = this;
        sprite.scale = 2;

        //TODO : This is coupled way too tightly with GameManger, try to decouple
        sprite.onMousePressed = () => {
            if(!this.isSelected){
                console.log("Clicked on :", this.name);
                GameManager.allPlayers.forEach(player => player.isSelected = false)
                GameManager.activePlayer = this;
                this.isSelected = true;

            } else {
                GameManager.activePlayer = null;
                this.isSelected = false;
            }
        }
        return sprite;
    }

    debugMovement(xpos, ypos){
        console.log("Moving player to X ", xpos, "   Y ", ypos);
    }


    _selected(){
        noFill();
        stroke(0, 255, 0);
        strokeWeight(6);
        ellipse(this.sprite.position.x + 2, this.sprite.position.y, 72);
    }
    
}


