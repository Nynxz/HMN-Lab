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
            Map.activeTile = new Array();
            let s = SceneManager.CurrentScene;
            if(s == SceneManager.Scenes.InGame || s == SceneManager.Scenes.MapEditor){
                let tile = Map.getTileAtWorldPosition(mouseX, mouseY);

                if(tile){//If we have a tile
                    Map.activeTile = new Array();
                    Map.activeTile.push(tile);

                    if(tile.parentNode){
                        Map.activeTile.push(tile.parentNode);
                    }

                    tile.debugActive = true;
                } else {
                    Map.activeTile = new Array();
                }
            }
        }

        //Control + Click


        //Debug //Space
        if(keyWentDown(32)){
            GameManager.allZombies.push(new Zombie("Zombie", 100, mouseX, mouseY));
            console.log(Map.activeTile);
            //console.log(GameManager.allPlayers); 
        }
    }



    static getMouseClick(){
        
    }




}