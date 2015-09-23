// Spacerock, which inherits from MovingObject

(function () {
  if (typeof Asteroids === "undefined") { window.Asteroids = {}; }

  var Asteroid = Asteroids.Asteroid = function (attrs) {
    // has this.game
    attrs.color = attrs.color || Asteroid.COLOR;
    attrs.pos = attrs.pos || attrs.game.randomPos();
    attrs.radius = attrs.radius || Asteroid.RADIUS;
    attrs.vel = attrs.vel || Asteroids.Util.randomVec(Asteroid.VEL);

    Asteroids.MovingObject.call(this, attrs);

    // used to avoid double point-counting when hit by >1 bullet
    this.isInPlay = true;
    this.points = this.randomPoints();
  };

  Asteroid.COLOR = "#E7E390";
  Asteroid.RADIUS = 20;
  Asteroid.VEL = 3;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(otherObject);
      this.game.remove(this);
    } else if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    } else if (otherObject instanceof Asteroids.Bullet) {
      this.game.addPoints(this);
      this.isInPlay = false;
      this.game.remove(this);
      this.game.remove(otherObject);
    }
  };

  Asteroid.prototype.randomPoints = function randomPoints () {
    var points = [];
    for (var radian = 0; radian < 2 * Math.PI; radian += Math.random(0, Math.PI/2)) {
      var point = [this.pos[0] + this.radius * Math.cos(radian),
                  this.pos[1] + this.radius * Math.sin(radian) ];
      points.push(point);
    }
    return points;
  };

  // Draws an asteroid based on points along its edge
  Asteroid.prototype.draw = function (ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    ctx.moveTo(this.points[0][0], this.points[0][1]);
    this.points.forEach( function (point) {
      if ( this.isWrapped(point) ) {
        ctx.moveTo(point[0], point[1]);
      } else {
        ctx.lineTo(point[0], point[1]);
      }
    }.bind(this));

    ctx.closePath();
    ctx.stroke();
  };

  Asteroid.prototype.isWrapped = function (point) {
    return !((point[0] <= this.pos[0] + this.radius && point[0] >= this.pos[0] - this.radius)
    &&
    (point[1] <= this.pos[1] + this.radius && point[1] >= this.pos[1] - this.radius));
  };

  Asteroid.prototype.move = function () {
    this.pos = this.game.wrap(
      [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]]
    );

    this.points.forEach( function (point) {
      var newPoint = this.game.wrap(
        [point[0] + this.vel[0], point[1] + this.vel[1]]
      );
      point[0] = newPoint[0];
      point[1] = newPoint[1];
    }.bind(this));
  };

})();
