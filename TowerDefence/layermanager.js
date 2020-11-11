class LayerManager{
    static Layers = {};

    static initLayers(){

        LayerManager.Layers.GroundFloor = createGraphics(1440, 816);
        LayerManager.Layers.GroundFloor.isEnabled = true;

        LayerManager.Layers.GroundFloorExtras = createGraphics(1440, 816);
        LayerManager.Layers.GroundFloorExtras.isEnabled = true;

        LayerManager.Layers.GroundFloorInteractables = createGraphics(1440, 816);
        LayerManager.Layers.GroundFloorInteractables.isEnabled = true;
        
        LayerManager.Layers.HouseFloor
        LayerManager.Layers.HouseWalls
        LayerManager.Layers.HouseInteractables
        LayerManager.Layers.EnemySprites
        
        LayerManager.Layers.PlayerCharactersGroup = new Group();
        LayerManager.Layers.PlayerCharactersGroup.isEnabled = true;

        LayerManager.Layers.BulletsGroup = new Group();
        LayerManager.Layers.BulletsGroup.isEnabled = true;

        LayerManager.Layers.PlayerTools

        LayerManager.Layers.Effects = createGraphics(1440, 816);
        LayerManager.Layers.Effects.isEnabled = true;

        LayerManager.Layers.PauseMenuGroup = new Group();

        LayerManager.Layers.FogOfWar= createGraphics(1440, 816);
        LayerManager.Layers.FogOfWar.isEnabled = true;

        LayerManager.Layers.HUDGroup = new Group();
        LayerManager.Layers.HUDGroup.isEnabled = true;

        LayerManager.Layers.Master = createGraphics(1440, 816);
        LayerManager.Layers.Master.isEnabled = true;
        

    }

    static drawActiveLayers(){

        if(LayerManager.Layers.GroundFloor.isEnabled){
            image(LayerManager.Layers.GroundFloor, 0, 0);
        }
                
        if(LayerManager.Layers.GroundFloorExtras.isEnabled){
            image(LayerManager.Layers.GroundFloorExtras, 0, 0);
        }

        //LayerManager.Layers.HouseFloor
        //LayerManager.Layers.HouseWalls
        //LayerManager.Layers.HouseInteractables
        //LayerManager.Layers.EnemySprites

        //LayerManager.Layers.PlayerTools



        if(LayerManager.Layers.GroundFloorInteractables.isEnabled){
            image(LayerManager.Layers.GroundFloorInteractables, 0, 0);
        }

        if(LayerManager.Layers.PlayerCharactersGroup.isEnabled){
            LayerManager.Layers.PlayerCharactersGroup.draw();
        }

        if(LayerManager.Layers.Effects.isEnabled){
            image(LayerManager.Layers.Effects, 0, 0);
        }
                
        if(LayerManager.Layers.BulletsGroup.isEnabled){
            LayerManager.Layers.BulletsGroup.draw();
        }

        if(LayerManager.Layers.FogOfWar.isEnabled){
            image(LayerManager.Layers.FogOfWar, 0, 0);
        }

        if(LayerManager.Layers.HUDGroup.isEnabled){
            LayerManager.Layers.HUDGroup.draw();
        }
        

        if(LayerManager.Layers.Master.isEnabled){
            image(LayerManager.Layers.Master, 0, 0);
        }

        LayerManager.Layers.PauseMenuGroup.draw();
        
        //drawSprites();

    }

    static clearLayers(){
        
        LayerManager.Layers.Effects.clear();  
        LayerManager.Layers.GroundFloorExtras.clear();
    }
    //#endregion
}