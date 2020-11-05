//IDK ABOUT THIS
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