// Spacerock, which inherits from MovingObject

(function () {
  if (typeof Asteroids === "undefined") { window.Asteroids = {}; }

  var Asteroid = Asteroids.Asteroid = function(attrs) {
    // has this.game
    attrs['color'] = attrs['color'] || Asteroid.COLOR;
    attrs['pos'] = attrs['pos'] || attrs.game.randomPos();
    attrs['radius'] = attrs['radius'] || Asteroid.RADIUS;
    attrs['vel'] = attrs['vel'] || Asteroids.Util.randomVec(Asteroid.VEL);

    Asteroids.MovingObject.call(this, attrs);
  };

  Asteroid.COLOR = "#C0C0C0";
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

  // Draws a circle of the appropriate radius centered at pos.
  Asteroid.prototype.draw = function (ctx) {
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    var points = this.randomPoints();
    ctx.moveTo(points[0][0], points[0][1]);
    points.forEach( function (point) {
      ctx.lineTo(point[0], point[1]);
    }.bind(this));

    ctx.closePath();
    ctx.stroke();
  };

})();
