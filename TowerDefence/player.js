class Actor{

    //We will use Actors as a "Sprite" wrapper
    //It will have movement/damage functions to be used by all things that move (Players, Enemies, Animals)
    constructor(_name, _initialHealth){
        this.name = _name;
        this.health = _initialHealth;
    }

    //#region MOVEMENT
    placeActorAtPosition(_x, _y){
        //Move to any x/y position
    }
    placeActorAtTileCenter(_tile){
        //Instant Move to a Tile
    }
    moveActorToTile(_tile){
        //Move using pathfinding
    }
    //#endregion

}

class Player extends Actor{
    constructor(_name, _x, _y) {
        super(_name, 100)
        
        //TODO
        this.stamina = 80;

        this.selected = false;

        this.sprite = this.debugCreatePlayer(_x, _y);

        this.healthBar = new HealthBar(200, 10, 0, -50, "red");
        this.staminaBar = new StaminaBar(200, 10, 0, -50, "blue");
    }

    debugCreatePlayer(x, y){

        
        let sprite = createSprite(x, y);
        sprite.addToGroup(GameManager.Layers.PlayerCharactersGroup)
        sprite.Parent = this;
        sprite.scale = 2;
        //#region  ANIMS
        sprite.addAnimation('walkup', Images.Player.SpriteSheets.Walking.Up);
        sprite.addAnimation('walkdown', Images.Player.SpriteSheets.Walking.Down);
        sprite.addAnimation('walkleft', Images.Player.SpriteSheets.Walking.Left);
        sprite.addAnimation('walkright', Images.Player.SpriteSheets.Walking.Right);
        sprite.addAnimation('stand', Images.Player.SpriteSheets.Stand);
        sprite.changeAnimation('stand');
        //#endregion



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
        let walkSpeed = .5;
        this.sprite.animation.frameDelay = 8;
        if(keyIsDown(16)){
            this.stamina = constrain(this.stamina - 1, 0, 100);
            this.sprite.animation.frameDelay = 4;
            walkSpeed = 6;
        } else if(this.stamina < 100) {
            this.stamina = constrain(this.stamina += 1, 0, 100)
        }

        

        if(keyIsDown(87)){
            this.sprite.position.y -= walkSpeed;
            this.sprite.changeAnimation('walkup');
        } else if (keyIsDown(83)){
            this.sprite.position.y += walkSpeed;
            this.sprite.changeAnimation('walkdown');
        } else if (keyIsDown(65)){
            this.sprite.position.x -= walkSpeed;
            this.sprite.changeAnimation('walkleft');
        } else if (keyIsDown(68)){
            this.sprite.position.x += walkSpeed;
            this.sprite.changeAnimation('walkright');
        } else {
            this.sprite.changeAnimation('stand');
        }

        //console.log("Moving player to X ", xpos, "   Y ", ypos);
    }

    drawInfo(){

        GameManager.Layers.Effects.noStroke();

        this.healthBar.refreshHealthBar(this.sprite.position.x, this.sprite.position.y + 20, this.health);
        this.staminaBar.refreshStaminaBar(this.sprite.position.x,this.sprite.position.y,this.stamina);
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
            
        }

        GameManager.allPlayers.forEach((player, i) =>{
            if(player === this){
                GameManager.allPlayers.splice(i, 1);
            }   
        })

        this.sprite.remove();
    }

    _selected(){
        if(this.health > 0){
            //TODO: MAKE THIS A SPRITE ON EFFECT LAYER
            GameManager.Layers.Effects.noFill();
            GameManager.Layers.Effects.stroke(0, 255, 0);
            GameManager.Layers.Effects.strokeWeight(6);
            GameManager.Layers.Effects.ellipse(this.sprite.position.x + 2, this.sprite.position.y, 72);
        }
    }
}
