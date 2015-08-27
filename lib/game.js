// Holds collections of the asteroids, bullets, and your ship.
// Keeps track of space dimensions; wraps objects when they drift off-screen.

(function () {
  if (typeof Asteroids === "undefined") { window.Asteroids = {}; }

  var Game = Asteroids.Game = function(attrs) {
    this.asteroids = [];
    this.bullets = [];
    this.ships =[];
    this.addAsteroids();
    this.ship = this.addShip();
  };

  Game.NUM_ASTEROIDS = 5;
  Game.DIM_X = 500;
  Game.DIM_Y = 500;
  Game.BG = '#000000';
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
    this.add(new Asteroids.Ship({
      game: this,
      pos: this.randomPos()
    }));

    //return ship; ?
  };

  Game.prototype.allObjects = function () {
    var objects = [];
    objects = objects.concat(this.asteroids);
    objects.concat(this.ships);
    // objects.concat(this.bullets);
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


 // #checkCollisions checks for colliding objects
  Game.prototype.checkCollisions = function() {
    var game = this;
    var objects = game.allObjects();
    for (var i = 0; i < objects.length; i++) {
      for (var j = i + 1; j < objects.length; j++) {
        if (objects[i].isCollidedWith(objects[j])) {
          objects[i].collideWith(objects[j]);
        }
      }
    }

    // game.asteroids.forEach(function(asteroid1) {
    //   game.asteroids.forEach(function(asteroid2) {
    //     if ((asteroid1 !== asteroid2) && asteroid1.isCollidedWith(asteroid2)) {
    //       alert("COLLISION");
    //     }
    //   });
    // });
  };
  Game.prototype.remove = function(asteroid) {
    var index = this.asteroids.indexOf(asteroid);
    this.asteroids.splice(index, 1);
  };

// #step method calls #move on all the objects, then checks collisions
  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

})();
