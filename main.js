var board;
var display;

var gameOverEvent=new CustomEvent('gameOverEvent');
document.addEventListener("keydown", handleKeys);
function handleKeys(event) {
  console.log(event.key);
  if (event.key=="s"){
    anyKey();
  } if (event.key=="ArrowLeft"){
    moveLeft();
  } if (event.key=="ArrowRight"){
    moveRight();
  } if (event.key=="ArrowUp"){
    moveUp();
  } if (event.key=="ArrowDown"){
    moveDown();
  }
}

document.addEventListener('gameOverEvent', gameOver);

function start(){
  board = new Board(10);
  display = new Display();
  board.start();
  display.showIntroModal();
  display.draw(board);
  display.playerStats(board);
}

function move(oldX,oldY,newX,newY){
  if (newX>=0&&newY>=0&&newX<board.size&&newY<board.size){
    if(board.map[newX][newY]==GameObjects.Player1||board.map[newX][newY]==GameObjects.Player2){
      initiateWar();
    }
    else if (board.map[newX][newY]>=GameObjects.Mushroom&&board.map[newX][newY]<=GameObjects.Mower){
      //assign weapon to current player
      if (board.currentPlayer.weapon.name=="Glove"){
        board.currentPlayer.weapon=board.weapons_dict[board.map[newX][newY]];
        board.map[oldX][oldY]=GameObjects.Grass;
        //handle weapon exchange routine
      } else {
        var tempWeapon = board.currentPlayer.weapon;
        board.currentPlayer.weapon=board.weapons_dict[board.map[newX][newY]];
        tempWeapon.setPosition(oldX,oldY);
        board.map[oldX][oldY]=tempWeapon.id;
      }

      board.map[newX][newY]=board.currentPlayer.id;
      board.currentPlayer.setPosition(newX,newY);
      board.incrementCurrentPlayerMove();
      display.playerStats(board);
      display.draw(board);
    }
    else if (board.map[newX][newY]==GameObjects.Stone) {
      //do nothing
    }
    else {
      board.map[newX][newY]=board.currentPlayer.id;
      board.map[oldX][oldY]=GameObjects.Grass;
      board.currentPlayer.setPosition(newX,newY);
      board.incrementCurrentPlayerMove();
      display.draw(board);
    }
  }
}

function initiateWar(){
  display.showAttackModal1();

  var pName = document.getElementById('playerName');
  pName.innerText = board.currentPlayer.name+".";

  this.attack = function(){
    board.otherPlayer().takeDamage(board.currentPlayer.weapon.damage);
    display.playerStats(board);
    display.hideAttackModal1();
    board.switchCurrentPlayer();
    if (board.currentPlayer.alive==false){
      display.hideAttackModal1();
      document.dispatchEvent(gameOverEvent);
      return;
    }
  }
  this.defend = function(){
    board.currentPlayer.defend=true;
    display.playerStats(board);
    display.hideAttackModal1();
    board.switchCurrentPlayer();
  }
}

function introModal(){
  display.showIntroModal();
}
function anyKey(event){
  display.hideIntroModal();
}

function gameOver(e){
  console.log(e);
  display.showAttackModal2();
  this.yes = function(){
    display.hideAttackModal2();
    start();
  }
  this.no = function(){
    display.hideAttackModal2();
    display.showAttackModal3();
    document.removeEventListener("keydown", handleKeys);
  }
}

function moveLeft(){
  var oldX=board.currentPlayer.x;
  var oldY=board.currentPlayer.y;
  var newX=oldX;
  var newY=oldY-1;
  move(oldX,oldY,newX,newY);
}

function moveRight(){
  var oldX=board.currentPlayer.x;
  var oldY=board.currentPlayer.y;
  var newX=oldX;
  var newY=oldY+1;
  move(oldX,oldY,newX,newY);
}

function moveUp(){
  var oldX=board.currentPlayer.x;
  var oldY=board.currentPlayer.y;
  var newX=oldX-1;
  var newY=oldY;
  move(oldX,oldY,newX,newY);
}

function moveDown(){
  var oldX=board.currentPlayer.x;
  var oldY=board.currentPlayer.y;
  var newX=oldX+1;
  var newY=oldY;
  move(oldX,oldY,newX,newY);
}

start();
