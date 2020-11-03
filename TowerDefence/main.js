function preload() {

	  Images.loadAllImages();
	  grassDebugSpriteImg = loadImage ("/TowerDefence/assets/debug/GrassDebug.png");
	  bushDebugSpriteImg = loadImage ("/TowerDefence/assets/debug/BushDebug.png");

}

class GrassDebugSprite {
    constructor(_length,_width) {
        this.length = _length;
		this.width = _width;
    }
}

let debugBackground = new GrassDebugSprite(50,50); 
let debugBush = new GrassDebugSprite(50,50); 

function setup() {

	createCanvas(1000, 1000);
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
			drawSprites();

			GameManager.refresh();

		break;

		default:
			console.log("No Matching Scenes");
	}

	
}
