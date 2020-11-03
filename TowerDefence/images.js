class Images{

    static Player = { SpriteSheets: { Walking :{ }}};
    static Effects = {};

    static loadAllImages(){
        
        Images._loadDebugAssets();

        Images._loadEffects();

    }

    static _loadEffects(){
        Images.Effects.Fire1 = loadSpriteSheet('/TowerDefence/assets/effects/fire1/fire1_100x.png', 100, 100, 60);
    }

    static _loadDebugAssets(){

        Images._loadDebugPlayerAnimations();

    }

    static _loadDebugPlayerAnimations(){

        Images.Player.SpriteSheets.Walking.Up = loadSpriteSheet('/TowerDefence/assets/debug/player/rpg_sprite_walk_up.png', 24, 32, 8);
        Images.Player.SpriteSheets.Walking.Down = loadSpriteSheet('/TowerDefence/assets/debug/player/rpg_sprite_walk_down.png', 24, 32, 8);
        Images.Player.SpriteSheets.Walking.Left = loadSpriteSheet('/TowerDefence/assets/debug/player/rpg_sprite_walk_left.png', 24, 32, 8);
        Images.Player.SpriteSheets.Walking.Right = loadSpriteSheet('/TowerDefence/assets/debug/player/rpg_sprite_walk_right.png', 24, 32, 8);

        //Load A single Frame As Animation - TODO: Idle Animation
        Images.Player.SpriteSheets.Stand = loadAnimation(new SpriteSheet('/TowerDefence/assets/debug/player/rpg_sprite_walk_down.png',
            [{'name': 'stand', 'frame' :{'x': 0, 'y' : 0, 'width' : 24, 'height' : 32}}]));

    }
}