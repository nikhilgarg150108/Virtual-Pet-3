class Food {
    constructor(){
    this.foodStock=0;
    this.lastFed;
    this.image=loadImage('Milk.png');
    }

   updateFoodStock(foodStock){
    this.foodStock=foodStock;
   }

   getFedTime(lastFed){
     this.lastFed=lastFed;
   }

   deductFood(){
     if(this.foodStock>0){
      this.foodStock=this.foodStock-1;
     }
    }

    getFoodStock(){
      return this.foodStock;
    }

    bedroomState(){
      background(bedroom, 500, 500);
    }

    washroomState(){
      background(washroom, 500, 500);
    }

    gardenState(){
      background(garden, 500, 500);
    }

    display(){
      var x=100,y=100;
      
      imageMode(CENTER);
      //this.image.scale = 2;
      //image(this.image,150,400,70,70);
      
      
      if(this.foodStock!=0){
        for(var i=0;i<this.foodStock;i++){
          if(i%10==0){
            x=120;
            y=y+50;
          }
          image(this.image,x,y,50,50);
          x=x+30;
        }
      }
    }
}
