p5.disableFriendlyErrors = true; // disables FES "FRIENDLY ERROR SYSTEM"
//Disable Default Right Click, Bypass with Shift RightCick, why we do this? because right click is cool
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

		//Make a debug toggle button for toggling buttons
		new DebugButton('Toggle Buttons', 750, height - 25, () => {
			DebugHelpers.toggleButtons();
		});
		//remove it from the buttons array so we dont remove it on toggle
		DebugHelpers.buttons.pop();
		
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

			LayerManager.clearLayers();

			//Base Background	
			background("green");
			//We Refresh the Game Logic
			GameManager.refreshGame();

			//We Draw the Active Layers
			LayerManager.drawActiveLayers();

			DebugHelpers.drawFPS();
			GameManager.debugHUD.drawActivePlayerHeader();
			GameManager.debugHUD.refreshHUD();
			//GameManager.SpriteGroupPaused.draw();

		break;

		default:
			console.log("No Matching Scenes");
	}

	
}
