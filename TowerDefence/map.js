class Tile{

    //we use this for id's, increased every time a Tile is constructed
    static tileCount = 0;
    //TODO: MOVE THIS TO A LAYER?

    constructor(_arrayToStore, _x, _y, _rand){

        //Assign an id to a tile
        this.id = Tile.tileCount++;
        this.pos = {x: _x, y: _y};
        _arrayToStore[_y][_x] = this;

        //TODO: MOVE TO FUNCTION?
        if(_rand > .2){
            this.type = 'grass';
            LayerManager.Layers.GroundFloor.image(Images.Map.GrassRegular, (_x+1) * Map.tileSize - (Map.tileSize),  (_y+1) * Map.tileSize - (Map.tileSize), Map.tileSize, Map.tileSize);
            this.passable = true;
        } else if (_rand > .6) {
            LayerManager.Layers.GroundFloor.image(Images.Map.GrassFlower, (_x+1) * Map.tileSize - (Map.tileSize),  (_y+1) * Map.tileSize - (Map.tileSize), Map.tileSize, Map.tileSize);
            this.type = 'flower'
            this.passable = true;
        } else {
            LayerManager.Layers.GroundFloor.image(Images.WallDebug.Lava, (_x+1) * Map.tileSize - (Map.tileSize),  (_y+1) * Map.tileSize - (Map.tileSize), Map.tileSize, Map.tileSize);
            this.type = 'lava'
            this.passable = false;
        }

        this.debugActive = false;
    }

    //We use this to mark the selected squares as active
    markActive() {
        this.visualColorCircle('red')
    }

    visualColorCircle(col){
        LayerManager.Layers.GroundFloorExtras.rectMode(CORNER)
        LayerManager.Layers.GroundFloorExtras.noFill();
        LayerManager.Layers.GroundFloorExtras.stroke(col);
        LayerManager.Layers.GroundFloorExtras.strokeWeight(1);
        LayerManager.Layers.GroundFloorExtras.rect(this.pos.x * Map.tileSize, this.pos.y * Map.tileSize, Map.tileSize);
        LayerManager.Layers.GroundFloorExtras.fill(col);
        LayerManager.Layers.GroundFloorExtras.circle(this.pos.x * Map.tileSize + Map.tileSize/2, this.pos.y * Map.tileSize + Map.tileSize/2, Map.tileSize/2)
        //LayerManager.Layers.Effects.image(Images.Map.Wall, tile.pos.x * Map.tileSize, tile.pos.y * Map.tileSize, Map.tileSize, Map.tileSize)
    }
}



class Map{
    
    static mapWidth;
    static mapHeight;

    //Size of the grid in pixels
    static tileSize;

    static activeTile;
    static floorTiles;

    static pathGrid = [];

    //We call this once at the start of the game to generate the map
    //We put other generation methods in here
    static generateMap(_tileSize, _width, _height){

        Map.tileSize = _tileSize;
        Map.mapWidth = _width/Map.tileSize;
        Map.mapHeight = _height/Map.tileSize;

        console.log(Map.tileSize + " " + Map.mapWidth + " " + Map.mapHeight )
        
        //Map._generateFloorTiles();  
        Map._generateAndyGrid();
    }

    //We call this to return a Tile or  TODO > Tile's
    //TODO: Add swap if multiple tiles?
    static getTileAtWorldPosition(_x, _y){

        //Magic? :eyes: - grabs the tile from the 2d array 
        //TODO: Add some security checks maybe.. 
        console.log("FLOOR TILES")
        console.log(Map.floorTiles);
        console.log(_x, " ", _y)
        let tile = Map.floorTiles[floor(_y / Map.tileSize)][floor( _x / Map.tileSize)];

        return tile;
    }

    //We call this when we want to re/generate the randomness of the floor tiles
    static _generateFloorTiles(){

        //Reset the arrays
        Map.floorTiles = new Array();

        //Generate an 2D Array
        for(let y = 0; y < Map.mapHeight; y++){
            Map.floorTiles[y] = new Array(Map.mapHeight);
            //console.log("Y", y)
            for (let x = 0; x < Map.mapWidth; x++) {
                //Map.floorTiles[y][x] = 'Empty';
                //console.log("X", x)

                let rand = random(0,1)
                //new PathingPoint(Map.floorTiles, x, y, rand);
            }
        }

            //Map.floorTiles.splice(16, Map.floorTiles.length);
        console.log(Map.floorTiles.length);
    }

    static _generateAndyGrid(){

        Map.pathGrid = new Array();
        
        for (let y = 0; y < Map.mapHeight; y++) {
            Map.pathGrid.push([]);
            for (let x = 0; x < Map.mapWidth; x++) {
                //let r = Math.floor(Math.random() * 3);
                let rand = random(0,1)
                    Map.pathGrid[y].push(new PathingPoint(Map.pathGrid, x, y, rand));
            }
        }

        Map.floorTiles =  Map.pathGrid;
        console.log("ANDY");
        console.log(Map.pathGrid);
    }

}