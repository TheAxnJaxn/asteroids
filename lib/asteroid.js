// Spacerock, which inherits from MovingObject

(function () {
  if (typeof Asteroids === "undefined") { window.Asteroids = {}; }

  var Asteroid = Asteroids.Asteroid = function(attrs) {
    attrs['color'] = attrs['color'] || "#00FF00";
    attrs['pos'] = attrs['pos'] || options.game.randomPosition();
    attrs['radius'] = attrs['radius'] || 20;
    attrs['vel'] = attrs['vel'] || Asteroids.Util.randomVec(2);

    // this.game = attrs['game'];

    Asteroids.MovingObject.call(this, attrs);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

})();
