var Weapon = function(id, name, damage){
  this.id=id;
  this.name=name;
  this.damage=damage;
  this.x;
  this.y;
  this.setPosition=function (x,y) {
    this.x=x;
    this.y=y;
  }
}
