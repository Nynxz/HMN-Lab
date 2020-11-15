class RawTurret{
    constructor(_image, _sizeX, _sizeY, _range, _type){
        this.image = _image;
        this.size = {x: _sizeX, y: _sizeY};
        //this.effect = _effect; //Pass in a function to call    
        this.range = _range;
        this.type = _type;
    }
}

class Turret{
    static type = {Basic: 'basic', NoWall: 'nowall', Fast: 'fast'}
    static allTurrets = [];

    static basicTurrets =[];
    static nowallTurrets = [];
    static fastTurrets = [];
    constructor(_img, _x, _y, _range, _type ){
        this.image =  _img;
        this.x = _x;
        this.y = _y;
        this.sprite = createSprite(this.x, this.y);
        this.sprite.addImage(this.image);
        this.sprite.scale = 1;
        this.sprite.addToGroup(LayerManager.Layers.ZombieGroup);
        Turret.allTurrets.push(this);
        this.range = _range;
        this.type = _type
        this.sprite.onMouseOver = () => {
            this.hovering = true;
            LayerManager.Layers.HUDLayer.noFill();
            LayerManager.Layers.HUDLayer.circle(this.sprite.position.x, this.sprite.position.y, this.range*2);
        }
        this.sprite.onMouseOut = () => {
            this.hovering = false;
        }

        if(this.type == Turret.type.Basic){
            Turret.basicTurrets.push(this)
        }
        if(this.type == Turret.type.NoWall){
            Turret.nowallTurrets.push(this)
        }
        if(this.type == Turret.type.Fast){
            Turret.fastTurrets.push(this)
        }

    }

    refreshTurret(){
        //console.log("   ")
        this.sprite.mouseUpdate();
        if(this.hovering){
            console.log("HOVERING")
            this.sprite.onMouseOver();
        }
        let closestIDX;
        let closestD;
        let d;
        if(GameManager.allZombies.length > 0){
            GameManager.allZombies.forEach((zombie, idx) => {
                //Set closestD to first
                if(idx == 0){
                    closestIDX = idx;
                    closestD = dist(zombie.sprite.position.x, zombie.sprite.position.y, this.sprite.position.x, this.sprite.position.y);
                } else {
                    d = dist(zombie.sprite.position.x, zombie.sprite.position.y, this.sprite.position.x, this.sprite.position.y);
                }
                
                if(d < closestD){
                    closestD = d;
                    closestIDX = idx;
                }
    
            });
            let closestZombie = GameManager.allZombies[closestIDX];
           //LayerManager.Layers.HUDLayer.fill('green');
           //LayerManager.Layers.HUDLayer.line(closestZombie.sprite.position.x, closestZombie.sprite.position.y, this.sprite.position.x, this.sprite.position.y)
            LayerManager.Layers.HUDLayer.fill('black');
            
            
            if(closestD < this.range){
                angleMode(DEGREES);
                this.sprite.rotation = -atan2(this.sprite.position.x - closestZombie.sprite.position.x, this.sprite.position.y - closestZombie.sprite.position.y) ;
                
                if((frameCount % 120 == 0 && this.type == Turret.type.Basic) || (frameCount % 30 == 0 && this.type == Turret.type.Fast)){
                    console.log("SHOOTING")
                    let projectile = createSprite(this.sprite.position.x, this.sprite.position.y, 50, 50);
                    projectile.addImage(Images.Weapons.Bullets.Basic);
                    projectile.rotateToDirection  = true;
                    //We need to draw to a layer
                    projectile.addToGroup(LayerManager.Layers.BulletsGroup);
                    projectile.attractionPoint(3, closestZombie.sprite.position.x, closestZombie.sprite.position.y)
                    projectile.setCollider("circle", 0,0, 11);
                    projectile.debug = false;
                }
  
                
                
            } 
        }
    }

    shootTurret(){

    }

    makeTurret(x, y){
        let sprite = createSprite(x, this.y);
        sprite.addImage(this.image);
        sprite.scale = 4;
        sprite.addToGroup(LayerManager.Layers.ZombieGroup);
    }

    static checkPlacement(_worldX, _worldY){
        let tileTopLeft = Map.getTileAtWorldPosition(_worldX - Map.tileSize, _worldY - Map.tileSize);
        let tileTopCenter= Map.getTileAtWorldPosition(_worldX, _worldY - Map.tileSize);
        let tileTopRight = Map.getTileAtWorldPosition(_worldX + Map.tileSize, _worldY - Map.tileSize);
        let tileCenterLeft = Map.getTileAtWorldPosition(_worldX - Map.tileSize, _worldY);
        let tileCenter = Map.getTileAtWorldPosition(_worldX, _worldY);
        let tileCenterRight = Map.getTileAtWorldPosition(_worldX + Map.tileSize, _worldY);
        let tileBottomLeft = Map.getTileAtWorldPosition(_worldX - Map.tileSize, _worldY + Map.tileSize);
        let tileBottomCenter = Map.getTileAtWorldPosition(_worldX, _worldY + Map.tileSize);
        let tileBottomRight = Map.getTileAtWorldPosition(_worldX + Map.tileSize, _worldY + Map.tileSize);
        console.log(tileCenter);
        if(tileCenter.passable && tileTopLeft.passable && tileTopCenter.passable && tileTopRight.passable && tileCenterLeft.passable && tileCenterRight.passable && tileBottomLeft.passable && tileBottomCenter.passable && tileBottomRight.passable)
            return true
        return false
    }
}