p5.disableFriendlyErrors = true; // disables FES

function preload() {

	Images.loadAllImages();
	grassDebugSpriteImg = loadImage ("/TowerDefence/assets/debug/GrassDebug.png");
	bushDebugSpriteImg = loadImage ("/TowerDefence/assets/debug/BushDebug.png");
	//wallDebugSpriteImg = loadImage ('/TowerDefence/assets/debug/')

}

class GrassDebugSprite {
    constructor(_length,_width) {
        this.length = _length;
		this.width = _width;
    }
}

//WTF IS THIS DOING GUYS
let debugBackground = new GrassDebugSprite(64,64); 
let debugBush = new GrassDebugSprite(64,64); 

function setup() {
	//frameRate(30);
	//noSmooth();

	//Scale Tiles based on screen size, or screen size based on amount of tiles :eyes:
	createCanvas(1440, 816);
	background("green");
	
	//SceneManager.debugNext()
	Menu.createMainMenu();
}

function draw() {

	switch(SceneManager.CurrentScene){

		case SceneManager.Scenes.MainMenu:

			background("blue");

			drawSprites();

		break;

		case SceneManager.Scenes.OptionsMenu:

			background("grey");

			drawSprites();

			Menu.drawOptionsMenu();

		break;

		case SceneManager.Scenes.CreditMenu:

			background("purple");

			drawSprites();

		break;

		case SceneManager.Scenes.InGame:

			background("green");
			Map.drawFloorTiles()
			drawSprites();

			GameManager.refresh();

			DebugHelpers.drawFPS();
			GameManager.SpriteGroupPaused.draw();

		break;

		default:
			console.log("No Matching Scenes");
	}

	
}
