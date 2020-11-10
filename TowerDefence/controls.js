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
                console.log(tile)
                if(tile && !Map.activeTile.includes(tile)){//If we have a tile
                    Map.activeTile = new Array();
                    Map.activeTile.push(tile);
                    if(tile.parentNode){
                        Map.activeTile.push(tile.parentNode);
                    }
                } else {
                    Map.activeTile = new Array();
                }
            }
        }

        if(mouseWentDown(RIGHT)){
            let s = SceneManager.CurrentScene;
            if(s == SceneManager.Scenes.InGame || s == SceneManager.Scenes.MapEditor){
                if(GameManager.activePlayer){
                    let tile = Map.getTileAtWorldPosition(mouseX, mouseY);
                    if(tile.node){
                        console.log("SETTING TASK to PARENT");
                        GameManager.activePlayer.currentTask = tile;
                    } else if(tile.parentNode){
                        console.log("SETTING TASK to PARENT from CHILD");
                        GameManager.activePlayer.currentTask = tile.parentNode;
                    }
                    GameManager.activePlayer.WWfindPath(mouseX, mouseY);
                }
            }
        }
        //Control + Click


        //Debug //Space
        if(keyWentDown(32)){
            GameManager.allZombies.push(new Zombie("Zombie", 100, mouseX, mouseY));
        }
    }



    static getMouseClick(){
        
    }




}