let game;


var setup = function () {
  createCanvas(windowWidth, windowHeight);
  game = new Pong();
};

var draw = function () {
  game.draw();
};
