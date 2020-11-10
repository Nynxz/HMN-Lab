class MapEditor{

    static tileToPlace;
    
    static itemToPlace;


    static refresh(){

        if(Map.activeTile.length > 0){
            Map.activeTile.forEach(tile =>{
                tile.markActive();
            })
        }
        
        if(mouseDown(RIGHT)  && !keyIsDown(17)){
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
            DebugHelpers.ExportMap();
        });
        

        new DebugButton('Load Map', width - 250, height - 50, () => {
            DebugHelpers.loadMap();

            //Map.pathGrid.forEach(tile => tile.getChildrenNodes());

        });
    }


}