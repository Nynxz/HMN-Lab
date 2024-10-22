class HUD {
    constructor(_xOffset,_yOffset,_containerWidth,_containerHeight,_score,_activePlayerName,_color,_activePlayerHeadingText,_debugClock) {
        this.xOffset = _xOffset;
        this.yOffset = _yOffset;
        this.containerWidth = _containerWidth;
        this.containerHeight = _containerHeight;
        this.score=_score;
        this.activePlayerName=_activePlayerName;
        this.color = "black";
        this.activePlayerHeadingText = "Active Player"
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
        textAlign(RIGHT);
        textSize(20);
        fill(255);
        
        let name = GameManager.activePlayer ? GameManager.activePlayer.name : "NO PLAYER";
        text(this.activePlayerHeadingText + " " + name,width-80,height-210);
        let hp = GameManager.activePlayer ? GameManager.activePlayer.health : " NO PLAYER";
        text("Health" + " " + hp,width-80,height-180);
        let stam = GameManager.activePlayer ? GameManager.activePlayer.stamina : " NO PLAYER";
        text("Stamina" + " " + stam,width-80,height-150);
        
        textAlign(RIGHT);
        text("Wood: " + GameManager.resources.Wood,width-80,160);
        text("Rock: " + GameManager.resources.Rock,width-80,180);
        text("Iron: " + GameManager.resources.Iron,width-80,200);
        
        textSize(25);
        text("Score: " + GameManager.score,width-80,height-100);
    }

   drawGameClock() {
      textAlign(RIGHT);
        textSize(25);
        fill(255);
        text(this.hr + ":" + this.min1 + this.min2,width-80,90);
        if(this.min2<=10){
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
              text("DAY",width-80,120);
              textSize(20);
              textAlign(CENTER);
              text("It's day time. Collect wood from the trees, and set traps.",width/2,height-100);
              text("Left-click on a person, and then right click on a tree to collect wood.",width/2,height-70);
            }
            if(this.hr>=12) {
              //console.log("night");
              text("NIGHT",width-80,120);
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