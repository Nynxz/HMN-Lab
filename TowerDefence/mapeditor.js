class MapEditor{

    static tileToPlace;
    
    static itemToPlace;


    static refresh(){

        if(Map.activeTile.length > 0){
            Map.activeTile.forEach(tile =>{
                tile.markActive();
            })
        }
        
        if(mouseWentDown(RIGHT) && MapEditor.tileToPlace && !keyIsDown(17)){
            let tile = Map.getTileAtWorldPosition(mouseX, mouseY);
            if(tile){
                let x = tile.pos.x;
                let y = tile.pos.y;
                MapEditor.tileToPlace.pos = {x: tile.pos.x, y: tile.pos.y};
                MapEditor.tileToPlace.node = MapEditor.itemToPlace;
              
                let newTile = new PathingPoint(Map.floorTiles, MapEditor.tileToPlace);
                newTile.getChildrenNodes();
                Map.floorTiles[y][x] = newTile;
            }
        }
    }


    static createButtons(){
        
        let WallButton = new MenuButton(Images.MapEditor.WallButton, 1, width - 100, 400);
        WallButton.sprite.onMousePressed = function(){
            Map.activeTile = [];
            MapEditor.tileToPlace = new RawTile(RawTile.Type.Wall);
            console.log(MapEditor.tileToPlace);
        }
        WallButton.sprite.addToGroup(LayerManager.Layers.PlayerCharactersGroup);
        let TreeButton = new MenuButton(Images.MapEditor.Tree1Button, 1, width - 100, 500);
        TreeButton.sprite.onMousePressed = function(){
            Map.activeTile = [];
            if(MapEditor.itemToPlace != null){
                console.log("OFF")
                MapEditor.itemToPlace = null
            } else {
                MapEditor.itemToPlace = new RawTile(RawTile.Type.Tree);
                console.log(MapEditor.tileToPlace);
            }
        }
        TreeButton.sprite.addToGroup(LayerManager.Layers.PlayerCharactersGroup);
        let BlankButton = new MenuButton(Images.MapEditor.BlankButton, 1, width - 100, 600);
        BlankButton.sprite.onMousePressed = function(){
            Map.activeTile = [];
            MapEditor.tileToPlace = new RawTile(RawTile.Type.Grass);
            console.log(MapEditor.tileToPlace);
        }
        BlankButton.sprite.addToGroup(LayerManager.Layers.PlayerCharactersGroup);

        let mapInputs = createInput('');
        mapInputs.position(width - 150, height - 50);


        new DebugButton('Export Map', width - 250, height - 25, () => {

            let map = []
            console.log(Map.floorTiles);
            Map.floorTiles.forEach((col, y) => {
                map.push([]);
                col.forEach(tile =>{
                    let temp = tile;
                    delete temp.id;
                    delete temp.Path;
                    delete temp.debugActive;
                    delete temp.parentNode;
                    if(temp.tileToPlace.node){
                        delete temp.tileToPlace.node.children;

                    }
                    delete temp.arrayToStore;
                    if(temp.node){
                        delete temp.node.children;
                    }
                    //delete temp.image;
                    map[y].push(temp);
                })
            })
            console.log(map);
            saveJSON(map, mapInputs.value(), true);
        });
        
        new DebugButton('Load Map', width - 250, height - 50, () => {
            loadJSON('/TowerDefence/maps/' + mapInputs.value() + '.json', (map) => {
                
                Map.pathGrid = new Array();
        
                for (let y = 0; y < Map.mapHeight; y++) {
                    Map.pathGrid.push([]);
                    for (let x = 0; x < Map.mapWidth; x++) {
                            Map.pathGrid[y].push(new PathingPoint(Map.pathGrid, map[y][x]));
                    }
                }
                        
                //Optimisation TODO, check in above loop for a node that needs children, if node, push to an array
                //loop through array of known nodes that require children
                for (let y = 0; y < Map.mapHeight; y++) {
                    for (let x = 0; x < Map.mapWidth; x++) {
                        Map.pathGrid[y][x].getChildrenNodes();         
                    }
                }
                
        
                Map.floorTiles =  Map.pathGrid;
            });

            //Map.pathGrid.forEach(tile => tile.getChildrenNodes());

        });
    }
}