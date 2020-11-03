function preload() {

  	Images.loadAllImages();

}

function setup() {

	noSmooth();
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
