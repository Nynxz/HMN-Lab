class HUD {
    constructor(_xOffset,_yOffset,_containerWidth,_containerHeight,_score,_activePlayerName,_color,_activePlayerHeadingText) {
        this.xOffset = _xOffset;
        this.yOffset = _yOffset;
        this.containerWidth = _containerWidth;
        this.containerHeight = _containerHeight;
        this.score=_score;
        this.activePlayerName=_activePlayerName;
        this.color = "black";
        this.activePlayerHeadingText = "Active Player:"
        this.activePlayer= GameManager.activePlayer;
        this.HUD = this.drawHUD();
        this.activePlayerHeaderText = this.drawActivePlayerHeader();
    }
    drawHUD() {
        let HUD = createSprite(width-(this.containerWidth/2),height-this.containerHeight/2,this.containerWidth,this.containerHeight);
        HUD.shapeColor=this.color;
    }
    drawActivePlayerHeader() {
        textAlign(LEFT);
        textSize(15);
        fill(255);
        let name = GameManager.activePlayer ? GameManager.activePlayer.name : " NO PLAYER";
        text(this.activePlayerHeadingText + " " + name,width-300,25);
        let hp = GameManager.activePlayer ? GameManager.activePlayer.health : " NO PLAYER";
        text("Health" + " " + hp,width-300,75);
        let stam = GameManager.activePlayer ? GameManager.activePlayer.stamina : " NO PLAYER";
        text("Stamina" + " " + stam,width-300,125);
    }
}