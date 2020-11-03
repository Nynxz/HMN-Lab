function preload() {

  	Images.loadAllImages();

}

function setup() {

	createCanvas(1000, 1000);
	background("green");
	
	SceneManager.debugNext()
	
}

function draw() {

	switch(SceneManager.CurrentScene){

		case SceneManager.Scenes.MainMenu:
			background("blue");
			drawSprites();	
		break;

		case SceneManager.Scenes.InGame:

			background("green");

			drawSprites();
		
			GameManager.refresh();

		break;
	}
}
