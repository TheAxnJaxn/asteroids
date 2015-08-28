// MovingObject subclass - this is the player

(function () {
  if (typeof Asteroids === "undefined") { window.Asteroids = {}; }

  var Ship = Asteroids.Ship = function(attrs) {
    attrs['color'] = attrs['color'] || "#0000FF";
    attrs['vel'] = attrs['vel'] || [0,0];
    attrs['radius'] = attrs['radius'] || 20;
    attrs['game'] = attrs['game'];

    // this.pos = attrs['pos'];

    Asteroids.MovingObject.call(this, attrs);
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPos();
    this.vel = [0,0];
  };

  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

})();
