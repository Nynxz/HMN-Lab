function preload() {

	  Images.loadAllImages();
	  grassDebugSpriteImg = loadImage ("/TowerDefence/assets/debug/GrassDebug.png");

}

class GrassDebugSprite {
    constructor(_length,_width) {
        this.length = _length;
		this.width = _width;
    }
}

let debugBackground = new GrassDebugSprite(50,50); 

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
