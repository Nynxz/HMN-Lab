//Base Bar class?

class StatsBar{
    constructor(_link, _initialBarWidth, _initialBarHeight, _Xoffset, _Yoffset, _color) {
        this.initialBarWidth  = _initialBarWidth;
        this.initialBarHeight = _initialBarHeight;
        this.BarXoffset = _Xoffset;
        this.BarYoffset = _Yoffset;
        this.color =  _color;
        this.link = _link;
    }
    
    refreshBar(xPos, yPos){
        LayerManager.Layers.Effects.fill(this.color);
        LayerManager.Layers.Effects.rectMode(CENTER);
        LayerManager.Layers.Effects.rect(
            xPos + this.BarXoffset,
            yPos + this.BarYoffset,
            this.link, 15);
    }
}