
//p5.disableFriendlyErrors = true; // disables FES "FRIENDLY ERROR SYSTEM"
//Disable Default Right Click, Bypass with Shift RightCick, why we do this? because right click is cool
document.addEventListener('contextmenu', event => event.preventDefault()); 

function preload() {
	
	//We load all our assets
	Images.loadAllImages();

}

function setup() {

	frameRate(60);
	noSmooth();

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

	//Refresh the Controls
	Controls.refresh();

	//Depending on the Current Scene
	switch(SceneManager.CurrentScene){

		//Main Menu Loop
		case SceneManager.Scenes.MainMenu:
			//Placeholders
			background("blue");

			drawSprites();
		
		break;

		//Options Menu Loop
		case SceneManager.Scenes.OptionsMenu:
			//Placeholders
			background("grey");

			drawSprites();

			Menu.drawOptionsMenu();

		break;

		//Credits Menu Loop
		case SceneManager.Scenes.CreditMenu:
			//Placeholders
			background("purple");

			drawSprites();

		break;

		//In Game Loop
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

		break;

		//Map Editor Loop
		case SceneManager.Scenes.MapEditor:
			
			background('black');
			LayerManager.clearLayers();
			GameManager.refreshGame();
			MapEditor.refresh();
			LayerManager.drawActiveLayers();
			drawSprites();
		break;

		default:
			//You fucked something up if youre seeing this in console.
			console.log("No Matching Scenes");
	}
	
}
