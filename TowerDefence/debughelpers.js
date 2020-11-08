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
                //Map._generateFloorTiles();
                Map._generateAndyGrid();
                GameManager.pathfinding.loadGrid(Map.floorTiles, 0, 0, false);
                //GameManager.activePlayer.path = [];
            });

            new DebugButton('Damage All Players', 25, 50, () => {
                GameManager.allPlayers.forEach(player => {
                    player.damage(10);
                })
            });

            new DebugButton('Spawn Player (Center)', 25, 75, () => {
                let player = new Player("Debug Player", floor(random(255)), width/2, height/2);
                GameManager.allPlayers.push(player);
            });

            new DebugButton('Spawn Player (Selected Tile)', 25, 100, () => {
                if(Map.activeTile){
                    let player = new Player("Debug Player", floor(random(255)), Map.activeTile.pos.x * Map.tileSize + Map.tileSize/2, Map.activeTile.pos.y * Map.tileSize);
                    GameManager.allPlayers.push(player);
                }
            });

            new DebugButton('Recalculate ', 25, 125, () => {
                GameManager.pathfinding.loadGrid(Map.floorTiles, 0, 0, false);
            });

            //Toggle Layers
            new DebugButton('Toggle Ground Layer', 350, height - 25, () => {
                LayerManager.Layers.GroundFloor.isEnabled = !LayerManager.Layers.GroundFloor.isEnabled;
            });
            new DebugButton('Toggle Effects Layer', 550, height - 25, () => {
                LayerManager.Layers.Effects.isEnabled = !LayerManager.Layers.Effects.isEnabled;
            });

            new DebugButton('Toggle Buttons', width/2, 25, () => {
                
                DebugHelpers.toggleButtons();
            });
            DebugHelpers.buttons.pop();
           

            DebugHelpers.isShowingButtons = true;
        } else {
            DebugHelpers.buttons.forEach(button => button.remove());
            DebugHelpers.buttons = [];
            DebugHelpers.isShowingButtons = false;
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


    static removeElementFromArraryBackwards(arr, elem){
        for(let i = arr.length - 1; i >= 0; i--){
            if(arr[i] === elem){
                arr.splice(i, 1);
            }
        }
    }

    static pathingHeuristic(a, b){

        //let d = dist(a.x, a.y, b.x, b.y);
        let d = abs(a.y- a.x) + abs(b.y - b.x);
        //console.log(d)
        return d;
    }
}