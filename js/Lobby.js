class Lobby{
  constructor(number){
      this.number = number;
      this.isFull = false;
      this.playerCount = 0;
      this.players = null;
      this.gameState = null;
  }

  addLobby() {
    var lobbyIndex = "lobbies/lobby" + this.number;

    database.ref(lobbyIndex).set({
      number: this.number,
      isFull: this.isFull,
      playerCount: this.playerCount,
      players: this.players,
      gameState: this.gameState
    });

    var count = this.number+1

    database.ref("/").update({
      lobbyCount: count
    })

  }
 
  //Bp
  static getData(number) {
    
    var playerCountRef = database.ref("lobbies/"+number+"/playerCount");
    playerCountRef.on("value", data => {
      lobbies[number].playerCount = data.val();
    });

    var fillStateRef = database.ref("lobbies/"+number+"/isFull");
    fillStateRef.on("value", data => {
      lobbies[number].isFull = data.val();
    });

    var gameStateRef = database.ref("lobbies/"+number+"/gameState");
    gameStateRef.on("value", data => {
      lobbies[number].gameState = data.val();
    });
  }

  //Bp
  static updateData(number,count,state) {
    database.ref("lobbies/"+number).update({
    playerCount: count
    });

    if(this.gameState == null){
      if(count == 2){
          database.ref("lobbies/"+number).update({
          isFull: true,
          gameState: 1
          });
      }
    }

    if(state == 2){
      database.ref("lobbies/"+number).update({
        gameState: 2
      });
    }

  }

  static delete(number){
    database.ref("lobbies/"+number).update({
      gameState: 4
    });
   
  }

  static getLobbiesInfo() {
    var lobbyInfoRef = database.ref("/");
    lobbyInfoRef.on("value", data => {
      allLobbies = data.val();
    });

    var lobbiesRef = database.ref("lobbies");
    lobbiesRef.on("value", data => {
      lobbies = data.val();
    });
  } 


  
}