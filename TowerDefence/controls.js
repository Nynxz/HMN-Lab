class Controls{

    //https://keycode.info/
    static KeyBinds = {
        Pause: 27 //ESC
    }

    static refresh(){
        

        //Pause
        if(keyWentDown(Controls.KeyBinds.Pause)){
            let s = SceneManager.CurrentScene;
            if(s == SceneManager.Scenes.InGame || s == SceneManager.Scenes.MapEditor){
                Menu.createPauseMenu();
            }
        }

        //Click
        if(mouseWentDown(LEFT)){
            let s = SceneManager.CurrentScene;
            if(s == SceneManager.Scenes.InGame || s == SceneManager.Scenes.MapEditor){
                let tile = Map.getTileAtWorldPosition(mouseX, mouseY);
                //Toggle Tile on and off
                if(Map.activeTile == tile){
                    Map.activeTile = null
                } else {
                    Map.activeTile = tile;
                }
                tile.debugActive = true;
            }
        }

        //Control + Click


        //Debug //Space
        if(keyWentDown(32)){
            console.log(Map.floorTiles);
            console.log(GameManager.allPlayers); 
        }
    }



    static getMouseClick(){
        
    }




}