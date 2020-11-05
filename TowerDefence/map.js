class Tile{

    //we use this for id's, increased every time a Tile is constructed
    static tileCount = 0;
    //TODO: MOVE THIS TO A LAYER?
    static floorTiles = [];
    static activeTile;

    constructor(_rand, _x, _y, _size){
        //Assign an id to a tile
        this.id = Tile.tileCount++;
        
        //TODO: MOVE TO FUNCTION?
        if(_rand > .2){
            this.type = 'grass';
            GameManager.Layers.GroundFloor.image(Images.Map.GrassRegular, (_x+1) * Map.tileSize - (Map.tileSize),  (_y+1) * Map.tileSize - (Map.tileSize), Map.tileSize, Map.tileSize);
            this.passable = true;
        } else {
            GameManager.Layers.GroundFloor.image(Images.Map.GrassFlower, (_x+1) * Map.tileSize - (Map.tileSize),  (_y+1) * Map.tileSize - (Map.tileSize), Map.tileSize, Map.tileSize);
            this.type = 'flower'
            this.passable = false;
        }

        this.pos = {x: _x, y: _y};
        
        //TODO UNHARDCODE THIS
        if(_x % 1440/16 == 0){
            Tile.floorTiles.push([]);
        }
        Tile.floorTiles[_y].push(this);

    }

    //We use this to mark the selected squares as active
    markActive() {
        GameManager.Layers.Effects.rectMode(CORNER)
        GameManager.Layers.Effects.noFill();
        GameManager.Layers.Effects.stroke('red');
        GameManager.Layers.Effects.strokeWeight(1);
        GameManager.Layers.Effects.rect(this.pos.x * Map.tileSize, this.pos.y * Map.tileSize, Map.tileSize);
    }
}



class Map{
    //TODO: UNHARDCODE THIS
    static mapWidth =  1440/16;
    static mapHeight = 816/16;

    //Size of the grid in pixels
    static tileSize = 16;

    //We call this once at the start of the game to generate the map
    //We put other generation methods in here
    static generateMap(){
        Map._generateFloorTiles();  
    }

    //We call this to return a Tile or  TODO > Tile's
    //TODO: Add swap if multiple tiles?
    static getTileAtWorldPosition(_x, _y){

        //Magic? :eyes: - grabs the tile from the 2d array 
        //TODO: Add some security checks maybe.. 
        let tile = Tile.floorTiles[floor(_y / Map.tileSize)][floor( _x / Map.tileSize)];

        //Toggle Tile on and off
        if(Tile.activeTile == tile){
            Tile.activeTile = null
        } else {
            Tile.activeTile = tile;
        }
    }

    //We call this when we want to regenerate the randomness of the floor tiles
    static _generateFloorTiles(){

        //Reset the arrays
        Tile.floorTiles = [];

        //Magic stuff
        for(let x=0; x < Map.mapWidth; x++){;
            for(let y=0; y < Map.mapHeight; y++){
                let rand = random(0,1)
                new Tile(rand, x, y);            
            }
        }
    }
}