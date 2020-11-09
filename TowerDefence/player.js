class Actor {
  //We will use Actors as a "Sprite" wrapper
  //It will have movement/damage functions to be used by all things that move (Players, Enemies, Animals)
  constructor(_name, _initialHealth) {
    this.name = _name;
    this.health = _initialHealth;
  }

  //#region MOVEMENT
  placeActorAtPosition(_x, _y) {
    //Move to any x/y position
  }
  placeActorAtTileCenter(_tile) {
    //Instant Move to a Tile
  }
  moveActorToTile(_tile) {
    //Move using pathfinding
  }
  //#endregion
}
class PathingActor extends Actor {

  static idCount = 0;
  static Actors = [];
  constructor(_map, _name, _initalHealth, _startV2) {
    super(_name, _initalHealth);


    this.map = _map;
    this.start = { x: _startV2.x, y: _startV2.y };

    this.openedSet = [];
    this.closedSet = [];

    this.end;

    this.path = [];

    console.log("ACTOR MAP", this.map.length);

    this.generating = true;
  }
}

class Player extends PathingActor {
  constructor(_name, _health, _x, _y, _ammo) {
    let tile = Map.getTileAtWorldPosition(_x, _y);
    super(Map.floorTiles, _name, 100, { x: tile.pos.x, y: tile.pos.y });

    this.id = PathingActor.idCount;
    PathingActor.idCount++;
    PathingActor.Actors.push(this);

    //TODO
    this.stamina = 80;

    this.selected = false;

    this.sprite = this.debugCreatePlayer(_x, _y, 2); //2 = initial ammo
    this.healthBar = new StatsBar(this.health, 200, 10, 0, -50, "red");
    this.staminaBar = new StatsBar(this.stamina, 200, 10, 0, -70, "blue");
    this.currentTask = null;

    this.nextPoint = { x: _x, y: _y };
    this.pathIndex = 0;
    this.walking = false;

    this.baseY;
    // this.test = new Player("Test", 100, 50, 50);
    // console.log(this);
    this.ammo = _ammo;
    this.projectile=this.shootAmmo();
  }

  doWork(){
    if(this.currentTask != null){
      if(dist(this.sprite.position.x, this.sprite.position.y, (this.currentTask.pos.x * Map.tileSize) + (Map.tileSize/2), (this.currentTask.pos.y* Map.tileSize) + (Map.tileSize/2)) < 25){
        if(frameCount % 60 == 0){
          if(this.currentTask.node.effect.resource == "wood"){
            GameManager.resources.Wood += this.currentTask.node.effect.amount
          }
        }
      }
    }
  }

  WWfindPath(x, y){
    let obj = {
        type: 'find',
        from: this.id,
        payload: {x1: this.sprite.position.x, y1: this.sprite.position.y, x2: x, y2: y}
    }
    GameManager.pathfindingWorkerPlayer.postMessage(obj);
}

  andyMovement() {
    //check if Knight is close to their next movement point
    //console.log(this.sprite.position.x)
    //console.log(this.nextPoint.x)
    this.doWork();
    if (
      Math.abs(this.sprite.position.x - this.nextPoint.x) +
        Math.abs(this.sprite.position.y - this.nextPoint.y) <
        1 &&
      this.path.length > 1
    ) {
      this.pathIndex += 1;
      if (this.pathIndex == this.path.length) {
        //this means we have reached the end
        //generate a new random goal for our knight to get to.
        // goal.x = Math.random() * 800;
        // goal.y = Math.random() * 600;

        // //calculate path to new goal
        // path = pathfinding.findPath(knight.position.x, knight.position.y, goal.x, goal.y);
        this.pathIndex = 0;
        this.path = [];

        this.nextPoint.x = this.sprite.position.x;
        this.nextPoint.y = this.sprite.position.y;
        this.sprite.velocity.x = 0;
        this.sprite.velocity.y = 0;
        this.walking = false;
      } else if (this.walking) {
        //next point is first index of array
        this.nextPoint = this.path[this.pathIndex];

        this.sprite.velocity.x =
          (this.nextPoint.x - this.sprite.position.x) / 15;
        this.sprite.velocity.y =
          (this.nextPoint.y - this.sprite.position.y) / 15;
      }
    } else if (this.pathIndex == 0 && this.path.length > 0) {
      this.nextPoint = this.path[0];
      this.sprite.velocity.x = (this.nextPoint.x - this.sprite.position.x) / 15;
      this.sprite.velocity.y = (this.nextPoint.y - this.sprite.position.y) / 15;
    }
    this._playAnimations();
  }

  debugCreatePlayer(x, y) {
    let sprite = createSprite(x, y);
    sprite.addToGroup(LayerManager.Layers.PlayerCharactersGroup);
    sprite.Parent = this;
    sprite.scale = 2;
    //#region  ANIMS
    sprite.addAnimation("walkup", Images.Player.SpriteSheets.Walking.Up);
    sprite.addAnimation("walkdown", Images.Player.SpriteSheets.Walking.Down);
    sprite.addAnimation("walkleft", Images.Player.SpriteSheets.Walking.Left);
    sprite.addAnimation("walkright", Images.Player.SpriteSheets.Walking.Right);
    sprite.addAnimation("stand", Images.Player.SpriteSheets.Stand);
    sprite.changeAnimation("stand");
    //#endregion

    //TODO : This is coupled way too tightly with GameManger, try to decouple
    sprite.onMousePressed = function () {
      console.log(GameManager);
      if (!this.Parent.isSelected) {
        console.log("Clicked on :", this.Parent.name);

        GameManager.allPlayers.forEach((player) => (player.isSelected = false));

        GameManager.activePlayer = this.Parent;
        this.Parent.isSelected = true;
      } else {
        GameManager.activePlayer = null;
        this.Parent.isSelected = false;
      }
    };
    return sprite;
  }

  _playAnimations(){
    this.sprite.animation.frameDelay = 8;

    if (this.sprite.velocity.x > 0.2) {
      //this.sprite.position.x += walkSpeed;
      this.sprite.changeAnimation("walkright");
    } else if (this.sprite.velocity.x < -0.1) {
      //this.sprite.position.x -= walkSpeed;
      this.sprite.changeAnimation("walkleft");
    } else {
      this.sprite.changeAnimation("stand");
    }

    if (this.sprite.velocity.y < -0.1) {
      //this.sprite.position.y -= walkSpeed;
      this.sprite.changeAnimation("walkup");
    } else if (this.sprite.velocity.y > 0.1) {
      //this.sprite.position.y += walkSpeed;
      this.sprite.changeAnimation("walkdown");
    }
  }

  drawInfo() {
    LayerManager.Layers.Effects.noStroke();

    this.healthBar.refreshBar(
      this.sprite.position.x,
      this.sprite.position.y,
      this.health
    );
    this.staminaBar.refreshBar(
      this.sprite.position.x,
      this.sprite.position.y,
      this.stamina
    );
  }

  shootAmmo() {
    if (keyDown(LEFT_ARROW)) {
      let projectile = createSprite(this.debugCreatePlayer.x, this.debugCreatePlayer.y, 5, 5);
      projectile.setSpeed(10, this.debugCreatePlayer.x);
      this.ammo--;
      console.log("pew pew");
    }
    if ((this.ammo = 0)) {
      console.log("no ammo!");
    }
  }

  damage(amount) {
    this.health = constrain(this.health - amount, 0, this.health);
    if (this.health == 0) {
      this.die();
    }
  }

  die() {
    if (GameManager.activePlayer === this) {
      console.log("Killing Active Player");
      this.selected = false;
      GameManager.activePlayer = null;
    }

    GameManager.allPlayers.forEach((player, i) => {
      if (player === this) {
        GameManager.allPlayers.splice(i, 1);
      }
    });

    this.sprite.remove();
  }

  _selected() {
    if (this.health > 0) {
      LayerManager.Layers.Effects.noFill();
      LayerManager.Layers.Effects.stroke(0, 255, 0);
      LayerManager.Layers.Effects.strokeWeight(6);
      LayerManager.Layers.Effects.image(
        Images.PlayerSelected.PlayerSelectedImage,
        this.sprite.position.x - 28,
        this.sprite.position.y + 25,
        60
      );
    }
  }
}
