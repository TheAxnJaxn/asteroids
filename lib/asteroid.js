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
    }
  };

})();
