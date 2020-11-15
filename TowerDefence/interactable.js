//IDK ABOUT THIS
class RawTile{
    static Type = {
        Grass: 'grass', 
        Flower: 'flower', 
        Wall: 'wall', 
        Tree: 'tree', 
        Spike: 'spike',
        Barricade: 'barricade', 
        Rock: 'rock', 
        Furnace: 'furnace', 
        TurretBasic: 'turretbasic',
        TurretFast: 'turretfast',
        Floor: 'floor'};

    static EFFECT = {Spend: 'spend', Generate: 'generate'};
    
    constructor(_type){
        this.type = _type;
        this.effect = {};
        switch(_type){
            
            case RawTile.Type.Grass:
                this.image = 'Images.Map.GrassRegular';
                this.passable = true;
            break;

            case RawTile.Type.Floor:
                this.image = 'Images.Map.Floor';
                this.passable = true;
            break;

            case RawTile.Type.Wall:
                this.image = 'Images.WallDebug.Lava';
                this.passable = false;
            break;



            case RawTile.Type.Tree:
                this.info = new Interactable('Images.Interactables.Tree1', 3, 3, Interactable.Alignment.BOTTOMCENTER, "Interactable.ChopTree(1)");
                this.passable = true;
            break;

            case RawTile.Type.Spike:
                this.info = new Interactable('Images.Interactables.Spike1', 1, 1, Interactable.Alignment.CENTER, "actor.damage(1)");
                this.passable = true;
            break;

            case RawTile.Type.Rock:
                this.info = new Interactable('Images.Interactables.Rock', 3, 3, Interactable.Alignment.BOTTOMCENTER, "Interactable.MineRock(1)")
                this.passable = false;
            break;

            case RawTile.Type.Barricade:
                this.info = new Interactable('Images.Interactables.Barricade', 1, 1, Interactable.Alignment.CENTER, "actor.damageBarricade(1000)")
                this.passable = true;
            break;

            case RawTile.Type.TurretBasic:
                //this.info = new Turret(Images.Interactables.Turret1, mouseX, mouseY);
                this.info = new RawTurret(Images.Interactables.Turret1, 3, 3, 300, Turret.type.Basic);
                this.passable = true;
            break;

            case RawTile.Type.TurretFast:
                //this.info = new Turret(Images.Interactables.Turret1, mouseX, mouseY);
                this.info = new RawTurret(Images.Interactables.TurretFast, 3, 3, 250, Turret.type.Fast);
                this.passable = true;
            break;



            case RawTile.Type.Furnace:
                this.info = new Interactable('Images.Interactables.Furnace', 3, 3, Interactable.Alignment.BOTTOMCENTER, "Interactable.SmeltRockIntoIron(1)")
                this.passable = false;
            break;

            // case RawTile.Debug.Spend:
            //     this.node = new Interactable(Interactable.NodeTypes.GENERATE, 1, 1, Interactable.Alignment.CENTER);
            //     this.image = 'Images.Interactables.Debug.SpendTouching';
            //     this.passable = false;
        }
    }
}
class Interactable{

    static Alignment = {BOTTOMCENTER: "bottomcenter", CENTER: "center"};

    constructor(_image, _sizeX, _sizeY, _alignment, _effect){
        
        this.image = _image;
        this.size = {x: _sizeX, y: _sizeY};
        this.effect = _effect; //Pass in a function to call
        //NOT YET IMPLEMENTED
        this.alignment = _alignment;

        
    }

    //EFFECTS
    //We use this to pass around as strings and eval
    static ChopTree(_amount){
        GameManager.resources.Wood += _amount
        //Play Wood Chopping Sound
    }

    static MineRock(_amount){
        GameManager.resources.Rock += _amount;
        //Play Mining 'tink' Sound
    }

    static SmeltRockIntoIron(_amount){
        
        if(GameManager.resources.Rock - _amount >= 0 && GameManager.resources.Wood - 1 >= 0){
            //Fire Crackling Sound?
            GameManager.resources.Wood -= 1;
            GameManager.resources.Rock -= _amount;
            GameManager.resources.Iron += _amount * 2; //HARDCODED BS
        }
    }
    
    static Damage(_amount){
        return {
            effect: 'damage',
            amount: _amount
        }
    }
}

/*
            case RawTile.Type.Tree:
                this.image = 'Images.Interactables.Tree1';
                this.effect.type = RawTile.EFFECT.Generate;
                this.effect.resource = 'wood';
                this.effect.amount = 1;
                this.passable = true;
            break;
*/