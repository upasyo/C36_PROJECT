var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var feedDog;
var foodObj;
var col;
var hour;
//create feed and lastFed variable here
var feed,lastFeed;
var FeedTime;
function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  ola=rgb(255, 204, 47);
  //create feed the dog button here
  feedDog=createButton("Feed Dog");
  feedDog.position(600,95);
  feedDog.style('font-size', '17px');
  feedDog.style('background-color', ola);
  feedDog.style('border-radius', '10px');
  feedDog.style('outline', '0');
  feedDog.style('font-size', '20px');
  feedDog.style('user-select', 'none');
  feedDog.mousePressed(feedDogs);

  col=rgb(255, 141, 26);
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.style('font-size', '17px');
  addFood.style('background-color', col);
  addFood.style('border-radius', '10px');
  addFood.style('outline', '0');
  addFood.style('font-size', '20px');
  addFood.style('user-select', 'none');
  addFood.mousePressed(addFoods);
  

}

function draw() {
  background(46,139,87);
  foodObj.display();
  /*
if(addFood.mousePressed(addFoods)){
  updatefeedTime();
  //write code to display text lastFed time here
  console.log("Feed")
alert("hello")
}*/
getCount();
if(FeedTime!==undefined){
console.log(FeedTime)
if(FeedTime==00){
  FeedTime=12;
}
if(FeedTime>12  ){
  FeedTime -= 12;
  if (background){
  textSize(20);
  fill("white");
  text("Last Feed : "+FeedTime+" AM",150,40);
  }
}else{
  if (background){
  textSize(20);
  fill("white");
  text("Last Feed : "+FeedTime+" PM",150,40);
  }
 }
}
if(foodS<=0){
  noStroke();
  fill("red");
  text("Add Bottle",450,35);
  dog.addImage(sadDog);
  feedDog.hide();
}else if(foodS>=1){
  feedDog.show();
}
 
  drawSprites();
}
 function getCount(){
  var feedTime = database.ref('FeedTime');
  feedTime.on("value",function(data){
    FeedTime = data.val();
 })
 //if(FeedTime!==undefined)
  //console.log(FeedTime)

}
//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function updatefeedTime(){
  
var currentTime;
var hours;
var twelvehours;
  currentTime = new Date();
  hours = currentTime.getHours();
  twelvehours=hours%12 || 12;

   database.ref('/').update({
     FeedTime:twelvehours
   })
}
function readTime(data){
  FeedTime = data.val();
}

function feedDogs(){
  dog.addImage(happyDog);
  foodS--;
  //write code here to update food stock and last fed time
  database.ref('/').update({
    Food:foodS
  })
  updatefeedTime();
  //write code to display text lastFed time here
  console.log("Feed")
} 

//function to add food in stock
function addFoods(){
  dog.addImage(sadDog);
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
  
}
