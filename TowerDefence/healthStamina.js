class HealthBar {
    constructor(_initialHealthBarWidth, _initialHealthBarHeight, _healthBarXoffset, _healthBarYoffset, _color) {
        this.inititalHealthBarWidth = _initialHealthBarWidth;
        this.initialHealthBarHeight = _initialHealthBarHeight;
        this.healthBarXoffset = _healthBarXoffset;
        this.healthBarYoffset = _healthBarYoffset;
        this.color =  _color;
        this.sprite = this.createHealthBar();
    }

    createHealthBar(xPos, yPos) {
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
    healthBarDecrease() {
        if(inititalHealthBarWidth>=10) {
            inititalHealthBarWidth-(initalHealthBarWidth/0.25);
        }
    }
    healthBarIncrease() {
        if(initalHealthBarWidth<initialHealthBarWidth) {
            initialHealthBarWidth+(initalHealthBarWidth/0.25);
        }
    }
}
class StaminaBar {
    constructor(_initialStaminaBarWidth, _initialStaminaBarHeight, _staminaBarXoffset, _staminaBarYoffset, _color) {
        this.inititalStaminaBarWidth = _initialStaminaBarWidth;
        this.initialStaminaBarHeight = _initialStaminaBarHeight;
        this.staminaBarXoffset = _staminaBarXoffset;
        this.staminaBarYoffset = _staminaBarYoffset;
        this.color =  _color;
        this.sprite = this.createStaminaBar();
    }

    createStaminaBar(xPos, yPos) {
        let sprite = createSprite(xPos + this.staminaBarXoffset, yPos + this.staminaBarYoffset,this.initalStaminaBarWidth,this.initialStaminaBarHeight);
        sprite.shapeColor=this.color;
        return sprite;
    }

    refreshStaminaBar(xPos, yPos, stamina){
        if(this.sprite){
            this.sprite.width = stamina;
            this.sprite.position.x = xPos + this.staminaBarXoffset;
            this.sprite.position.y = yPos + this.staminaBarYoffset;
        }
    }
    staminaBarDecrease() {
        if(inititalStaminaBarWidth>=10) {
            inititalStaminaBarWidth-(initalStaminaBarWidth/0.25);
        }
    }
    staminaBarIncrease() {
        if(initalStaminaBarWidth<initialStaminaBarWidth) {
            initialStaminaBarWidth+(initalStaminaBarWidth/0.25);
        }
    }
}