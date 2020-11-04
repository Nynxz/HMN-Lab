class HealthBar {
    constructor(_initialHealthBarWidth,_initialHealthBarHeight,_healthBarX,_healthBarY,_color) {
        this.inititalHealthBarWidth = 50;
        this.initialHealthBarHeight = 5;
        this.healthBarX = 500;
        this.healthBarY = 500;
        this.color = "green";
        this.sprite= this.debugCreateHealthBar();
    }

    debugCreateHealthBar() {
        let sprite = createSprite(this.healthBarX,this.healthBarY,this.initalHealthBarWidth,this.initialHealthBarHeight);
        sprite.shapeColor=this.color;
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