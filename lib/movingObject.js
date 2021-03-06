// Base class for anything that moves

(function () {
  // namespaces code under window.Asteroids
  if (typeof Asteroids === "undefined") { window.Asteroids = {}; }

  // stores key instance variables, like position, velocity, etc.
  var MovingObject = Asteroids.MovingObject = function (attrs) {
    this.pos = attrs.pos;
    this.vel = attrs.vel;
    this.radius = attrs.radius;
    this.color = attrs.color;
    this.game = attrs.game;
  };

  // Increments the pos by the vel, and calls Game#wrap
  // to keep objects on the screen
  MovingObject.prototype.move = function () {
    this.pos = this.game.wrap(
      [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]]
    );
  };

  // Two circles have collided if the distance between their
  // center points is less than the sum of their radii
  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var centerDistance = Math.sqrt(
      Math.pow(this.pos[0] - otherObject.pos[0], 2) +
      Math.pow(this.pos[1] - otherObject.pos[1], 2)
    );
    return centerDistance < (this.radius + otherObject.radius);
  };

  MovingObject.prototype.remove = function () {
    this.game.remove(this);
  }

})();
