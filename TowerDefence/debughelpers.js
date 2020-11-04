class DebugButton{
    constructor(_label, _xPos, _yPos, _doWhat){
        this.button = createButton(_label);
        this.button.position(_xPos, _yPos);
        this.button.mousePressed(_doWhat);

        DebugHelpers.buttons.push(this.button);
    }
}


class DebugHelpers{

    static isShowingButtons = false;
    static buttons = [];
    static toggleButtons(){
        if(!DebugHelpers.isShowingButtons){

            new DebugButton('Regen Floor', 25, 25, () => {
                Map._generateFloorTiles();
            });

            
            new DebugButton('Damage All Players', 25, 50, () => {
                GameManager.allPlayers.forEach(player => {
                    player.damage(10);
                })
            });

            // let buttonRegenMap = createButton('Regen Floor');
            // buttonRegenMap.position(25,25);
            // buttonRegenMap.mousePressed(() => {
            //     Map._generateFloorTiles();
            // })
            // DebugHelpers.buttons.push(buttonRegenMap);



            DebugHelpers.isShowingButtons = true;
        } else {
            buttons = [];
            DebugHelpers.isShowingButtons = true;
        }
    }
}