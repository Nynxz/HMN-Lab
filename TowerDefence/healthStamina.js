//Base Bar class?

class StatsBar{
    constructor(_initialBarWidth, _initialBarHeight, _Xoffset, _Yoffset, _color) {
        this.initialBarWidth  = _initialBarWidth;
        this.initialBarHeight = _initialBarHeight;
        this.BarXoffset = _Xoffset;
        this.BarYoffset = _Yoffset;
        this.color =  _color;
    }
    
    refreshBar(xPos, yPos, link){

        LayerManager.Layers.Effects.fill(this.color);
        LayerManager.Layers.Effects.rectMode(CENTER);
        LayerManager.Layers.Effects.rect(
            xPos + this.BarXoffset,
            yPos + this.BarYoffset,
            link, 15);
    }
}