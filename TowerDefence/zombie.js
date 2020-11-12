class ZombieSpawner{

    static difficultyModifier = 1;
    static startingAmount = 2;
    static offsetMin = 50;
    static offsetMax = 200;
    static spawnWave(){
        let amount = floor(ZombieSpawner.startingAmount * ZombieSpawner.difficultyModifier);
        
        for(let i = 0; i < amount; i++){
            let randomSide = random(['N','S','E','W']);
            switch(randomSide){
                case 'N':
                    new Zombie('Rando Zombie Boi', 100, random(0 + ZombieSpawner.offsetMax / ZombieSpawner.difficultyModifier, width - ZombieSpawner.offsetMax / ZombieSpawner.difficultyModifier), random(0 - ZombieSpawner.offsetMin, 0 - ZombieSpawner.offsetMax / ZombieSpawner.difficultyModifier))
                break;
                case 'E':
                    new Zombie('Rando Zombie Boi', 100, random(width + ZombieSpawner.offsetMin, width + ZombieSpawner.offsetMax), random(0 + ZombieSpawner.offsetMax / ZombieSpawner.difficultyModifier, height - ZombieSpawner.offsetMax))
                break;
                case 'S':
                    new Zombie('Rando Zombie Boi', 100, random(0 + ZombieSpawner.offsetMax / ZombieSpawner.difficultyModifier, width - ZombieSpawner.offsetMax / ZombieSpawner.difficultyModifier), random(height + ZombieSpawner.offsetMin, height + ZombieSpawner.offsetMax / ZombieSpawner.difficultyModifier))
                break;
                case 'W':
                    new Zombie('Rando Zombie Boi', 100, random(0 - ZombieSpawner.offsetMin, 0 - ZombieSpawner.offsetMax / ZombieSpawner.difficultyModifier), random(0 - ZombieSpawner.offsetMin, height - ZombieSpawner.offsetMax / ZombieSpawner.difficultyModifier))
                break;
            }
        }
        
    }
}

class Horde {
    static id = 0
    static allHordes = [];

    constructor(_firstZombie, _secondZombie){
        this.id = Horde.id;
        Horde.id++;
        
        this.hordePath = [];
        this.hordeMembers = [];

        this.addZombie(_firstZombie);
        this.addZombie(_secondZombie);

        Horde.allHordes.push(this);
    }

    addZombie(_zombie){
        if(this.hordeMembers.length>0){
            LayerManager.Layers.ZombieGroupLeaders.remove(_zombie);
            _zombie.addToGroup(LayerManager.Layers.ZombieGroup)
        }
        _zombie.Parent.inHorde = true;
        _zombie.Parent.horde = this;
        this.hordeMembers.push(_zombie);
        if(this.hordePath.length > 0){
            _zombie.Parent.path = this.hordePath;
        }
        //this.findHordePath();
    }

    findHordePath(){
       this.hordeMembers.forEach(zombie => {
            zombie.Parent.path = [];
            zombie.Parent.walking = false;
            zombie.velocity = {x: 0, y: 0};
            zombie.Parent.pathIndex = 0;
            zombie.Parent.nextPoint = 0;
       });
        let obj = {
            type: 'findHorde',
            from: this.id,
            payload: {x1: this.hordeMembers[0].position.x, y1: this.hordeMembers[0].position.y, x2: GameManager.allPlayers[0].sprite.position.x, y2: GameManager.allPlayers[0].sprite.position.y}
        }
        GameManager.pathfindingWorker.postMessage(obj);
    }

    hordeMovement(){
        this.hordeMembers.forEach(zombie => {
            
        })
    }

    
}

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
        this.healthBar = new StatsBar(200, 10, 0, -50, "grey");
        this.health = 50;
        this.currentTarget = 0;
        this.path = [];
        this.nextPoint = {x: _x, y: _y};
        this.pathIndex = 0;
        GameManager.allZombies.push(this);
        this.findingPath = true;
        this.inHorde = false;
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
        GameManager.allZombies.forEach((zombie, i) => {
            if (zombie === this) {
                GameManager.allZombies.splice(i, 1);
            }
          });
        this.sprite.remove();
      }

    WWfindPlayer(){
        let madeHorde = false;
        //Hording Code - JANK AF - Just make more webworkers
        if(true)
        LayerManager.Layers.ZombieGroupLeaders.overlap(LayerManager.Layers.ZombieGroupLeaders, (actor1, actor2) => {
            console.log("LOOP");
            if(!actor1.Parent.inHorde && !actor2.Parent.inHorde && !madeHorde){
                console.log("MAKE HORDE")
                new Horde(actor1, actor2);
                //madeHorde = true;
            } else if(!actor1.Parent.inHorde){
                actor2.Parent.horde.addZombie(actor1);
            } else if(!actor2.Parent.inHorde){
                actor1.Parent.horde.addZombie(actor2);
            } else if (actor1.Parent.horde !== actor2.Parent.horde && actor1.Parent.inHorde && actor2.Parent.inHorde && actor1.Parent.horde.hordeMembers[0] == actor1){
                console.log("HAP")
                let oldID = actor2.Parent.horde.id;
                actor2.Parent.horde.hordeMembers.forEach(zombie => {
                    actor1.Parent.horde.addZombie(zombie);
                });
                Horde.allHordes.splice(oldID, 1);

                // Horde.id--;
                // //Horde.allHordes.splice(oldID, 1);
                // /Horde.allHordes.forEach((el, idx) => {
                //     if(idx >= oldID){
                //         el.id--;
                //     }
                // })
            }
        })
        
        let obj;
        if(!this.inHorde){
            console.log("FINDING ZOMBIE PATH");
            obj  = {
                type: 'find',
                from: this.id,
                payload: {x1: this.sprite.position.x, y1: this.sprite.position.y, x2: GameManager.allPlayers[0].sprite.position.x, y2: GameManager.allPlayers[0].sprite.position.y}
            }
            GameManager.pathfindingWorker.postMessage(obj);
        }
        else if (this.sprite.Parent.horde.hordeMembers[0] == this.sprite) {
            console.log("FINDING HORDE LEADER PATH")
            obj = {
                type: 'findHorde',
                from: this.horde.id,
                payload: {x1: this.sprite.position.x, y1: this.sprite.position.y, x2: GameManager.allPlayers[0].sprite.position.x, y2: GameManager.allPlayers[0].sprite.position.y}
            }
            GameManager.pathfindingWorker.postMessage(obj);
        }

        this.sprite.velocity = {x: 0, y: 0};
    }

    createZombie(x, y){
        console.log("Creating Zombie");
        let sprite = createSprite(x, y);
        //TODO: Move to new Layer
        sprite.addToGroup(LayerManager.Layers.ZombieGroupLeaders) 
        sprite.Parent = this;
        sprite.scale = 1;
        //sprite.debug = true;
        sprite.addAnimation('walkup', Images.Zombies.Regular.Up);
        sprite.addAnimation('walkdown', Images.Zombies.Regular.Down);
        sprite.addAnimation('walkleft', Images.Zombies.Regular.Left);
        sprite.addAnimation('walkright', Images.Zombies.Regular.Right);
        sprite.addAnimation('stand', Images.Zombies.Regular.Stand);
        sprite.changeAnimation('stand');

        return sprite;
    }

    moveZombie(){
        //Add to Horde

        let tile = Map.getTileAtWorldPosition(this.sprite.position.x, this.sprite.position.y+Map.tileSize);
        if(tile)
        if(tile.node)
        if(tile.node.type == 'spike'){
            console.log("SPIKE")
            let actor = this;
            eval(tile.node.info.effect)
        }
        //TODO: MOVE THIS
        if(GameManager.allPlayers.length > 0)
        if(dist(this.sprite.position.x, this.sprite.position.y, GameManager.allPlayers[0].sprite.position.x, GameManager.allPlayers[0].sprite.position.y) < 25){
            GameManager.allPlayers[0].damage(0.001);
        }    
        
        if(!GameManager.gamePaused && this.path.length > 0)
        if (Math.abs(this.sprite.position.x - this.nextPoint.x) + Math.abs(this.sprite.position.y - this.nextPoint.y) < 5 && this.path.length > 1) {

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
                    x: (this.nextPoint.x - this.sprite.position.x)/20,
                    y: (this.nextPoint.y - this.sprite.position.y)/20
                }
                
            }
        } else if(this.pathIndex == 0 && this.path.length > 0 && this.findingPath == false){
            if(dist(this.sprite.position.x, this.sprite.position.y, GameManager.allPlayers[0].sprite.position.x, GameManager.allPlayers[0].sprite.position.y) > 25){
                this.WWfindPlayer();
                this.findingPath = true;
            }
            if(!this.findingPath){
                this.pathIndex = 0;
                //console.log(this);
                this.nextPoint = this.path[0];
                this.sprite.velocity = {
                    x: (this.nextPoint.x - this.sprite.position.x)/15,
                    y: (this.nextPoint.y - this.sprite.position.y)/15
                }
            }

        } else if (this.path.length == 0 && this.findingPath == false){

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
    drawInfo() {
        LayerManager.Layers.Effects.noStroke();
        this.healthBar.refreshBar(
          this.sprite.position.x,
          this.sprite.position.y,
          this.health);
        }
}