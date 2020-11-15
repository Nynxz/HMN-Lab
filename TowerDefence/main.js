
//p5.disableFriendlyErrors = true; // disables FES "FRIENDLY ERROR SYSTEM"
//Disable Default Right Click, Bypass with Shift RightCick, why we do this? because right click is cool
document.addEventListener('contextmenu', event => event.preventDefault()); 
let y1=0;
let y2;
function preload() {

	//We load all our assets
	Images.loadAllImages();

}

function setup() {
	
	//TODO: MAKE SETTING
	createCanvas(1440, 816);
	background("green");
	y2=height;
	
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

	//DebugHelpers.toggleButtons();
	//MapEditor.debugLoadSaveMapButtons();
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
			image(Images.Menu.MenuBackground, 0, y1, width, height+5);
			image(Images.Menu.MenuBackground, 0, y2, width, height+5);
			y1-=2;
			y2-=2;
			if(y1<-height){
				y1=height;
			}
			if(y2<-height){
				y2 = height;
			}
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
			GameManager.debugHUD.refreshHUD();
			//GameManager.SpriteGroupPaused.draw();

		break;

		//Map Editor Loop
		case SceneManager.Scenes.MapEditor:
			
			background('black');
			LayerManager.clearLayers();
			GameManager.refreshGame();
			MapEditor.refresh();
			LayerManager.drawActiveLayers();
			GameManager.debugHUD.refreshHUD();
			//drawSprites();
		break;

		default:
			//You fucked something up if youre seeing this in console.
			console.log("No Matching Scenes");
	}
	
}
