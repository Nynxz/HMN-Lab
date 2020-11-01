class Controls{

    static ControlsEnum = {W: 87, A: 65, S: 83, D: 68};

    static ControlsVector2;

    static Init(){
        this.ControlsVector2 = createVector(0,0);
    }
    static refresh(){

        //Reset Vector
        this.ControlsVector2.x = 0;
        this.ControlsVector2.y = 0;

        if(keyIsDown(Controls.ControlsEnum.W)){
            this.ControlsVector2.y = constrain(this.ControlsVector2.y -= 1, -1, 1);
        }
        
        if(keyIsDown(Controls.ControlsEnum.S)){
            this.ControlsVector2.y = constrain(this.ControlsVector2.y += 1, -1, 1);
        }
        
        if(keyIsDown(Controls.ControlsEnum.D)){
            this.ControlsVector2.x = constrain(this.ControlsVector2.x += 1, -1, 1);
        }
        
        if(keyIsDown(Controls.ControlsEnum.A)){
            this.ControlsVector2.x = constrain(this.ControlsVector2.x -= 1, -1, 1);
        }

        //console.log(Controls.ControlsVector2);
    }
}