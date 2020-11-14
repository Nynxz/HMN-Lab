//We use this to store Images and Sound cuz we dont care about names tbh
class Images{

    static Player = {SpriteSheets: { Walking :{ }}};
    static Zombies = {Regular : {}};
    static Effects = {};
    static Interactables = {Debug : {}};
    static Map = {Ground: {}};
    static Menu = {};
    static WallDebug = {};
    static MapEditor = {};
    static PlayerSelected = {};
    static Shop = {};
    static Weapons = {Bullets : {}};
    static SoundEffects= {};

    static Sound = {Shooting: {}, Work: {}, Level : {}, Effects: {}, UI: {}}

    static loadAllImages(){
        
        Images._loadDebugAssets();

        Images._loadEffects();

        Images._loadMenuAssets();

        Images._loadMapAssets();
        
        Images._loadPlayerSelectedImage();
        
        Images._loadShopAssets();

        Images._loadSoundEffects();
    }

    static _loadSoundEffects(){
        //Import Sound
        Images.Sound.Shooting.soundMmagnumPistol22Shot = loadSound("/TowerDefence/assets/sound/427594__michorvath__22-magnum-pistol-shot.mp3");
        Images.Sound.Shooting.soundGunshot9mm = loadSound("/TowerDefence/assets/sound/244138__mnslugger20__9mm-gunshot.mp3");
        Images.Sound.Shooting.soundGunPumpAction = loadSound("/TowerDefence/assets/sound/12-Gauge-Pump-Action-Shotgun-Close-Gunshot-A-www.fesliyanstudios.com.mp3");

        Images.Sound.Work.soundMining = loadSound("/TowerDefence/assets/sound/240801__ryanconway__pickaxe-mining-stone.mp3");
        Images.Sound.Work.soundSmithHammer = loadSound("/TowerDefence/assets/sound/365193__cylon8472__smith-hammer2.mp3");
        Images.Sound.Work.soundChoppingWood = loadSound("/TowerDefence/assets/sound/419928__14fpanskasilovsky-petr__chopping-wood.mp3");
        Images.Sound.Work.soundChop = loadSound("/TowerDefence/assets/sound/23700__hazure__chop.mp3");
        Images.Sound.Work.soundBreakingTree = loadSound("/TowerDefence/assets/sound/102971__robinhood76__01954-breaking-tree.mp3");

        Images.Sound.Level.soundOwl = loadSound("/TowerDefence/assets/sound/25945__inchadney__owl.mp3");
        Images.Sound.Level.soundOwl_1 = loadSound("/TowerDefence/assets/sound/25945__inchadney__owl_1.mp3");
        Images.Sound.Level.soundOwl_2 = loadSound("/TowerDefence/assets/sound/25945__inchadney__owl_2.mp3");

        Images.Sound.Effects.soundFire1 = loadSound("/TowerDefence/assets/sound/fire2.mp3");
        Images.Sound.Effects.soundFire2 = loadSound("/TowerDefence/assets/sound/fire2b.mp3");
        Images.Sound.Effects.soundFire3 = loadSound("/TowerDefence/assets/sound/fire3.mp3");
        Images.Sound.Effects.soundFire4 = loadSound("/TowerDefence/assets/sound/fire7s.mp3");

        Images.Sound.UI.soundClick = loadSound("/TowerDefence/assets/sound/487452__ranner__click.mp3");

/*
to play each sound
        soundMmagnumMpistol22-shot.play();
        soundGunshot9mm.play();
        soundGunPumpAction.play();

        soundMining.play();
        soundSmithHammer.play();
        soundChoppingWood.play();
        soundChop.play();

        soundBreakingTree.play();

        soundOwl.play();
        soundOwl_1.play();
        soundOwl_2.play();

        soundFire1.play();
        soundFire2.play();
        soundFire3.play();
        soundFire4.play();

        soundClick.play();
*/

    }

    static _loadEffects(){
        Images.Effects.Fire1 = loadSpriteSheet('/TowerDefence/assets/effects/fire1/fire1_100x.png', 100, 100, 60);
        Images.Effects.Fire2 = loadSpriteSheet('/TowerDefence/assets/effects/fire1/_46x60test.png', 46, 60, 60);
        Images.Effects.nightOverlay = loadImage('/TowerDefence/assets/effects/NightOverlay.png');
    }

    static _loadDebugAssets(){

        Images._loadDebugPlayerAnimations();
        Images._loadDebugInteractables();
        Images._loadDebugWall();
        Images._loadMapEditorAssets();
        Images._loadZombieAnimations();
        Images._loadWeaponAssets();
    }

    static _loadWeaponAssets(){
        Images.Weapons.Bullets.Basic = loadImage('/TowerDefence/assets/effects/bullet1.png');
    }

    static _loadDebugInteractables(){

        Images.Interactables.Debug.GenerateTouching = loadImage('/TowerDefence/assets/interactables/generatedebugtouching.png');
        Images.Interactables.Debug.SpendTouching = loadImage('/TowerDefence/assets/interactables/spenddebugtouching.png');

        Images.Interactables.Tree1 = loadImage('/TowerDefence/assets/interactables/tree_1.png');
        Images.Interactables.Spike1 = loadImage('/TowerDefence/assets/Tiles/Spikes/spike1.png');
        Images.Interactables.Barricade = loadImage('/TowerDefence/assets/Tiles/woodenBarricade.png');
        Images.Interactables.Rock = loadImage('/TowerDefence/assets/Tiles/Rock_Pile.png');
        Images.Interactables.Furnace = loadImage('/TowerDefence/assets/interactables/furnace.png');

        Images.Interactables.Turret1 = loadImage('/TowerDefence/assets/interactables/turret1.png');
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

    static _loadZombieAnimations(){
        Images.Zombies.Regular.Up = loadSpriteSheet('/TowerDefence/assets/zombie/zombieup.png', 48, 64, 3);
        Images.Zombies.Regular.Down = loadSpriteSheet('/TowerDefence/assets/zombie/zombiedown.png', 48, 64, 3);
        Images.Zombies.Regular.Left = loadSpriteSheet('/TowerDefence/assets/zombie/zombieleft.png', 48, 64, 3);
        Images.Zombies.Regular.Right = loadSpriteSheet('/TowerDefence/assets/zombie/zombieright.png', 48, 64, 3);

        //Load A single Frame As Animation - TODO: Idle Animation
        Images.Zombies.Regular.Stand = loadAnimation(new SpriteSheet('/TowerDefence/assets/zombie/zombiedown.png',
        [{'name': 'stand', 'frame' :{'x': 1, 'y' : 0, 'width' : 48, 'height' : 64}}]));
    }
    static _loadMapAssets(){
        //32x32px
        Images.Map.GrassRegular = loadImage("/TowerDefence/assets/Sprites/Grass02.png");
        Images.Map.GrassFlower = loadImage("/TowerDefence/assets/Sprites/Grass.png");

        Images.Map.Wall = loadImage("/TowerDefence/assets/Sprites/Wall.png");
        Images.Map.FogOfWar = loadImage("/TowerDefence/assets/fog_of_war.png");
    }



    static _loadMenuAssets(){
        Images.Menu.StartButton = loadImage('/TowerDefence/assets/menu/buttons/startGame.png');
        Images.Menu.OptionsButton = loadImage('/TowerDefence/assets/menu/buttons/optionsButton.png');
        Images.Menu.EditorButton = loadImage('/TowerDefence/assets/menu/buttons/editorButton.png');
        
        Images.Menu.LavaStartButton = loadImage('/TowerDefence/assets/menu/buttons/greenLavaStartButton.png');
        Images.Menu.MenuBackground = loadImage('/TowerDefence/assets/menubackgroundgrass.png');
    }

    static _loadDebugWall(){
        Images.WallDebug.WallDebugImg = loadImage('/TowerDefence/assets/debug/DebugWalls.png');
        Images.WallDebug.Lava = loadImage("/TowerDefence/assets/debug/debugLava.png");

    }

    static _loadMapEditorAssets(){
        Images.MapEditor.BlankButton = loadImage('/TowerDefence/assets/MapEditor/basePaintButton.png');
        Images.MapEditor.WallButton = loadImage('/TowerDefence/assets/MapEditor/WallPaintButton.png');
        Images.MapEditor.Tree1Button = loadImage('/TowerDefence/assets/MapEditor/TreePaintButton.png');
        Images.MapEditor.SpikeButton = loadImage('/TowerDefence/assets/MapEditor/SpikePaintButton.png');
        Images.MapEditor.RockButton = loadImage('/TowerDefence/assets/MapEditor/RockPaintButton.png');
        Images.MapEditor.FurnaceButton = loadImage('/TowerDefence/assets/MapEditor/FurnacePaintButton.png');
    }

    static _loadPlayerSelectedImage() {
        Images.PlayerSelected.PlayerSelectedImage = loadImage('/TowerDefence/assets/Sprites/playerSelectShadow.png')
    }

    static _loadShopAssets(){
        Images.Shop.ShopTabLeft = loadImage('/TowerDefence/assets/shop/shoptableft.png');
        Images.Shop.ShopButtonBarricade = loadImage('/TowerDefence/assets/shop/barricadeButton.png');
        Images.Shop.ShopButtonSpikes = loadImage('/TowerDefence/assets/shop/spikeButton.png');
        Images.Shop.ShopButtonTurret1 = loadImage('/TowerDefence/assets/shop/turret1Button.png');
    }
}