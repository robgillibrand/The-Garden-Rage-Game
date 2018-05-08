var Player = function(id, name, health){
  this.id=id;
  this.name=name;
  this.weapon=new Weapon(8,'Glove',10);
  this.health=health;
  this.alive=true;
  this.takeDamage=function(damage){
    var damageVariant=1;
    if (this.defend==true){
      damageVariant=0.5;
      this.defend=false;
    }
    this.health-=damage*damageVariant;
    if (this.health<=0){
      this.alive=false;
    }
  }
  this.defend=false;
  this.x;
  this.y;
  this.setPosition=function (x,y) {
    this.x=x;
    this.y=y;
  }
}
