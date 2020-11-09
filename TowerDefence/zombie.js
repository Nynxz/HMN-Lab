class Zombie extends PathingActor{
    constructor(_name, _health, _x, _y) {
        let tile = Map.getTileAtWorldPosition( _x, _y);
        super(Map.floorTiles, _name, 100, {x: tile.pos.x, y: tile.pos.y});

        this.sprite = this.createZombie(_x, _y);
        
        
        this.currentTarget = 0;

        this.nextPoint = {x: _x, y: _y};
        this.pathIndex = 0;
        GameManager.allZombies.push(this);
        this.findPlayer();
    }


    createZombie(x, y){
        console.log("Creating Zombie");
        let sprite = createSprite(x, y);
        //TODO: Move to new Layer
        sprite.addToGroup(LayerManager.Layers.PlayerCharactersGroup) 
        sprite.Parent = this;
        sprite.scale = 1;

        sprite.addAnimation('walkup', Images.Zombies.Regular.Up);
        sprite.addAnimation('walkdown', Images.Zombies.Regular.Down);
        sprite.addAnimation('walkleft', Images.Zombies.Regular.Left);
        sprite.addAnimation('walkright', Images.Zombies.Regular.Right);
        sprite.addAnimation('stand', Images.Zombies.Regular.Stand);
        sprite.changeAnimation('stand');

        return sprite;
    }

    findPlayer(){
        if(GameManager.allPlayers){
            console.log("FINDING PATH")
            let path = GameManager.pathfinding.findPath(this.sprite.position.x, this.sprite.position.y, GameManager.allPlayers[0].sprite.position.x, GameManager.allPlayers[0].sprite.position.y);
            this.path = path;
            if(this.path.length > 0){
                console.log("FOUND PATH");
                this.walking = true;
                this.nextPoint = this.path[0];
                this.sprite.position.x =  this.nextPoint.x;
                this.sprite.position.y =  this.nextPoint.y;
            }
        }
    }

    moveZombie(){
        if(!GameManager.gamePaused)
        if (Math.abs(this.sprite.position.x - this.nextPoint.x) + Math.abs(this.sprite.position.y - this.nextPoint.y) < 1 && this.path.length > 1) {
            
            this.pathIndex += 1;
            if (this.pathIndex == this.path.length) { 
                this.pathIndex = 0;
                this.path = []
                
                this.nextPoint.x = this.sprite.position.x;
                this.nextPoint.y = this.sprite.position.y;
                this.sprite.velocity.x = 0;
                this.sprite.velocity.y = 0;
                this.walking = false;
                
            } else if(this.walking){

                //next point is first index of array
                this.nextPoint = this.path[this.pathIndex];

                this.sprite.velocity.x = (this.nextPoint.x - this.sprite.position.x)/15;
                this.sprite.velocity.y = (this.nextPoint.y - this.sprite.position.y)/15;
                
            } 
        } else if(this.pathIndex == 0 && this.path.length > 0){
            this.nextPoint = this.path[0];
            this.sprite.velocity.x = (this.nextPoint.x - this.sprite.position.x)/15;
            this.sprite.velocity.y = (this.nextPoint.y - this.sprite.position.y)/15;
        }
        

        this.sprite.animation.frameDelay = 8;

        if (this.sprite.velocity.x > 0.2){
            //this.sprite.position.x += walkSpeed;
            this.sprite.changeAnimation('walkright');
        }else if (this.sprite.velocity.x < -0.1){
            //this.sprite.position.x -= walkSpeed;
            this.sprite.changeAnimation('walkleft');
        } else {
            this.sprite.changeAnimation('stand');
        }
        
        if(this.sprite.velocity.y < -0.1){
            //this.sprite.position.y -= walkSpeed;
            this.sprite.changeAnimation('walkup');
        } else if (this.sprite.velocity.y > 0.1){
            //this.sprite.position.y += walkSpeed;
            this.sprite.changeAnimation('walkdown');
        }
    }
}