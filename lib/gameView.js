// Stores a Game instance and a canvas context to draw the game into
// Installs key listeners to move the ship and fire bullets
// Installs a timer to call Game#step

(function () {
  if (typeof Asteroids === "undefined") { window.Asteroids = {}; }

  var GameView = Asteroids.GameView = function (game, canvasEl) {
    this.game = game;
    this.ctx = canvasEl.getContext("2d");
    this.ship = this.game.addShip();
    this.timerId = null;
  };

  window.Asteroids.GameView.prototype.start = function () {
    var gameview = this;
    this.timerId = setInterval(
      function () {
       this.game.step();
       this.game.draw(this.ctx);
      }.bind(this), 1000 / Asteroids.Game.FPS
    );

    this.bindKeyHandlers();
  };

  GameView.KEYS = {
    "up" : [0,-1],
    "left" : [-1,0],
    "down" : [0,1],
    "right" : [1,0]
  }

  GameView.prototype.bindKeyHandlers = function () {
    Object.keys(GameView.KEYS).forEach(function (key_opts) {
      var dir = GameView.KEYS[key_opts];
      key(key_opts, function () { this.ship.power(dir); }.bind(this));
    }.bind(this));

    key("space", function () { this.ship.fireBullet(); }.bind(this) );
  };

})();
