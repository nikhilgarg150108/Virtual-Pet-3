var dog,sadDog,happyDog, database;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodObj, milkImg;
var gameState, readState
var garden, washroom, bedroom;

function preload(){
  sadDog=loadImage('Dog.png');
  happyDog=loadImage("happy dog.png");
  bedroom = loadImage("Bed Room.png");
  garden = loadImage("Garden.png");
  washroom = loadImage("Wash Room.png");
  milkImg = loadImage("Milk.png");
}

function setup() {
  database=firebase.database();
  createCanvas(500, 500);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  readState = database.ref('gameState');
  readState.on("value", function(data){
    gameState = data.val();
  })
  
  dog=createSprite(300,350,150,150);
  dog.addImage(sadDog);
  dog.scale=0.25;
  
  feed=createButton("Feed the dog");
  feed.position(250,140);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(350,140);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + " PM", 350,75);
  }else if(lastFed==0){
     text("Last Fed : 12 AM",350,30);
  }else{
     text("Last Fed : "+ lastFed + " AM", 350,30);
  }

  currentTime = hour();
  if(currentTime === (lastFed+1)){
    update("playing");
    foodObj.gardenState();
  }else if(currentTime === (lastFed+2)){
    update("sleeping");
    foodObj.bedroomState();    
  }else if(currentTime > (lastFed+2) && current <= (lastFed+4)){
    update("bathing");
    foodObj.washroomState();
  }else{
    update("hungry");
    foodObj.display();
  }

  if(gameState != "hungry"){
    feed.hide();
    addFood.hide();
    dog.remove();
    //foodObj.hide();
  }else{
    feed.show();
    addFood.show();
    //foodObj.show();
    dog.addImage(sadDog);
  }
 
  drawSprites();
}

function update(state){
  database.ref('/').update({
    gamaState: state
  });
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
  milk = createSprite(150, 370, 20, 20);
  milk.addImage(milkImg);
  milk.scale = 0.15;
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
  
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}