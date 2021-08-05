var path, girl, milk, can, water, cat;
var pathImg, girlImg, milkImg, canImg, waterImg, catImg, hero;
var plastic = 0;
var wordsImg;
var milkG, canG, waterG;

//Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {
  pathImg = loadImage("Road.jpg");
  girlImg = loadAnimation("girl1.png", "girl2.png");
  milkImg = loadImage("milk.png");
  canImg = loadImage("can.png");
  waterImg = loadImage("water.png");
  endImg = loadImage("superhero.png");
  wordsImg = loadImage("words.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Moving background
  path = createSprite(width / 2, 200);
  path.addImage(pathImg);
  path.scale = 1.2;
  path.velocityY = 5;

  //creating girl running
  girl = createSprite(width, height - 30, 20, 20);
  girl.addAnimation("GirlRunning", girlImg);
  girl.scale = 0.5;

  milkG = new Group();
  canG = new Group();
  waterG = new Group();
}

function draw() {
  if (gameState === PLAY) {
    background(0);
    camera.position.x = displayWidth/2
    girl.x = World.mouseX;

    edges = createEdgeSprites();
    girl.collide(edges);

    //code to reset the background
    if (path.y > 600) {
      path.y = height / 2;
    }
    //console.log(frameCount)
    createMilk();
    createCan();
    createWater();

    if (milkG.isTouching(girl)) {
      milkG.destroyEach();
      plastic = plastic + 1;
    } else if (canG.isTouching(girl)) {
      canG.destroyEach();
      plastic = plastic + 1;
    } else if (waterG.isTouching(girl)) {
      waterG.destroyEach();
      plastic = plastic + 1;
    } else {
      if (plastic >= 10) {
        gameState = END;

        hero = createSprite(width / 2, 200);
        hero.addImage(endImg);
        hero.x = width / 2;
        hero.y = height / 2;

        words = createSprite(width / 2, 100);
        words.addImage(wordsImg);
        words.x = width / 2;
        words.y = 100;

        girl.destroy();
        milkG.destroyEach();
        canG.destroyEach();
        waterG.destroyEach();

        milkG.setVelocityYEach(0);
        canG.setVelocityYEach(0);
        waterG.setVelocityYEach(0);
      }
    }
    console.log(frameCount);

    drawSprites();
    textSize(30);
    fill(255);
    text("Score: " + plastic, width - 190, 50);
    text("Help pick up 10 pieces of litter", 20, 50);
  }
}

function createMilk() {
  if (World.frameCount % 390 == 0) {
    var milk = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    milk.addImage(milkImg);
    milk.scale = 0.3;
    milk.velocityY = 5;
    milk.lifetime = 150;
    milkG.add(milk);
  }
}

function createCan() {
  if (World.frameCount % 310 == 0) {
    var can = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    can.addImage(canImg);
    can.scale = 0.1;
    can.velocityY = 5;
    can.lifetime = 150;
    canG.add(can);
  }
}

function createWater() {
  if (World.frameCount % 230 == 0) {
    var water = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    water.addImage(waterImg);
    water.scale = 0.2;
    water.velocityY = 5;
    water.lifetime = 150;
    waterG.add(water);
  }
}
