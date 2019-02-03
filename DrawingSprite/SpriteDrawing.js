"use strict"

let Game = {
  //General Initialization
  canvas: null,
  context: null,
  //Sprite Initialization
  //balloon
  balloonSprite: null,
  backgroundSprite: null,
  //Cannon
  cannonSprite: null,
  // Sprite Coordinates
  //Balloons
  balloon_1_Position: { x: 0, y: 50 },
  balloon_2_Position: { x: 0, y: 125 },
  balloonOrigin: { x: 0, y: 0},
  //Mouse Coord.
  mousePosition: { x: 0, y: 0 },
  //Cannon
  cannonPosition: { x: 72, y: 405 },
  cannonRotation: 0,
  cannonOrigin: { x: 34, y: 34 },
  //Sound Initialization
  backgroundMusic: null
}
function playSound() {
  Game.backgroundMusic.src = './snd_music.mp3';
  Game.backgroundMusic.volume = 0.4;
  Game.backgroundMusic.play();
}

function pauseSound() {
  Game.backgroundMusic.pause();
}

function handleMouseEvent(e) {
  Game.mousePosition = {
    x:e.pageX,
    y:e.pageY
  };
}



Game.start = function() {
  document.onmousemove = handleMouseEvent;
  Game.canvas = document.getElementById('canvas');
  Game.context = Game.canvas.getContext('2d');
  //Balloon
  Game.balloonSprite = new Image();
  Game.balloonSprite.src = './ballon.png';
  //Background
  Game.backgroundSprite = new Image();
  Game.backgroundSprite.src = './spr_background.jpg';
  //Cannon
  Game.cannonSprite = new Image();
  Game.cannonSprite.src = './spr_cannon_barrel.png';
  //Music
  Game.backgroundMusic = new Audio();
  window.setTimeout(Game.mainLoop, 500);
}


document.addEventListener('DOMContentLoaded', Game.start);

Game.draw = function() {
  Game.clearCanvas();
  Game.drawImage(Game.backgroundSprite, { x: 0, y: 0}, 0, { x: 0, y: 0});
  Game.drawImage(Game.cannonSprite, Game.cannonPosition, Game.cannonRotation, Game.cannonOrigin);
}

Game.update = function() {
  let opp = Game.mousePosition.y - Game.cannonPosition.y;
  let adj = Game.mousePosition.x - Game.cannonPosition.x;
  Game.cannonRotation = Math.atan2(opp, adj);
}

Game.drawImage = function(sprite, position, rotation, origin) {
  Game.context.save();
  Game.context.translate(position.x, position.y);
  Game.context.rotate(rotation);
  Game.context.drawImage(sprite, 0, 0, sprite.width, sprite.height,
                         -origin.x, -origin.y, sprite.width, sprite.height);
  Game.context.restore();
}

Game.clearCanvas = function() {
  Game.context.clearRect(0, 0, Game.canvas.width, Game.canvas.height);
}

Game.mainLoop = function() {
  Game.update();
  Game.draw();
  window.setTimeout(Game.mainLoop, 1000 / 60)
}
