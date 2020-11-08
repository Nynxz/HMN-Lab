class Tile{

    //we use this for id's, increased every time a Tile is constructed
    static tileCount = 0;
    //TODO: MOVE THIS TO A LAYER?

    constructor(_arrayToStore, _tileToPlace){

            this.pos = _tileToPlace.pos;
            this.type = _tileToPlace.type;
            this.passable = _tileToPlace.passable
            this.image = _tileToPlace.image;
            _arrayToStore[this.pos.y][this.pos.x] = this;
            LayerManager.Layers.GroundFloor.image(this.image, (this.pos.x+1) * Map.tileSize - (Map.tileSize),  (this.pos.y+1) * Map.tileSize - (Map.tileSize), Map.tileSize, Map.tileSize);
            
            //Tile is a Node
            if(_tileToPlace.node){
                //this.node = _tileToPlace.node;
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

    //Size of the grid in pixels
    static tileSize;

    //Width in Grid Spots
    static mapWidth;
    //Height in Grid Spots
    static mapHeight;

    //Current Selected Tile
    static activeTile = false;

    //Array to Store Current Tiles
    static floorTiles = [];


    static pathGrid = [];

    //We call this once at the start of the game to generate the map
    //We put other generation methods in here
    static generateMap(_tileSize, _width, _height){

        this.tileCount = 0;
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
        if(_x < width && _y < height){
            //Magic? :eyes: - grabs the tile from the 2d array 
            //TODO: Add some security checks maybe.. 
            // console.log("FLOOR TILES")
            // console.log(Map.floorTiles);
            // console.log(_x, " ", _y)
            let tile = Map.floorTiles[floor(_y / Map.tileSize)][floor( _x / Map.tileSize)];

            return tile;
        }
    }

    //We call this when we want to re/generate the randomness of the floor tiles
    //UNUSED
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

        Map.floorTiles = new Array();
        
        for (let _y = 0; _y < Map.mapHeight; _y++) {
            Map.floorTiles.push([]);
            for (let _x = 0; _x < Map.mapWidth; _x++) {
                //let r = Math.floor(Math.random() * 3);
                let rand = random(0,1)
                let tileToPlace= new RawTile(RawTile.Type.Grass);
                tileToPlace.pos = {x: _x, y: _y}
                Map.floorTiles[_y].push(new PathingPoint(Map.floorTiles, tileToPlace));
            }
        }

        //Map.floorTiles =  Map.pathGrid;
        console.log("ANDY");
        console.log(Map.floorTiles);
    }

}