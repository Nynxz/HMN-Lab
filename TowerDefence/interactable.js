//IDK ABOUT THIS
class RawTile{
    static Type = {Grass: 'grass', Flower: 'flower', Wall: 'wall'};
    constructor(_type){
        switch(_type){

            case RawTile.Type.Grass:
                this.image = Images.Map.GrassRegular;
                this.passable = true;
            break;

            case RawTile.Type.Wall:
                this.image = Images.WallDebug.Lava;
                this.passable = false;
            break;
        }
    }
}
class Interactable{
    
    static Type = {Walk: 'walk', Generate: 'generate', Spend: 'spend'};
    static Range = {Touching: 'touching', Short: 'short', Far: 'far'};

    constructor(img, _x, _y, _type, _range){
       this.sprite = createSprite(_x, _y);
       this.sprite.addImage(img);
       this.sprite.depth = 0
       this.type = _type;
       this.range = _range;
    }
}