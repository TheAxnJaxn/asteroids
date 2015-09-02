// Holds collections of the asteroids, bullets, and your ship.
// Keeps track of space dimensions; wraps objects when they drift off-screen.

(function () {
  if (typeof Asteroids === "undefined") { window.Asteroids = {}; }

  var Game = Asteroids.Game = function(canvasEl) {
    this.asteroids = [];
    this.bullets = [];
    this.ships = [];
    Game.DIM_X = canvasEl.width;
    Game.DIM_Y = canvasEl.height;
    this.addAsteroids();
    this.currentScore = 0;
    this.highScore = localStorage.highScore;
  };

  Game.NUM_ASTEROIDS = 5;
  Game.BG = '#000000';
  Game.TXT = '#4A91AF';
  Game.FPS = 32;

  Game.prototype.add = function (object) {
    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    }
  };

  // Randomly place the asteroids within the dimensions of the game grid.
  Game.prototype.addAsteroids = function () {
    for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
      this.add(new Asteroids.Asteroid({
        game: this,
        pos: this.randomPos()
      }));
    }
  };

  Game.prototype.addShip = function () {
    var ship = new Asteroids.Ship({
      game: this
    });
    this.add(ship);
    return ship;
  };

  Game.prototype.allObjects = function () {
    var objects = [];
    objects = objects.concat(this.asteroids);
    objects = objects.concat(this.ships);
    objects = objects.concat(this.bullets);
    return objects;
  };

  Game.prototype.randomPos = function () {
    var xLoc = Game.DIM_X * Math.random();
    var yLoc = Game.DIM_Y * Math.random();
    return [xLoc, yLoc];
  };

 // #draw(ctx) uses clearRect to wipe down the entire space
 // then draws the background and each object
  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG;
    ctx.fillRect(0,0,Game.DIM_X, Game.DIM_Y);

    var objects = this.allObjects();
    objects.forEach(function (object) {
      object.draw(ctx);
    });

    ctx.font = "36px serif";
    ctx.fillStyle = Game.TXT;
    ctx.fillText("Score: " + this.currentScore, 20, 50);
  };

  Game.prototype.moveObjects = function () {
    var objects = this.allObjects();
    objects.forEach(function (object) {
      object.move();
    });
  };

  // takes in a pos and returns a "wrapped position"
  Game.prototype.wrap = function (pos) {
    var wrapped = pos;

    if ((pos[0] < Game.DIM_X && pos[0] > 0) && (pos[1] < Game.DIM_Y && pos[1] > 0)){
      return wrapped;
    }

    if (pos[0] > Game.DIM_X) {
      wrapped[0] = pos[0] % Game.DIM_X;
    }
    else if (pos[0] < 0) {
      wrapped[0] = Game.DIM_X - (pos[0] % Game.DIM_X);
    }

    if (pos[1] > Game.DIM_Y) {
      wrapped[1] = pos[1] % Game.DIM_Y;
    }
    else if (pos[1] < 0) {
      wrapped[1] = Game.DIM_Y - (pos[1] % Game.DIM_Y);
    }

    return wrapped;
  };

  // checks for colliding objects
  Game.prototype.checkCollisions = function() {
    var objects = this.allObjects();

    for (var i = 0; i < objects.length - 1; i++) {
      for (var j = i + 1; j < objects.length; j++) {
        if (objects[i].isCollidedWith(objects[j])) {
          objects[i].collideWith(objects[j]);
        }
      }
    }
  };

  // removes an asteroid
  Game.prototype.remove = function(object) {
    if (object instanceof Asteroids.Asteroid) {
      var index = this.asteroids.indexOf(object);
      this.asteroids.splice(index, 1);
    } else if (object instanceof Asteroids.Bullet) {
      var index = this.bullets.indexOf(object);
      this.bullets.splice(index, 1);
    } else if (object instanceof Asteroids.Ship) {
      var index = this.ships.indexOf(object);
      this.ships.splice(index, 1);
    }
  };

  // #step calls #move on all the objects, then checks collisions
  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  // adds points to the current score for hitting an asteroid
  Game.prototype.addPoints = function addPoints (asteroid) {
    if (asteroid.isInPlay === true) {
      this.currentScore += asteroid.radius;
    }
  };

})();
