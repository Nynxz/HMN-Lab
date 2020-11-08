class MapEditor{

    static tileToPlace;
    
    static itemToPlace;


    static refresh(){
        if(Map.activeTile){
            Map.activeTile.markActive();
        }
        
        if(mouseDown(RIGHT) && MapEditor.tileToPlace && !keyIsDown(17)){
            let tile = Map.getTileAtWorldPosition(mouseX, mouseY);
            if(tile && tile.type != MapEditor.tileToPlace.type){
                let x = tile.pos.x;
                let y = tile.pos.y;
                MapEditor.tileToPlace.pos = {x: tile.pos.x, y: tile.pos.y};
                Map.floorTiles[y][x] = new PathingPoint(Map.floorTiles, MapEditor.tileToPlace);
            }
        }
    }


    static createButtons(){
        
        let WallButton = new MenuButton(Images.MapEditor.WallButton, 1, width - 100, 400);
        WallButton.sprite.onMousePressed = function(){
            Map.activeTile = null;
            MapEditor.tileToPlace = new RawTile(RawTile.Type.Wall);
            console.log(MapEditor.tileToPlace);
        }

        let TreeButton = new MenuButton(Images.MapEditor.Tree1Button, 1, width - 100, 500);
        TreeButton.sprite.onMousePressed = function(){
            Map.activeTile = null;
            MapEditor.tileToPlace = new RawTile(RawTile.Type.Tree);
            console.log(MapEditor.tileToPlace);
        }
        
        let BlankButton = new MenuButton(Images.MapEditor.BlankButton, 1, width - 100, 600);
        BlankButton.sprite.onMousePressed = function(){
            Map.activeTile = null;
            MapEditor.tileToPlace = new RawTile(RawTile.Type.Grass);
            console.log(MapEditor.tileToPlace);
        }

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
                    delete temp.image;
                    map[y].push(temp);
                })
            })
            saveJSON(map, mapInputs.value());
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
        
                Map.floorTiles =  Map.pathGrid;
            });
        });
    }
}