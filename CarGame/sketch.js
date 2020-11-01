let carSpriteImage;
let carSprite;
function setup() {
  // put setup code here
  createCanvas(1000, 1000);
  carSprite=createSprite();
  carSprite.addImage(carSpriteImage);
}

function preload() {
  
  carSpriteImage=loadImage("/CarGame/Assets/yellow_car.png");
}

function draw() {
  // put drawing code here

  print("WTF IS THIS");
  console.log("THIS IS BETTER, PLS NO PRINT");
  //Have u set up a github repo
  //want me to do it , whats ur accounts
  drawSprites();
}
//iM SETTING UP GITHUB REPO, are we doing car game test
//nah nah dw about that
//this is fun
