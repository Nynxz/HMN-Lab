class MapEditor{

    static tileToPlace;
    
    static itemToPlace;

    static mapInputs;
    static refresh(){

        if(Map.activeTile.length > 0){
            Map.activeTile.forEach(tile =>{
                tile.markActive();
            })
        }
        
        if(mouseDown(RIGHT)  && !keyIsDown(17) && MapEditor.tileToPlace){
            let tile = Map.getTileAtWorldPosition(mouseX, mouseY);
            if(tile){
                let x = tile.pos.x;
                let y = tile.pos.y;
                MapEditor.tileToPlace.pos = {x: tile.pos.x, y: tile.pos.y};
                if(MapEditor.itemToPlace)
                MapEditor.tileToPlace.node = MapEditor.itemToPlace;
              
                let newTile = new PathingPoint(Map.floorTiles, MapEditor.tileToPlace);
                newTile.getChildrenNodes();
                Map.floorTiles[y][x] = newTile;
            }

        }
    }


    static createButtons(){

        let SpikeButton = new MenuButton(Images.MapEditor.SpikeButton, 1, width - 100, 300);
        SpikeButton.sprite.onMousePressed = function(){
            Map.activeTile = [];
            if(MapEditor.itemToPlace != null){
                console.log("OFF")
                MapEditor.itemToPlace = null
            } else {
                MapEditor.itemToPlace = new RawTile(RawTile.Type.Spike);
                console.log(MapEditor.tileToPlace);
            }
        }
        SpikeButton.sprite.addToGroup(LayerManager.Layers.PlayerCharactersGroup);

        let RockButton = new MenuButton(Images.MapEditor.RockButton, 1, width - 100, 200);
        RockButton.sprite.onMousePressed = function(){
            Map.activeTile = [];
            if(MapEditor.itemToPlace != null){
                console.log("OFF")
                MapEditor.itemToPlace = null
            } else {
                MapEditor.itemToPlace = new RawTile(RawTile.Type.Rock);
                console.log(MapEditor.tileToPlace);
            }
        }
        RockButton.sprite.addToGroup(LayerManager.Layers.PlayerCharactersGroup);

        let FurnaceButton = new MenuButton(Images.MapEditor.FurnaceButton, 1, width - 100, 100);
        FurnaceButton.sprite.onMousePressed = function(){
            Map.activeTile = [];
            if(MapEditor.itemToPlace != null){
                console.log("OFF")
                MapEditor.itemToPlace = null
            } else {
                MapEditor.itemToPlace = new RawTile(RawTile.Type.Furnace);
                console.log(MapEditor.tileToPlace);
            }
        }
        FurnaceButton.sprite.addToGroup(LayerManager.Layers.PlayerCharactersGroup);

        
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


        
        let FloorButton = new MenuButton(Images.MapEditor.FloorButton, 1, width - 100, 700);
        FloorButton.sprite.onMousePressed = function(){
            Map.activeTile = [];
            MapEditor.tileToPlace = new RawTile(RawTile.Type.Floor);
            console.log(MapEditor.tileToPlace);
        }
        FloorButton.sprite.addToGroup(LayerManager.Layers.PlayerCharactersGroup);
        

    }

    static debugLoadSaveMapButtons(){

        MapEditor.mapInputs = createInput('');
        MapEditor.mapInputs.position(width - 150, height - 50);
        DebugHelpers.buttons.push(MapEditor.mapInputs);
        new DebugButton('Export Map', width - 250, height - 25, () => {
            DebugHelpers.exportMap();
        });
        
        new DebugButton('Load Map', width - 250, height - 50, () => {
            DebugHelpers.loadMap(MapEditor.mapInputs.value());
            //Map.pathGrid.forEach(tile => tile.getChildrenNodes());

        });
    }


}

