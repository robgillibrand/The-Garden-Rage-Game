var Display = function(){
  var canvasObjects = {
    0: 'grass',
    1: 'stone',
    2: 'player1',
    3: 'player2',
    4: 'mushroom',
    5: 'wasp',
    6: 'spade',
    7: 'mower',
  }
  this.showIntroModal=function(){
    document.getElementById('introModal').style.display="block";
  }
  this.hideIntroModal=function(){
    $("#introModal").fadeOut("medium");
  }
  this.showAttackModal1=function(){
    $("#myModal1").slideDown("fast");
  }
  this.hideAttackModal1=function(){
    $("#myModal1").fadeOut("medium");
  }
  this.showAttackModal2=function(){
    $("#myModal2").slideDown("fast");
  }
  this.hideAttackModal2=function(){
    $("#myModal2").fadeOut("medium");
  }
  this.showAttackModal3=function(){
    $("#myModal3").slideDown("fast");
  }

  this.draw = function(board){

    var container = document.getElementById("wrapper");
    container.innerHTML= '';
    for (var i=0; i < board.size; i++){
      for (var j=0; j < board.size; j++){
        var box = document.createElement("div");

        box.innerHTML = '&nbsp;';
        box.className = 'box ' + canvasObjects[board.map[i][j]];
        container.append(box);
      }
    }
  }

  this.playerStats = function(board){
    var p1Weapon=document.getElementById("player1-weapondisplay");
    p1Weapon.innerHTML=board.player1.weapon.name;
    var p2Weapon=document.getElementById("player2-weapondisplay");
    p2Weapon.innerHTML=board.player2.weapon.name;

    var p1Health=document.getElementById("player1-healthdisplay");
    p1Health.innerHTML=board.player1.health;
    var p2Health=document.getElementById("player2-healthdisplay");
    p2Health.innerHTML=board.player2.health;

    if (board.player1.defend==true){
      $('#player1-defMode').html('On');
    } else {
      $('#player1-defMode').html('Off');
    }
    if (board.player2.defend==true){
      $('#player2-defMode').html('On');
    } else {
      $('#player2-defMode').html('Off');
    }
    if (board.player1.health<=0){
      $('#player1-healthdisplay').html('Dead!');
    }
    if (board.player2.health<=0){
      $('#player2-healthdisplay').html('Dead!');
    }
  }
}
