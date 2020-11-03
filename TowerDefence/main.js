function preload() {

  	Images.loadAllImages();

}

function setup() {

	createCanvas(1000, 1000);
	background("green");

	GameManager.initializeGame();
}

function draw() {

	background("green");

	drawSprites();

	GameManager.refresh();
}
