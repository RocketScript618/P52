class Game{
    constructor(lobby){
        this.lobby = lobby
    }

    start(){

        program1 = createSprite(100,height/2);
        program1.addImage("pro1",p1Img);
        program1.scale = .12;

        pro1L = createSprite(122,height/2);
        pro1L.addImage("pro1L",p2LImg);
        pro1L.depth = program1.depth-1;
        pro1L.scale = .2;

        pro1R = createSprite(114,height/2+15);
        pro1R.addImage("pro1R",p2RImg);
        pro1R.scale = .2;

        program2 = createSprite(width-100,height/2);
        program2.addImage("pro2",p2Img);
        program2.scale = 0.12;

        pro2L = createSprite(width-122,height/2+15);
        pro2L.addImage("pro2L",p1LImg);
        pro2L.scale = .2;

        pro2R = createSprite(width-119,height/2);
        pro2R.addImage("pro2R",p1RImg);
        pro2R.depth = program2.depth-1;
        pro2R.scale = .2;

        programs = [program1,pro1L,pro1R,program2,pro2L,pro2R]

        disc1 = createSprite(136,height/2);
        disc1.addImage("disc",disc3Img)
        disc1.scale = .2;
        disc1.setCollider("circle",0,0,110);
        disc1.depth = pro1L.depth-1;
        disc1.restitution = .7;
        disc1.friction = .05;

        disc2 = createSprite(128,height/2+15);
        disc2.addImage("disc",disc3Img)
        disc2.scale = .2;
        disc2.setCollider("circle",0,0,110);
        disc2.depth = pro1R.depth-1;
        disc2.restitution = .7;
        disc2.friction = .05;

        disc3 = createSprite(width-135,height/2);
        disc3.addImage("disc",disc1Img)
        disc3.scale = .2;
        disc3.setCollider("circle",0,0,110);
        disc3.depth = pro2R.depth-1;
        disc3.restitution = .7;
        disc3.friction = .05;

        disc4 = createSprite(width-136,height/2+15);
        disc4.addImage("disc",disc1Img)
        disc4.scale = .2;
        disc4.setCollider("circle",0,0,110);
        disc4.depth = pro2L.depth-1;
        disc4.restitution = .7;
        disc4.friction = .05;

        discs = [disc1,disc2,disc3,disc4]

    }

    play(){
        Player.getPlayerInfo(this.lobby);
        this.handlePlayerControls();
        this.handleObstacleCollision();
        this.handleDiscVelocities();

        if (lobbyPlayers !== undefined) {
      
            var index = 0;
            for (var plr in lobbyPlayers) {
              //agrega 1 al índice por cada bucle
      
              //utiliza datos de la base de datos para mostrar los autos en la dirección x e y
              
              var x = lobbyPlayers[plr].positionX;
              var y = lobbyPlayers[plr].positionY;

              var rX = lobbyPlayers[plr].hands.rX;
              var rY = lobbyPlayers[plr].hands.rY;

              var lX = lobbyPlayers[plr].hands.lX;
              var lY = lobbyPlayers[plr].hands.lY;

              var d1X = lobbyPlayers[plr].discs.disc1X;
              var d1Y = lobbyPlayers[plr].discs.disc1Y;

              var d2X = lobbyPlayers[plr].discs.disc2X;
              var d2Y = lobbyPlayers[plr].discs.disc2Y;
      
              programs[index].position.x = x;
              programs[index].position.y = y;

              programs[index+2].position.x = rX;
              programs[index+2].position.y = rY;

              programs[index+1].position.x = lX;
              programs[index+1].position.y = lY;

              if(index == 0){
                discs[index].position.x = d1X;
                discs[index].position.y = d1Y;

                discs[index+1].position.x = d2X;
                discs[index+1].position.y = d2Y;
              } else{
                discs[index-1].position.x = d1X;
                discs[index-1].position.y = d1Y;

                discs[index].position.x = d2X;
                discs[index].position.y = d2Y;
              }
              

              index = index + 3;
            
            }
        }
    }

    end(){
        if(lobbies[player.lobby].gameState != 2){
            Lobby.updateData(player.lobby,2,2);
        }
        
        swal({
            title: `Buen Juego`,
            confirmButtonText: "Ok",
            cancelButtonText: "Cancel",
            showCancelButton: true
        },
        function(isConfirm) {       
            if(isConfirm == false)
                Lobby.delete(player.lobby)
                form = new Form();
        })
    }

    reset(){
    
    }

    handleObstacleCollision(){

        disc1.bounceOff(edges);
        disc2.bounceOff(edges);
        disc3.bounceOff(edges);
        disc4.bounceOff(edges);

        disc1.bounce(disc3);
        disc1.bounce(disc4);

        disc2.bounce(disc3);
        disc2.bounce(disc4);

        if(disc1.isTouching(programs[3]) || disc2.isTouching(programs[3])){
            this.end();
            if(player.index == 1){
                player.score += 1
                player.update()
            }
        }

        if(disc3.isTouching(programs[0]) || disc4.isTouching(programs[0])){
            this.end()
            if(player.index == 2){
                player.score += 1
                player.update()
            }
        }

      }

    handlePlayerControls() {
        if (keyIsDown(UP_ARROW)||keyIsDown(87)) {
      
            player.positionY -= 6;
            player.rY -= 6;
            player.lY -= 6;

            this.discsUpdate();

        }if(keyIsDown(LEFT_ARROW)||keyIsDown(65)){
      
            player.positionX -= 6;
            player.rX -= 6;
            player.lX -= 6;

            this.discsUpdate();

        }if(keyIsDown(RIGHT_ARROW)||keyIsDown(68)){

            player.positionX += 6;
            player.rX += 6;
            player.lX += 6;

            this.discsUpdate();

        }if(keyIsDown(DOWN_ARROW)||keyIsDown(83)){
            player.positionY += 6;
            player.rY += 6;
            player.lY += 6;

            this.discsUpdate();
        }

        if(keyDown(69)){
            if(player.index == 1){
                if(disc2.isTouching(program1)){

                    target2 = [0,1];
                    target2[0] = mouseX;
                    target2[1] = mouseY;

                    player.touch2 = false;
                }

            } else{
                if(disc4.isTouching(program2)){

                    target2 = [0,1];
                    target2[0] = mouseX;
                    target2[1] = mouseY;

                    player.touch2 = false;
                }
            }
            
        }

        if(keyDown(81)){
            if(player.index == 1){
                if(disc1.isTouching(program1)){

                    target1 = [0,1];
                    target1[0] = mouseX;
                    target1[1] = mouseY;

                    player.touch1 = false;
                }
                
            } else{
                if(disc3.isTouching(program2)){

                    target1 = [0,1];
                    target1[0] = mouseX;
                    target1[1] = mouseY;

                    player.touch1 = false;
                }
            }
            
        }

        if(player.index == 1){
            if(player.positionX >= width/2){
                player.positionX = width/2
                player.rX = width/2+14;
                player.lX = width/2+22;
            }
            
            if(player.positionX <= 23){
                player.positionX = 23
                player.rX = 37;
                player.lX = 45;
            } 

            if(player.positionY >= height-65){
                player.positionY = height-65
                player.rY = height-50;
                player.lY = height-65;
            }
            
            if(player.positionY <= 65){
                player.positionY = 65
                player.rY = 80;
                player.lY = 65;
            } 

        }else if(player.index == 2){
            if(player.positionX <= width/2){
                player.positionX = width/2
                player.rX = width/2-22;
                player.lX = width/2-19;
            }
            
            if(player.positionX >= width-23){
                player.positionX = width-23
                player.rX = width-45;
                player.lX = width-42;
            }

            if(player.positionY >= height-65){
                player.positionY = height-65
                player.rY = height-65;
                player.lY = height-50;
            }
            
            if(player.positionY <= 65){
                player.positionY = 65
                player.rY = 65;
                player.lY = 80;
            } 
        }
        player.update();      
  }

  discsUpdate(){

    if(player.index == 1){

        player.rX = player.positionX+14;
        
        if(player.touch1 == true){
            if(programs[0].overlap(disc1)){
                player.disc1X = player.positionX+36;
                player.disc1Y = player.positionY;
                disc1.velocityX = 0;
                disc1.velocityY = 0;
            }
        }

        if(player.touch2 == true){
            if(programs[0].overlap(disc2)){
                player.disc2X = player.positionX+28;
                player.disc2Y = player.positionY+15;
                disc2.velocityX = 0;
                disc2.velocityY = 0;
            }
        }   

    } else{
        if(player.touch1 == true){
            if(programs[3].overlap(disc3)){
                player.disc1X = player.positionX-35;
                player.disc1Y = player.positionY;
                disc3.velocityX = 0;
                disc3.velocityY = 0;
            }
        }

        if(player.touch2 == true){
            if(programs[3].overlap(disc4)){
                player.disc2X = player.positionX-36;
                player.disc2Y = player.positionY+15;
                disc4.velocityX = 0;
                disc4.velocityY = 0;
            }
        }

        }
    }

    handleDiscVelocities(){

        if(player.index == 1){

            if(player.touch1 == false){
                disc1.attractionPoint(1,target1[0],target1[1])
                player.disc1Y = disc1.y
                player.disc1X = disc1.x

                if(disc1.x >= width-300 || disc1.x >= target1[0] || disc1.bounce(disc3) || disc1.bounce(disc4)){
                    player.touch1 = true;
                }

            } else if(player.touch1 == true){
                if(disc1.overlap(programs[0]) == false){
                    target1[0] =  programs[0].x;
                    target1[1] =  programs[0].y;

                    disc1.attractionPoint(1,target1[0],target1[1])
                    player.disc1Y = disc1.y
                    player.disc1X = disc1.x
                }
            } 
            
            if(player.touch2 == false){
                disc2.attractionPoint(1,target2[0],target2[1])
                player.disc2Y = disc2.y
                player.disc2X = disc2.x

                if(disc2.x >= width-300 || disc2.x >= target2[0] || disc2.bounce(disc3) || disc2.bounce(disc4)){
                    player.touch2 = true;
                }

            } else if(player.touch2 == true){
                if(disc2.overlap(programs[0]) == false){
                    target2[0] =  programs[0].x;
                    target2[1] =  programs[0].y;

                    disc2.attractionPoint(1,target2[0],target2[1])
                    player.disc2Y = disc2.y
                    player.disc2X = disc2.x
                }
            }
        } else {

            if(player.touch1 == false){
                disc3.attractionPoint(1,target1[0],target1[1])
                player.disc1Y = disc3.y
                player.disc1X = disc3.x

                if(disc3.x <= 300 || disc3.x<= target1[0] || disc3.bounce(disc1) || disc3.bounce(disc2)){
                    player.touch1 = true;
                }

            } else if(player.touch1 == true){
                if(disc3.overlap(programs[4]) == false){
                    target1[0] =  programs[4].x;
                    target1[1] =  programs[4].y;

                    disc3.attractionPoint(1,target1[0],target1[1])
                    player.disc1Y = disc3.y
                    player.disc1X = disc3.x
                }
            } 
            
            if(player.touch2 == false){
                disc4.attractionPoint(1,target2[0],target2[1])
                player.disc2Y = disc4.y
                player.disc2X = disc4.x

                if(disc4.x <= 300 || disc4.x<= target2[0] || disc4.bounce(disc1) || disc4.bounce(disc2)){
                    player.touch2 = true;
                }

            } else if(player.touch2 == true){
                if(disc4.overlap(programs[4]) == false){
                    target2[0] =  programs[4].x;
                    target2[1] =  programs[4].y;

                    disc4.attractionPoint(1,target2[0],target2[1])
                    player.disc2Y = disc4.y
                    player.disc2X = disc4.x
                }
            }
        }
        
    }
}