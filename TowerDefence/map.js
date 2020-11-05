class Tile{
    static tileCount = 0;
    static floorTiles = [];
    static activeTile;

    constructor(_rand, _x, _y, _size){
        this.id = Tile.tileCount++;
        
        if(_rand > .2){
            this.type = 'grass';
            Map.MapCanvas.image(Images.Map.GrassRegular, (_x+1) * Map.tileSize - (Map.tileSize),  (_y+1) * Map.tileSize - (Map.tileSize), Map.tileSize, Map.tileSize);
            this.passable = true;
            
        } else {
            Map.MapCanvas.image(Images.Map.GrassFlower, (_x+1) * Map.tileSize - (Map.tileSize),  (_y+1) * Map.tileSize - (Map.tileSize), Map.tileSize, Map.tileSize);
            this.type = 'flower'
            this.passable = false;
        }

        this.pos = {x: _x, y: _y};
        
        
        //console.log(this.id)
        if(_x % 91 == 0){
            Tile.floorTiles.push([]);
        }
        Tile.floorTiles[_y].push(this);
    }

    markActive(){
        rectMode(CORNER)
        noFill();
        stroke('red');
        strokeWeight(1);
        rect(this.pos.x * Map.tileSize, this.pos.y * Map.tileSize, Map.tileSize);
    }
}



class Map{

    static mapWidth =  1440/16;
    static mapHeight = 816/16;

    static tileSize = 16;

    static randomValues = [];
    static MapGet;


    //Test
    static MapCanvas;
    static generateMap(){
        Map.MapCanvas = createGraphics(1440, 816);

        Map._generateFloorTiles();

    }

    static drawFloorTiles(){

        image(Map.MapCanvas, 0, 0);

        // //We Generate Random Values, Once to Save
        // for(let x=0; x < Map.mapWidth; x++){
        //     for(let y=0; y < Map.mapHeight; y++){
        //         if(Map.randomValues[x][y] > .2){
        //             image(Images.Map.GrassRegular, (x+1) * Map.tileSize - (Map.tileSize),  (y+1) * Map.tileSize - (Map.tileSize), Map.tileSize, Map.tileSize);
        //         } else {
        //             image(Images.Map.GrassFlower, (x+1) * Map.tileSize - (Map.tileSize),  (y+1) * Map.tileSize - (Map.tileSize), Map.tileSize, Map.tileSize);
        //         }
        //     }
        // }
        
    }

    static async logTileInfo(){
        // let bool = true;
        // console.log("LOGGING START");

        // setTimeout(() =>{
        //     console.log("LOGGING OFF");
        //     bool = false;
        // }, 500);
        // while(bool){
        //     console.log("LOGGING ON");
        // }
    }

    static getTileAtWorldPosition(_x, _y){
        Map.logTileInfo()
        let tile = Tile.floorTiles[floor(_y / Map.tileSize)][floor( _x / Map.tileSize)];
        Tile.activeTile = tile;
        return Tile.floorTiles[floor(_y / Map.tileSize)][floor( _x / Map.tileSize)]
    }

    static _generateFloorTiles(){
        Tile.floorTiles = [];
        Map.randomValues = [];
        for(let x=0; x < Map.mapWidth; x++){
            Map.randomValues.push([]);
            for(let y=0; y < Map.mapHeight; y++){
                let rand = random(0,1)
                Map.randomValues[x].push(rand); 
                new Tile(rand, x, y);            
            }
        }

        console.log(Tile.floorTiles);

         //We Generate Random Values, Once to Save
        //  for(let x=0; x < Map.mapWidth; x++){
        //     for(let y=0; y < Map.mapHeight; y++){
        //         if(Map.randomValues[x][y] > .2){
        //             Map.MapCanvas.image(Images.Map.GrassRegular, (x+1) * Map.tileSize - (Map.tileSize),  (y+1) * Map.tileSize - (Map.tileSize), Map.tileSize, Map.tileSize);
        //         } else {
        //             Map.MapCanvas.image(Images.Map.GrassFlower, (x+1) * Map.tileSize - (Map.tileSize),  (y+1) * Map.tileSize - (Map.tileSize), Map.tileSize, Map.tileSize);
        //         }
        //     }
        // }

        console.log("DONE");
    }


}