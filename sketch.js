var canvas, backgroundImage;
var database;
var playerLobby,lobby,form, player,players,game;
var allLobbies;
var target1,target2;
var lobbies = [];
var lobbyPlayers, program1,pro1L,pro1R, disc1, disc2, program2,pro2L,pro2R, disc3, disc4;
var programs = [];
var discs = [];
var p1Img,p1RImg,p1LImg, p2Img,p2RImg,p2LImg, disc1Img, disc3Img;
var topEdge,bottomEdge,leftEdge,rightEdge,edges;

//BP
function preload() {
  backgroundImage = loadImage("./assets/back.png");

  p1Img = loadImage("./assets/pro1.png");
  p2Img = loadImage("./assets/pro2.png");

  p1LImg = loadImage("./assets/pro1L.png");
  p1RImg = loadImage("./assets/pro1R.png");

  p2LImg = loadImage("./assets/pro2L.png");
  p2RImg = loadImage("./assets/pro2R.png");

  disc1Img = loadImage("./assets/Disc1.png");
  disc3Img = loadImage("./assets/Disc3.png");
}

//BP
function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();

  Lobby.getLobbiesInfo();

  form = new Form();
  form.display();

  topEdge = createSprite(width/2,0,width,10);
  topEdge.shapeColor = "white"

  leftEdge = createSprite(0,height/2,10,height);
  leftEdge.shapeColor = "white"

  rightEdge = createSprite(width,height/2,10,height);
  rightEdge.shapeColor = "white"

  bottomEdge = createSprite(width/2,height,width,10);
  bottomEdge.shapeColor = "white"

}

//BP
function draw() {
  background("black");

  edges = createEdgeSprites();

  Lobby.getLobbiesInfo();

  if(lobbies != null){
    if(lobbies[playerLobby] != undefined){
      background(backgroundImage)
        if(lobbies[player.lobby].gameState == 1){

            form.hide();
            game.play();

          }

        else if(lobbies[player.lobby].gameState == 2){

          game.end();

        }
        else if(lobbies[player.lobby].gameState == 0){
          game.reset();
        }
        else if(lobbies[player.lobby].gameState == 4){
          Player.removeLobby()
        }
      }
  }

  drawSprites();
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}