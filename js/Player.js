class Player{
    constructor(){
        this.name = null;
        this.lobby = null;
        this.index = null;
        this.score = 0;

        this.positionX = 0;
        this.positionY = 0;

        this.rX = 0;
        this.rY = 0;

        this.lX = 0;
        this.lY = 0;
        
        this.disc1X = 0;
        this.disc1Y = 0;
        this.disc2X = 0;
        this.disc2Y = 0;

        this.touch1 = true;
        this.touch2 = true;
    }

    addToLobby(lob){
        lob = "lobby" + lob;

        if(lobbies[lob].playerCount >= 2){
            lobby = allLobbies.lobbyCount;

            lobby = new Lobby(lobby);
            lobby.addLobby();

            Lobby.getData("lobby"+lobby.number);

            this.addToLobby(lobby.number);

            this.set();

        } else if(lob != null){

            this.index = lobbies[lob].playerCount+1;

            this.lobby = lob;
            
            this.set();
    }}

    update(){
        var playerIndex = "lobbies/"+this.lobby+"/players/player" + this.index;
        database.ref(playerIndex).update({
          positionX: this.positionX,
          positionY: this.positionY,
          score: this.score,
         });

        var discIndex = "lobbies/"+this.lobby+"/players/player" + this.index + "/discs";
            
        database.ref(discIndex).update({
        disc1X: this.disc1X,
        disc1Y: this.disc1Y,
        disc2X: this.disc2X,
        disc2Y: this.disc2Y
        });

        var handIndex = "lobbies/"+this.lobby+"/players/player" + this.index + "/hands";
        
        database.ref(handIndex).update({
          rX: this.rX,
          rY: this.rY,
          lX: this.lX,
          lY: this.lY
        });
      }
    

      static getPlayerInfo(l){
        var playerInfoRef = database.ref("lobbies/" + l + "/players");
        playerInfoRef.on("value", (data) => {
            lobbyPlayers = data.val();
        })
      }

    set(){

      if (this.index === 1) {
        this.positionX = 100;
        this.positionY = height/2;

            this.rX = this.positionX+14;
            this.rY = this.positionY+15;

            this.disc1X = 136;
            this.disc1Y = height/2;

            this.lX = this.positionX+22;
            this.lY = this.positionY;

            this.disc2X = 128;
            this.disc2Y = height/2+15;
      } else{
        this.positionX = width-100;
        this.positionY = height/2;

        this.rX = this.positionX-19;
        this.rY = this.positionY;

        this.disc1X = width-135;
        this.disc1Y = height/2;

        this.lX = this.positionX-22;
        this.lY = this.positionY+15;

        this.disc2X = width-136;
        this.disc2Y = height/2+15;
      }

      var lobbyIndex = "lobbies/"+this.lobby+"/players/player" + this.index;
            
        database.ref(lobbyIndex).update({
          name: this.name,
          positionX: this.positionX,
          positionY: this.positionY,
          score: this.score,
          lobby: this.lobby,
        });

      var discIndex = "lobbies/"+this.lobby+"/players/player" + this.index + "/discs";
            
        database.ref(discIndex).set({
          disc1X: this.disc1X,
          disc1Y: this.disc1Y,
          disc2X: this.disc2X,
          disc2Y: this.disc2Y
        });

      var handIndex = "lobbies/"+this.lobby+"/players/player" + this.index + "/hands";
            
        database.ref(handIndex).set({
          rX: this.rX,
          rY: this.rY,
          lX: this.lX,
          lY: this.lY
        });

    Player.getPlayerInfo(player.lobby);

    Lobby.updateData(this.lobby,this.index);
    }

    static removeLobby(){
      if(player.lobby != undefined){
        console.log(player.lobby)

        var count = allLobbies.lobbyCount-1
        
        database.ref("/").set({
          lobbyCount: count
        })

        database.ref("lobbies/" + player.lobby).set({
          gameState:null
        })

        player.lobby = undefined;
        }
    }
}