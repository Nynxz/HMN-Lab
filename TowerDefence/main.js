p5.disableFriendlyErrors = true; // disables FES "FRIENDLY ERROR SYSTEM"
//Disable Default Right Click, Bypass with Shift RightCick
document.addEventListener('contextmenu', event => event.preventDefault()); 
function preload() {

	//We load all our assets
	Images.loadAllImages();

//#region //TODO: CLEAN
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

//#endregion


function setup() {

	//TODO: MAKE SETTING
	createCanvas(1440, 816);
	background("green");
	
	//If Our Current Scene is defaulted to MainMenu, we create it
	if(SceneManager.CurrentScene == SceneManager.Scenes.MainMenu){
		Menu.createMainMenu();
	} else {
		//Else we initalise the game "Assuming we're in Scene.InGame"
		GameManager.initGame();
	}
}

function draw() {

	switch(SceneManager.CurrentScene){

		case SceneManager.Scenes.MainMenu:
			//Placeholders
			background("blue");

			drawSprites();
		
		break;

		case SceneManager.Scenes.OptionsMenu:
			//Placeholders
			background("grey");

			drawSprites();

			Menu.drawOptionsMenu();

		break;

		case SceneManager.Scenes.CreditMenu:
			//Placeholders
			background("purple");

			drawSprites();

		break;

		case SceneManager.Scenes.InGame:
			GameManager.Layers.Effects.clear();  
			//Base Background	
			background("green");

			//We Refresh the Game Logic
			GameManager.refreshGame();

			//We Draw the Active Layers
			GameManager.drawActiveLayers();
			DebugHelpers.drawFPS();
			GameManager.debugHUD.drawActivePlayerHeader();

			GameManager.SpriteGroupPaused.draw();

		break;

		default:
			console.log("No Matching Scenes");
	}

	
}
