// Destroy spacerocks with this. Also a MovingObject subclass.

(function() {
  if (typeof Asteroids === "undefined") { window.Asteroids = {}; }

  var Bullet = Asteroids.Bullet = function (attrs) {
    // has this.game & this.pos passed from ship
    attrs['radius'] = attrs['radius'] || Bullet.RADIUS;
    attrs['color'] = '#FF0000';

    Asteroids.MovingObject.call(this, attrs);

    this.stepCount = 0;
  }

  Bullet.RADIUS = 2;
  Bullet.SPEED = 5;

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

  Bullet.prototype.move = function () {
    this.pos = this.game.wrap(
      [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]]
    );
    this.stepCount += 1;
    if (this.stepCount > 50) { this.game.remove(this); }
  };

})();
