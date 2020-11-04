//If clicked do something (bind onMousePressed)
class Player {

    constructor(_name, _x, _y) {

        this.name= _name;
        
        //TODO
        this.health = 100;

        this.currentTask = null;
        this.selected = false;

        this.sprite = this.debugCreatePlayer(_x, _y);

        this.healthBar = new HealthBar(200, 20, 0, -50, "red");
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
        sprite.depth = GameManager.Layers.PlayerCharacters;

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

    drawInfo(){
        this.healthBar.refreshHealthBar(this.sprite.position.x, this.sprite.position.y, this.health);
    }

    damage(amount){
        this.health = constrain(this.health - amount, 0, this.health);
        if(this.health == 0){
            this.die();
        }
    }

    die(){
        if(GameManager.activePlayer === this){
            console.log("Killing Active Player");
            this.selected = false;
            GameManager.activePlayer = null;
            delete this;
        }
        this.sprite.remove();
    }

    _selected(){
        if(this.health > 0){
            //TODO: MAKE THIS A SPRITE ON EFFECT LAYER
            noFill();
            stroke(0, 255, 0);
            strokeWeight(6);
            ellipse(this.sprite.position.x + 2, this.sprite.position.y, 72);
        }
    }
}
