//Base Bar class?

class HealthBar {
    constructor(_initialHealthBarWidth, _initialHealthBarHeight, _healthBarXoffset, _healthBarYoffset, _color) {
        this.inititalHealthBarWidth = _initialHealthBarWidth;
        this.initialHealthBarHeight = _initialHealthBarHeight;
        this.healthBarXoffset = _healthBarXoffset;
        this.healthBarYoffset = _healthBarYoffset;
        this.color =  _color;
    }

    refreshHealthBar(xPos, yPos, health){        
        LayerManager.Layers.Effects.fill('red');
        LayerManager.Layers.Effects.rectMode(CENTER);
        LayerManager.Layers.Effects.rect(xPos + this.healthBarXoffset, yPos + this.healthBarYoffset, health, 15)
    }

    debugHealthBarDecrease() {
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
    }

    refreshStaminaBar(xPos, yPos, stamina){
        LayerManager.Layers.Effects.fill('blue');
        LayerManager.Layers.Effects.rectMode(CENTER);
        LayerManager.Layers.Effects.rect(xPos + this.staminaBarXoffset, yPos + this.staminaBarYoffset, stamina, 15)
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