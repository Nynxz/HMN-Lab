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
                    new Zombie('Rando Zombie Boi', 100 * ZombieSpawner.difficultyModifier, random(0 + ZombieSpawner.offsetMax / ZombieSpawner.difficultyModifier, width - ZombieSpawner.offsetMax / ZombieSpawner.difficultyModifier), random(0 - ZombieSpawner.offsetMin, 0 - ZombieSpawner.offsetMax / ZombieSpawner.difficultyModifier))
                break;
                case 'E':
                    new Zombie('Rando Zombie Boi', 100 * ZombieSpawner.difficultyModifier, random(width + ZombieSpawner.offsetMin, width + ZombieSpawner.offsetMax), random(0 + ZombieSpawner.offsetMax / ZombieSpawner.difficultyModifier, height - ZombieSpawner.offsetMax))
                break;
                case 'S':
                    new Zombie('Rando Zombie Boi', 100 * ZombieSpawner.difficultyModifier, random(0 + ZombieSpawner.offsetMax / ZombieSpawner.difficultyModifier, width - ZombieSpawner.offsetMax / ZombieSpawner.difficultyModifier), random(height + ZombieSpawner.offsetMin, height + ZombieSpawner.offsetMax / ZombieSpawner.difficultyModifier))
                break;
                case 'W':
                    new Zombie('Rando Zombie Boi', 100 * ZombieSpawner.difficultyModifier, random(0 - ZombieSpawner.offsetMin, 0 - ZombieSpawner.offsetMax / ZombieSpawner.difficultyModifier), random(0 - ZombieSpawner.offsetMin, height - ZombieSpawner.offsetMax / ZombieSpawner.difficultyModifier))
                break;
            }
        }
        
        this.difficultyModifier += 0.05;
        this.startingAmount+=0.05;
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
        if(this.hordeMembers.length>2){
            LayerManager.Layers.ZombieGroupLeaders.remove(_zombie);
            _zombie.addToGroup(LayerManager.Layers.ZombieGroup)
            _zombie.visible = false;
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

    refreshHordeInformation(){
        LayerManager.Layers.HUDLayer.text(this.hordeMembers.length + " Zombies", this.hordeMembers[0].position.x, this.hordeMembers[0].position.y - 25);
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
        if(this.inHorde){
            this.horde.hordeMembers[this.horde.hordeMembers.length - 1].Parent.health = constrain(this.horde.hordeMembers[this.horde.hordeMembers.length - 1].Parent.health - amount, 0, this.horde.hordeMembers[this.horde.hordeMembers.length - 1].Parent.health);
            if (this.horde.hordeMembers[this.horde.hordeMembers.length - 1].Parent.health == 0) {
                this.horde.hordeMembers[this.horde.hordeMembers.length - 1].Parent.die();
            }
        } else {
            this.health = constrain(this.health - amount, 0, this.health);
            if (this.health == 0) {
              this.die();
            }
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
        
        if(this.inHorde){
            this.horde.hordeMembers.forEach((el, idx) => {
                if(el === this.sprite){
                    this.horde.hordeMembers.splice(idx, 1);
                }
            })
        }

        this.sprite.remove();
        GameManager.score+=100;
        
    }


    findClosestPlayer(){
        let closestDistance;
        let closestIdx = 0
        GameManager.allPlayers.forEach((player, idx) => {
            let d = dist(player.sprite.position.x, player.sprite.position.y, this.sprite.position.x, this.sprite.position.y)
            if(idx == 0){
                closestDistance = d
            } else if(d < closestDistance){
                closestIdx = idx;
                closestDistance = d
            }
        })
        return GameManager.allPlayers[closestIdx];
    }

    WWfindPlayer(){
        let madeHorde = false;
        //Hording Code - JANK AF - Just make more webworkers
        if(true)
        LayerManager.Layers.ZombieGroupLeaders.overlap(LayerManager.Layers.ZombieGroupLeaders, (actor1, actor2) => {
            if(!actor1.Parent.inHorde && !actor2.Parent.inHorde && !madeHorde){
                new Horde(actor1, actor2);
                //madeHorde = true;
            } else if(!actor1.Parent.inHorde){
                actor2.Parent.horde.addZombie(actor1);
            } else if(!actor2.Parent.inHorde){
                actor1.Parent.horde.addZombie(actor2);
            } else if (actor1.Parent.horde !== actor2.Parent.horde && actor1.Parent.inHorde && actor2.Parent.inHorde && actor1.Parent.horde.hordeMembers[0] == actor1){
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
        let closestPlayer = this.findClosestPlayer();
        if(closestPlayer){
            if(!this.inHorde){
                obj  = {
                    type: 'find',
                    from: this.id,
                    payload: {x1: this.sprite.position.x, y1: this.sprite.position.y, x2: closestPlayer.sprite.position.x, y2: closestPlayer.sprite.position.y}
                }
                GameManager.pathfindingWorker.postMessage(obj);
            }
            else if (this.sprite.Parent.horde.hordeMembers[0] == this.sprite) {
                obj = {
                    type: 'findHorde',
                    from: this.horde.id,
                    payload: {x1: this.sprite.position.x, y1: this.sprite.position.y, x2: closestPlayer.sprite.position.x, y2: closestPlayer.sprite.position.y}
                }
                GameManager.pathfindingWorker.postMessage(obj);
            }    
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
        sprite.debug = false;
        sprite.setCollider('rectangle', 0, +5, Map.tileSize*1, Map.tileSize*2)
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
        this.slowed = false;

        let tile = Map.getTileAtWorldPosition(this.sprite.position.x, this.sprite.position.y+Map.tileSize);
        if(tile)
        if(tile.node)
        if(tile.node.type == 'spike' || tile.node.type == 'barricade'){
            let actor = this;
            eval(tile.node.info.effect)
            //console.log(tile.node)
        }
        //TODO: MOVE THIS
        if(GameManager.allPlayers.length > 0){
            let closestPlayer = this.findClosestPlayer();
            if(dist(this.sprite.position.x, this.sprite.position.y, closestPlayer.sprite.position.x,closestPlayer.sprite.position.y) < 25){
                
                closestPlayer.damage(.05);
            }    
        }


        // if(dist(this.sprite.position.x, this.sprite.position.y, GameManager.allPlayers[0].sprite.position.x, GameManager.allPlayers[0].sprite.position.y) < 120 && frameCount % 600 == 0){
        //     this.pathIndex = 0;
        //     this.path = []
            
        //     this.nextPoint = {x: this.sprite.position.x, y: this.sprite.position.y};
        //     this.sprite.velocity ={x: 0, y: 0};

        //     this.walking = false;
        //     this.WWfindPlayer();
        //     this.findingPath = false;
        // }
        
        if(this.path.length > 0)
        if (Math.abs(this.sprite.position.x - this.nextPoint.x) + Math.abs(this.sprite.position.y - this.nextPoint.y) < 1 && this.path.length > 0) {

            this.pathIndex += 1;
            if (this.pathIndex >= this.path.length) { 
                
                this.pathIndex = 0;
                this.path = []
                
                this.nextPoint = {x: this.sprite.position.x, y: this.sprite.position.y};
                this.sprite.velocity ={x: 0, y: 0};

                this.walking = false;
                this.WWfindPlayer();
                this.findingPath = true;
            } else if(this.walking){
                if(this.nextPoint){
                    //next point is first index of array
                    this.nextPoint = this.path[this.pathIndex];
                    let speed = 1;
                    if(this.slowed){
                        speed = .3
                    }
                    this.sprite.velocity ={x: 0, y: 0};
                    this.sprite.attractionPoint(speed, this.nextPoint.x , this.nextPoint.y) 
                }else {
                    this.sprite.velocity ={x: 0, y: 0};
                    this.WWfindPlayer();
                    this.walking = false;
                    this.findingPath = true;
                }                
            }
        } else if(this.pathIndex == 0 && this.path.length > 0 && this.findingPath == false){
            if(dist(this.sprite.position.x, this.sprite.position.y, GameManager.allPlayers[0].sprite.position.x, GameManager.allPlayers[0].sprite.position.y) > 25){
                this.walking = false;
                this.WWfindPlayer();
                this.findingPath = true;
            }
            if(!this.findingPath){
                this.WWfindPlayer();
                this.findingPath = true;
                this.pathIndex = 0;
                //console.log(this);
                //this.nextPoint = this.path[0];
                //Move from 'spawning outside' to the edge of the pathing map
                this.sprite.attractionPoint(.1, this.sprite.position.x , this.sprite.position.y) 
                //this.sprite.velocity = {x: this.nextPoint.x , y: this.nextPoint.y}
                    // x: (this.nextPoint.x - this.sprite.position.x) / speed,
                    // y: (this.nextPoint.y - this.sprite.position.y) / speed
                
            }

        } else if (this.path.length == 0 && this.findingPath == false){
            this.WWfindPlayer();
            this.findingPath = true;
            this.sprite.velocity ={x: 0, y: 0};
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
        if(this.sprite.visible){
            LayerManager.Layers.Effects.noStroke();
            this.healthBar.refreshBar(
              this.sprite.position.x,
              this.sprite.position.y,
              this.health);
            }
        }
}