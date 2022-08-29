class Form {
  constructor() {
    this.input = createInput("").attribute("placeholder", "Ingresa tu nombre");
    this.playButton = createButton("Play");
    
    this.resetButton = createButton("Reiniciar");
    this.titleImg = createImg("./assets/title.png", "game title");
    this.greeting = createElement("h2");
  }

  setElementsPosition() {
    this.titleImg.position(width/12, 160);
    this.input.position(width / 2 - 200, height / 2 - 80);
    this.playButton.position(width / 2 - 90, height / 2 - 20);
    this.greeting.position(width / 2 - 325, height / 2 - 100);
    
    this.resetButton.position(width  - 250,  20);
  }

  setElementsStyle() {
    this.titleImg.class("gameTitle");
    this.input.class("customInput");
    this.playButton.class("customButton");
    this.resetButton.class("customButton2");
    this.greeting.class("greeting");
  }

  //BP
  hide() {
    this.greeting.hide();
    this.playButton.hide();
    this.input.hide();
    this.resetButton.hide();
    this.titleImg.hide();
  }

  show(){
    this.greeting.show();
    this.playButton.show();
    this.input.show();
    this.resetButton.show();
    this.titleImg.show();
  }

  //BP
  handleMousePressed() {
    this.playButton.mousePressed(() => {
      this.input.hide();
      this.playButton.hide();
      var message = `
      Hola ${this.input.value()}
      </br>espera a que otro jugador se una...`;
      this.greeting.html(message);

      var lbs = 0;
      var free = 0;
      var lob = 0
      
      if(allLobbies.lobbyCount == 0){

        lobby = allLobbies.lobbyCount;

        lobby = new Lobby(lobby);
        lobby.addLobby();

        Lobby.getData("lobby"+lobby.number);

        player = new Player();
        player.name = this.input.value();
        player.addToLobby(lobby.number);
        playerLobby = player.lobby
        
        game = new Game(playerLobby);
        game.start();

      } else{

        player = new Player();
        player.name = this.input.value();

        for(lbs = 0; lbs<allLobbies.lobbyCount; lbs+1){
          lob = "lobby" + lbs;
          if(lobbies[lob].isFull == false){
            free = lbs;

            lbs = allLobbies.lobbyCount;
          } else{
              lbs += 1;
          }
        }
        player.addToLobby(free);
        playerLobby = player.lobby
        
        game = new Game(playerLobby);
        game.start();
        
      }          
    });
    this.resetButton.mousePressed(() => {
      player.updateCount(0);
      game.update(0)
      player.resetPlayers();
    })
  }

  display() {
    this.show();
    this.setElementsPosition();
    this.setElementsStyle();
    this.handleMousePressed();
  }
}
