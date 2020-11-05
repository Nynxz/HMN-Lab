class HUD {
    constructor(_xOffset,_yOffset,_containerWidth,_containerHeight,_score,_activePlayerName,_color,_activePlayerHeadingText) {
        this.xOffset = _xOffset;
        this.yOffset = _yOffset;
        this.containerWidth = _containerWidth;
        this.containerHeight = _containerHeight;
        this.score=_score;
        this.activePlayerName=_activePlayerName;
        this.color = "black";
        this.activePlayerHeadingText="Active Player:"
        this.activePlayer=Player.name;
        this.HUD = this.drawHUD();
        this.activePlayerHeaderText = this.drawActivePlayerHeader();
    }
    drawHUD() {
        let HUD = createSprite(width-(this.containerWidth/2),height-this.containerHeight/2,this.containerWidth,this.containerHeight);
        HUD.shapeColor=this.color;
    }
    drawActivePlayerHeader() {
        textSize(50);
        stroke(255);
        text(this.activePlayerHeadingText,900,400);

    }
}