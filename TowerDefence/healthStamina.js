class HealthBar {
    constructor(_initialHealthBarWidth, _initialHealthBarHeight, _healthBarXoffset, _healthBarYoffset, _color) {
        this.inititalHealthBarWidth = _initialHealthBarWidth;
        this.initialHealthBarHeight = _initialHealthBarHeight;
        this.healthBarXoffset = _healthBarXoffset;
        this.healthBarYoffset = _healthBarYoffset;
        this.color =  _color;
        this.sprite = this.debugCreateHealthBar();
    }

    debugCreateHealthBar(xPos, yPos) {
        let sprite = createSprite(xPos + this.healthBarXoffset, yPos + this.healthBarYoffset,this.initalHealthBarWidth,this.initialHealthBarHeight);
        sprite.shapeColor=this.color;
        return sprite;
    }

    refreshHealthBar(xPos, yPos, health){
        if(this.sprite){
            this.sprite.width = health;
            this.sprite.position.x = xPos + this.healthBarXoffset;
            this.sprite.position.y = yPos + this.healthBarYoffset;
        }
    }
    debugHealthBarDecrease() {
        if(inititalHealthBarWidth>=10) {
            inititalHealthBarWidth-(initalHealthBarWidth/0.25);
        }
    }
    debugHealthBarIncrease() {
        if(initalHealthBarWidth<initialHealthBarWidth) {
            initialHealthBarWidth+(initalHealthBarWidth/0.25);
        }
    }
}