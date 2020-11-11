class Zombie extends PathingActor{
    static allZombies = [];
    constructor(_name, _health, _x, _y) {
        let tile = Map.getTileAtWorldPosition( _x, _y);
        if(tile){
            super(Map.floorTiles, _name, 100, {x: tile.pos.x, y: tile.pos.y});
        } else {
            super(Map.floorTiles, _name, 100, {x: _x, y: _y});
        }
        
        this.id = PathingActor.idCount;
        PathingActor.idCount++;
        PathingActor.Actors.push(this);

        this.sprite = this.createZombie(_x, _y);
        this.healthBar = new StatsBar(this.health, 50, 10, 0, -50, "red");
        
        this.currentTarget = 0;
        this.path = [];
        this.nextPoint = {x: _x, y: _y};
        this.pathIndex = 0;
        GameManager.allZombies.push(this);
        this.findingPath = true;

        this.WWfindPlayer();
    }

    damage(amount){
        this.health = constrain(this.health - amount, 0, this.health);
        if (this.health == 0) {
          this.die();
        }
    }

    die() {    
        Zombie.allZombies.forEach((zombie, i) => {
          if (zombie === this) {
            Zombie.allZombies.splice(i, 1);
          }
        });
        this.sprite.remove();
      }

    WWfindPlayer(){
        let obj = {
            type: 'find',
            from: this.id,
            payload: {x1: this.sprite.position.x, y1: this.sprite.position.y, x2: GameManager.allPlayers[0].sprite.position.x, y2: GameManager.allPlayers[0].sprite.position.y}
        }
        GameManager.pathfindingWorker.postMessage(obj);
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

    moveZombie(){
        let tile = Map.getTileAtWorldPosition(this.sprite.position.x, this.sprite.position.y+Map.tileSize);
        if(tile.node)
        if(tile.node.type == 'spike'){
            console.log("Spike")
            let actor = this;
            eval(tile.node.info.effect)
        }
        //TODO: MOVE THIS
        if(GameManager.allPlayers.length > 0)
        if(dist(this.sprite.position.x, this.sprite.position.y, GameManager.allPlayers[0].sprite.position.x, GameManager.allPlayers[0].sprite.position.y) < 25){
            GameManager.allPlayers[0].damage(0.001);
        }    
        
        if(!GameManager.gamePaused && this.path)
        if (Math.abs(this.sprite.position.x - this.nextPoint.x) + Math.abs(this.sprite.position.y - this.nextPoint.y) < 1 && this.path.length > 1) {

            this.pathIndex += 1;
            if (this.pathIndex == this.path.length) { 
                
                this.pathIndex = 0;
                this.path = []
                
                this.nextPoint = {x: this.sprite.position.x, y: this.sprite.position.y};
                this.sprite.velocity ={x: 0, y: 0};

                this.walking = false;
                this.WWfindPlayer();
                this.findingPath = false;
            } else if(this.walking){
                
                //next point is first index of array
                this.nextPoint = this.path[this.pathIndex];
                this.sprite.velocity = {
                    x: (this.nextPoint.x - this.sprite.position.x)/15,
                    y: (this.nextPoint.y - this.sprite.position.y)/15
                }
                
            }
        } else if(this.pathIndex == 0 && this.path.length > 0 && this.findingPath == false){
            if(dist(this.sprite.position.x, this.sprite.position.y, GameManager.allPlayers[0].sprite.position.x, GameManager.allPlayers[0].sprite.position.y) > 25){
                this.WWfindPlayer();
                this.findingPath = true;
            }
            this.pathIndex = 0;
            this.nextPoint = this.path[0];
            this.sprite.velocity = {
                x: (this.nextPoint.x - this.sprite.position.x)/15,
                y: (this.nextPoint.y - this.sprite.position.y)/15
            }
        }
        
        this._playAnimations();
    }

    _playAnimations(){
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