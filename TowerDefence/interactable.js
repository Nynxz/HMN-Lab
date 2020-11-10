//IDK ABOUT THIS
class RawTile{
    static Type = {Grass: 'grass', Flower: 'flower', Wall: 'wall', Tree: 'tree', Spike: 'spike'};

    static EFFECT = {Spend: 'spend', Generate: 'generate'};
    
    constructor(_type){
        this.type = _type;
        this.effect = {};
        switch(_type){
            
            case RawTile.Type.Grass:
                this.image = 'Images.Map.GrassRegular';
                this.passable = true;
            break;

            case RawTile.Type.Wall:
                this.image = 'Images.WallDebug.Lava';
                this.passable = false;
            break;

            case RawTile.Type.Tree:
                this.info = new Interactable('Images.Interactables.Tree1', 3, 6, Interactable.Alignment.BOTTOMCENTER, "Interactable.ChopTree(1)");
                this.passable = true;
            break;

            case RawTile.Type.Spike:
                this.info = new Interactable('Images.Interactables.Spike1', 1, 1, Interactable.Alignment.BOTTOMCENTER, "Interactable.ChopTree(1)");
                this.passable = true;
            break;
            
            case RawTile.Debug.Spend:
                this.node = new Interactable(Interactable.NodeTypes.GENERATE, 1, 1, Interactable.Alignment.CENTER);
                this.image = 'Images.Interactables.Debug.SpendTouching';
                this.passable = false;
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
    static ChopTree(amount){
        GameManager.resources.Wood += amount;
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