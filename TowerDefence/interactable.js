//IDK ABOUT THIS
class RawTile{
    static Type = {Grass: 'grass', Flower: 'flower', Wall: 'wall', Tree: 'tree'};

    static Debug = {Spend: 'spend'};
    
    constructor(_type){
        this.type = _type;
        switch(_type){
            
            case RawTile.Type.Grass:
                this.image = Images.Map.GrassRegular;
                this.passable = true;
            break;

            case RawTile.Type.Wall:
                this.image = Images.WallDebug.Lava;
                this.passable = false;
            break;

            case RawTile.Type.Tree:
                this.image = Images.Interactables.Tree1;
                this.passable = true;
            break;
            
            case RawTile.Debug.Spend:
                this.node = new Interactable(Interactable.NodeTypes.GENERATE, 1, 1, Interactable.Alignment.CENTER);
                this.image = Images.Interactables.Debug.SpendTouching;
                this.passable = false;
        }
    }
}
class Interactable{

    static NodeTypes = {SPEND: "spend", GENERATE: "generate", SPENDANDGENERATE: "spendandgenerate"}
    static Alignment = {BOTTOMCENTER: "bottomcenter", CENTER: "center"};

    constructor(_type, _sizeX, _sizeY, _alignment){
        this.type = _type;
        this.size = {x: _sizeX, y: _sizeY};
        this.alignment = _alignment;

        this.children = [];
    }
}