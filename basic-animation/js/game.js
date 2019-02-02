"use strict";
let Game = {
  canvas: null,
  context: null,
  box: null,
  rectangleXPosition: 0,
  rectangleYPosition: 0,
  rectangleOppXPosition: 300,
  rectangleOppYPosition: 300
}

Game.start = function() {
  Game.canvas = document.getElementById('canvas');
  Game.context = Game.canvas.getContext('2d');
  Game.box = Game.canvas.getContext('2d');
  Game.mainLoop();
}

document.addEventListener('DOMContentLoaded', Game.start);

Game.update = function() {
  let date = new Date();
  Game.rectangleXPosition = date.getTime() % Game.canvas.width;
  Game.rectangleYPosition = date.getTime() % Game.canvas.width;
  Game.rectangleOppYPosition -= date.getTime() % Game.canvas.width;
  Game.rectangleOppXPosition -= date.getTime() % Game.canvas.width;
}

Game.draw = function() {
  Game.context.fillStyle = 'blue';
  Game.box.fillStyle = 'red';
  Game.context.fillRect(Game.rectangleXPosition, Game.rectangleYPosition, 50, 50);
  Game.box.fillRect(Game.rectangleOppXPosition, Game.rectangleOppYPosition, 100, 100);
}

Game.clearCanvas = function() {
  Game.context.clearRect(0, 0, Game.canvas.width, Game.canvas.height)
  Game.rectangleOppXPosition = 300;
  Game.rectangleOppYPosition = 300;
}

Game.mainLoop = function() {
  Game.clearCanvas();
  Game.update();
  Game.draw();
  window.setTimeout(Game.mainLoop, 1000 / 2500)
}
