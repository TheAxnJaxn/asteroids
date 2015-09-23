// Destroy spacerocks with this. Also a MovingObject subclass.

(function() {
  if (typeof Asteroids === "undefined") { window.Asteroids = {}; }

  var Bullet = Asteroids.Bullet = function (attrs) {
    // has this.game & this.pos passed from ship
    this.radius = attrs.radius || Bullet.RADIUS;
    this.color = '#953F4E';

    Asteroids.MovingObject.call(this, attrs);

    this.stepCount = 0;
  }

  Bullet.RADIUS = 2;
  Bullet.SPEED = 5;
  Bullet.MAX_STEPS = 50;

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
    if (this.stepCount > Bullet.MAX_STEPS) { this.game.remove(this); }
  };

  // Draws a circle of the appropriate radius centered at pos.
  // Fills it with the appropriate color.
  Bullet.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      true
    );

    ctx.fill();
  };

})();
