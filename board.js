var Board = function(size){
  this.size=size;
  this.map=[];

  this.player1=new Player(GameObjects.Player1,'Jim', constants.FULL_HEALTH);
  this.player2=new Player(GameObjects.Player2,'Bob', constants.FULL_HEALTH);
  this.weapon1=new Weapon(GameObjects.Mushroom,'Mushroom', constants.LOW_DAMAGE);
  this.weapon2=new Weapon(GameObjects.Wasp,'Wasp', constants.MEDIUM_DAMAGE);
  this.weapon3=new Weapon(GameObjects.Spade,'Spade', constants.HIGH_DAMAGE);
  this.weapon4=new Weapon(GameObjects.Mower,'Mower', constants.SUPER_DAMAGE);
  this.weapon5=new Weapon(GameObjects.Glove,'Glove', constants.DEFAULT_WEAPON);
  this.players=[this.player1, this.player2];
  this.weapons=[this.weapon1, this.weapon2, this.weapon3, this.weapon4];
  this.currentPlayer=this.player1;
  this.currentPlayerMoves=0;
  this.weapons_dict={
    4:this.weapon1,
    5:this.weapon2,
    6:this.weapon3,
    7:this.weapon4,
  }

  this.incrementCurrentPlayerMove=function(){
    this.currentPlayerMoves++;
    if (this.currentPlayerMoves>GameObjects.maximum_moves){
      this.currentPlayerMoves=0;
      if (this.currentPlayer.id==this.player1.id){
        this.currentPlayer=this.player2;
      } else {
        this.currentPlayer=this.player1;
      }
    }
  }

  this.switchCurrentPlayer=function(){
    this.currentPlayerMoves=GameObjects.maximum_moves;
    if (this.currentPlayer.id==this.player1.id){
      this.currentPlayer=this.player2;
    } else {
      this.currentPlayer=this.player1;
    }
  }
  this.start=function(){
    this.generateMap();
    this.generateStones();
    this.generateWeapons();
    this.generatePlayers();
  }

  this.generateMap = function(){
    for (var i=0; i<this.size; i++){
      var rowNew=[];
      for (var j=0; j<this.size; j++){
        rowNew.push(GameObjects.Grass);
      }
      this.map.push(rowNew);
    }
  }

  this.generateStones = function(){
    var n = Math.floor(0.1*this.size*this.size);
    var i=0;
    while (i<n){
      var x = Math.floor(Math.random()*this.size);
      var y = Math.floor(Math.random()*this.size);
      if (this.map[x][y]==GameObjects.Grass){
        this.map[x][y]=GameObjects.Stone;
        i++;
      }
    }
  }

  this.generatePlayers = function() {
    var i=0;
    while (i<this.players.length) {
      var x = Math.floor(Math.random()*this.map.length/2)*2;
      var y = Math.floor(Math.random()*this.map.length/2)*2;
      if (this.map[x][y]==GameObjects.Grass){
        this.map[x][y]=this.players[i].id;
        this.players[i].setPosition(x,y);
        i++;
      }
    }
  }

  this.generateWeapons = function() {
    var i=0;
    while (i<this.weapons.length) {
      var x = Math.floor(Math.random()*this.map.length);
      var y = Math.floor(Math.random()*this.map.length);
      if (this.map[x][y]==GameObjects.Grass){
        this.map[x][y]=this.weapons[i].id;
        this.weapons[i].setPosition(x,y);
        i++;
      }
    }
  }
  this.otherPlayer = function(){
    if (this.currentPlayer==this.player1){
      return this.player2;
    } else {
      return this.player1;
    }
  }
}
