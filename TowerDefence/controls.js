class Controls{

    //https://keycode.info/
    static KeyBinds = {
        Pause: 27 //ESC
    }

    static refresh(){
        let s = SceneManager.CurrentScene;

        //Pause
        if(keyWentDown(Controls.KeyBinds.Pause)){
            if(s == SceneManager.Scenes.InGame || s == SceneManager.Scenes.MapEditor){
                Menu.createPauseMenu();
            }
        }

        //Click
        if(mouseWentDown(LEFT) && keyDown(17)){
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
            ZombieSpawner.spawnWave()
            //GameManager.allZombies.push(new Zombie("Zombie", 100, mouseX, mouseY));
        }
    }



    static getMouseClick(){
        
    }




}