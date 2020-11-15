class HUD {
    constructor(_xOffset,_yOffset,_containerWidth,_containerHeight,_score,_activePlayerName,_color,_activePlayerHeadingText,_debugClock) {
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
        this.hr = 0;
        this.min1 = 0;
        this.min2 = 0;
    }

    drawResources(){

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
        text("Score: " + GameManager.score,width-300,100);
        text("Wood: " + GameManager.resources.Wood,width-300,300);
        text("Rock: " + GameManager.resources.Rock,width-300,350);
        text("Iron: " + GameManager.resources.Iron,width-300,400);
    }

   drawGameClock() {
      textAlign(LEFT);
        textSize(15);
        fill(255);
        text(this.hr + ":" + this.min1 + this.min2,width-300,200);
        if(this.min2<=10 && frameCount%8==0){
            this.min2++; 
            }
            if(this.min2 ==10 && this.min1 <5) {
              this.min2 =0;
              this.min1++;
            }
            if(this.min2 ==9 && this.min1 == 5) {
              this.min1=0;
              this.min2=0;
              this.hr++;
            }
            if(this.hr<12) {
              //console.log("day");
              text("DAY TIME",width-300,220);
              textSize(20);
              textAlign(CENTER);
              text("It's day time. Collect wood from the trees, and set traps.",width/2,height-100);
              text("Left-click on a person, and then right click on a tree to collect wood.",width/2,height-70);
            }
            if(this.hr>=12) {
              //console.log("night");
              text("NIGHTIME",width-300,220);
              textSize(20);
              textAlign(CENTER);
              text("Aim at zombies with the cursor and fire using the Left Arrow.",width/2,height-100);
              text("Defeat the zombies and survive until morning.",width/2,height-70);
              image(Images.Effects.nightOverlay,0,0);
            }
            if(this.hr==24){
              this.hr =0;
              this.min1 = 0;
              this.min2 = 0;
            }
    }
    refreshHUD() {
        this.drawGameClock();
        this.drawResources();

    }
}