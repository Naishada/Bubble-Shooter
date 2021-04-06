//creating variables
var background1,background2;
var bird,bird1;
var start,start1;
var bubble1;
var bubble;
var redball,greenball,yellowball,whiteball;
var gameState = "home";
var move;
var shooter;
//creating groups
var shooterGroup;
var bubbleGroup;
var redGroup;
var greenGroup;
var yellowGroup;
var whiteGroup;
var destroyGroup;
var edges;

function preload(){
  background2 = loadImage("background.jpg");
  bird1 = loadImage("bird.jpg");
  start1 = loadImage("start.png");
  redball = loadImage("redball.png");
  greenball = loadImage("greenball.png");
  yellowball = loadImage("yellowball.png");
  whiteball = loadImage("whiteball.png");

}

function setup(){
  createCanvas(500,500);
  //creating groups

  shooterGroup = createGroup();
  bubbleGroup = createGroup();
  redGroup = createGroup();
  greenGroup = createGroup();
  yellowGroup = createGroup();
  whiteGroup = createGroup();
  destroyGroup = createGroup();
  
  //creating background
  background1 = createSprite(200,200,20,20);
  background1.addImage("bg",background2);
  background1.scale = 0.9;

  start = createSprite(250,250,20,20);
  start.addImage("st",start1);
  start.scale = 0.15;

  bird = createSprite(50,100,20,20);
  bird .addImage("bird.jpg_1",bird1);
  bird.scale = 0.2;

  move = createSprite(200,200,20,20);
  edges = createEdgeSprites();
} 

function draw(){
  background("pink");
  drawSprites();
  fill("red");
  if(gameState === "home"){
    background1.visible = true;
    start.visible = true;
    bird.visible = true;
    text("Hello friends my name is Kara",70,100);
    if(mousePressedOver(start)){
      gameState = "story"
    }

  }
  if(gameState === "story"){
    bird.visible = true;
    background1.visible = true;
    start.visible = false;
    text("In this game your goal is to blast the bubbles in the given moves",200,200);
    if(mousePressedOver(move)){
      gameState = "play";
      playsetup();
    }
  }

  if(gameState === "play"){
    //background("blue");
    shooter.pointTo(World.mouseX,World.mouseY);
    
    if(mouseWentUp("leftButton")){
      shoot();
    }
    if(mouseWentDown("leftButton")){
       bubble1.setSpeedAndDirection(5,shooter.rotation);
    }
    shooterGroup.overlap(bubbleGroup,popBubble);
    shooterGroup.bounceOff(edges);
    
    destroyGroup.destroyEach();
    drawSprites();
  
  }
}
  //project
  //switch case for the bubbles usin thr reference of trex catus plats 
function playsetup(){

  shooter = createSprite(200,380,50,20);
  //shooter.setAnimation( "unnamed.png_1");
  shooter.scale = 0.5;

  for(var i = 20;i<400;i = i+30){
  var bubble = createSprite(i,20,10,10);
      //generate random bubbles
      randbubble(bubble);
      bubbleGroup.add(bubble);
  }
  for(var i = 50;i<360;i = i+30){
  var bubble = createSprite(i,52,10,10);
      //generate random bubbles
      randbubble(bubble);
      bubbleGroup.add(bubble);
  }
  for(var i = 70;i<320;i = i+30){
  var bubble = createSprite(i,82,10,10);
      //generate random bubbles
      randbubble(bubble);
      bubbleGroup.add(bubble);
  }
  for(var i = 90;i<280;i = i+30){
  var bubble = createSprite(i,112,10,10);
      //generate random bubbles
      randbubble(bubble);
      bubbleGroup.add(bubble);
  }
  for(var i = 120;i<250;i = i+30){
  var bubble = createSprite(i,142,10,10);
    
      //generate random bubbles
      randbubble(bubble);
      bubbleGroup.add(bubble);
  }
  for(var i = 150;i<220;i = i+30){
  var bubble = createSprite(i,172,10,10);
    
      //generate random bubbles
      randbubble(bubble);
      bubbleGroup.add(bubble);
  }
  for(var i = 180;i<190;i = i+30){
  var bubble = createSprite(i,202,10,10);
    
      //generate random bubbles
      randbubble(bubble);
    bubbleGroup.add(bubble);
  }
  shoot();
}

function shoot(){
  bubble1 = createSprite(shooter.x,shooter.y,20,20);
  randbubble(bubble1);
  bubble1.debug = true;
  shooterGroup.add(bubble1);
}

function popBubble(sprite1,sprite2){
  console.log("POP")
  if(sprite1.shapeColor === sprite2.shapeColor){
    console.log("MATCH")
    sprite1.destroy();
    check(sprite2);
  }
  else{
    sprite1.setVelocity(0,0);
    shooterGroup.remove(sprite1);
    bubbleGroup.add(sprite1);
  }
 // sprite2.destroy();
  
}
function randbubble(bubble){
  var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: bubble.addImage("croquetball_1",redball);
              bubble.shapeColor = "red";
              redGroup.add(bubble);
              break;
      case 2: bubble.addImage("tennisball_1",yellowball);
              bubble.shapeColor = "yellow";
              yellowGroup.add(bubble);
              break;
      case 3: bubble.addImage("golfball_1",whiteball);
              bubble.shapeColor = "white";
              whiteGroup.add(bubble);
              break;
      case 4: bubble.addImage("bowlingball_1",greenball);
              bubble.shapeColor = "green";
              greenGroup.add(bubble);
              break;
    }
    bubble.setCollider("circle",0,0,16);
}

// red ball - redGroup - redball overlaps redGroup
function check(sprite){
  var checkGroup;
  switch(sprite.shapeColor){
    case "red": checkGroup = redGroup;
    break;
    case "yellow":checkGroup = yellowGroup;
    break;
    case "green":checkGroup = greenGroup;
    break;
    case "white":checkGroup = whiteGroup;
    break;
  }
  checkGroup.remove(sprite);
  destroyGroup.add(sprite);
  checkGroup.overlap(sprite,check);
}