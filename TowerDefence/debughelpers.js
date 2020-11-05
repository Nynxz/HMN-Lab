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

            new DebugButton('Spawn Player (Center)', 25, 75, () => {
                let player = new Player("Debug Player", width/2, height/2);
                GameManager.allPlayers.push(player);
            });

            new DebugButton('Spawn Player (Selected Tile)', 25, 100, () => {
                if(Tile.activeTile){
                    let player = new Player("Debug Player" + floor(random(255)), Tile.activeTile.pos.x * Map.tileSize, Tile.activeTile.pos.y * Map.tileSize);
                    GameManager.allPlayers.push(player);
                }
            });


            //Toggle Layers
            new DebugButton('Toggle Ground Layer', 350, height - 25, () => {
                GameManager.Layers.GroundFloor.isEnabled = !GameManager.Layers.GroundFloor.isEnabled;
            });
            new DebugButton('Toggle Effects Layer', 550, height - 25, () => {
                GameManager.Layers.Effects.isEnabled = !GameManager.Layers.Effects.isEnabled;
            });







            DebugHelpers.isShowingButtons = true;
        } else {
            DebugHelpers.buttons = [];
            DebugHelpers.isShowingButtons = true;
        }
    }

    static drawFPS(){
        textAlign(LEFT);

        let fps = frameRate();
        fill(255);
        noStroke();
        stroke(0);
        text("FPS: " + fps.toFixed(2), 10, height - 10);
    }
}