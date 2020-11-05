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

    static _generateFloorTiles(){
        Map.randomValues = [];
        for(let x=0; x < Map.mapWidth; x++){
            Map.randomValues.push([]);
            for(let y=0; y < Map.mapHeight; y++){
                Map.randomValues[x].push(random(0,1));             
            }
        }

         //We Generate Random Values, Once to Save
         for(let x=0; x < Map.mapWidth; x++){
            for(let y=0; y < Map.mapHeight; y++){
                if(Map.randomValues[x][y] > .2){
                    Map.MapCanvas.image(Images.Map.GrassRegular, (x+1) * Map.tileSize - (Map.tileSize),  (y+1) * Map.tileSize - (Map.tileSize), Map.tileSize, Map.tileSize);
                } else {
                    Map.MapCanvas.image(Images.Map.GrassFlower, (x+1) * Map.tileSize - (Map.tileSize),  (y+1) * Map.tileSize - (Map.tileSize), Map.tileSize, Map.tileSize);
                }
            }
        }
    }
}