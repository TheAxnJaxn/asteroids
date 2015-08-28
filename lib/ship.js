// MovingObject subclass - this is the player

(function () {
  if (typeof Asteroids === "undefined") { window.Asteroids = {}; }

  var Ship = Asteroids.Ship = function(attrs) {
    attrs['color'] = attrs['color'] || "#0000FF";
    attrs['vel'] = attrs['vel'] || [0,0];
    attrs['radius'] = attrs['radius'] || 20;

    // this.pos = attrs['pos'];
    // this.game = attrs['game'];

    Asteroids.MovingObject.call(this, attrs);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

})();
