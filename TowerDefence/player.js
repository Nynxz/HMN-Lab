//If clicked do something (bind onMousePressed)
class Player {

    constructor(_name, _x, _y) {

        this.name= _name;
        this.currentTask = null;
        this.selected = false;

        this.sprite = this.debugCreatePlayer(_x, _y);
        
    }

    debugCreatePlayer(x, y){

        //#region  ANIMS
        let sprite = createSprite(x, y);

        sprite.addAnimation('walkup', Images.Player.SpriteSheets.Walking.Up);
        sprite.addAnimation('walkdown', Images.Player.SpriteSheets.Walking.Down);
        sprite.addAnimation('walkleft', Images.Player.SpriteSheets.Walking.Left);
        sprite.addAnimation('walkright', Images.Player.SpriteSheets.Walking.Right);
        sprite.addAnimation('stand', Images.Player.SpriteSheets.Stand);
        
        sprite.changeAnimation('stand');

        //#endregion
        sprite.Parent = this;
        sprite.scale = 2;

        //TODO : This is coupled way too tightly with GameManger, try to decouple

        sprite.onMousePressed = function() {

            if(!this.Parent.isSelected) {

                console.log("Clicked on :", this.Parent.name);
                
                GameManager.allPlayers.forEach(player => player.isSelected = false)
                
                GameManager.activePlayer = this.Parent;
                this.Parent.isSelected = true;

            } else {

                GameManager.activePlayer = null;
                this.Parent.isSelected = false;

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


