// MovingObject subclass - this is the player

(function () {
  if (typeof Asteroids === "undefined") { window.Asteroids = {}; }

  var Ship = Asteroids.Ship = function(attrs) {
    attrs['color'] = attrs['color'] || "#0000FF";
    attrs['vel'] = attrs['vel'] || [0,0];
    attrs['radius'] = attrs['radius'] || 20;
    attrs['game'] = attrs['game'];

    attrs['pos'] = [ Asteroids.Game.DIM_X / 2, Asteroids.Game.DIM_Y / 2 ];

    Asteroids.MovingObject.call(this, attrs);

    this.direction = 1;
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

  Ship.prototype.fireBullet = function () {

    var bulletVel = [ this.vel[0] + Asteroids.Bullet.SPEED,
                      this.vel[1] + Asteroids.Bullet.SPEED ]

    var bullet = new Asteroids.Bullet({
      vel: bulletVel,
      game: this.game,
      pos: this.pos,
      color: this.color
    });
    this.game.add(bullet);
  };

  Ship.prototype.collideWith = function (otherObject) {

  };

  Ship.prototype.draw = function (ctx) {
    var image = document.getElementById('source');
    ctx.drawImage(image,
      this.pos[0], this.pos[1],
      Asteroids.Game.DIM_X/9, Asteroids.Game.DIM_Y/9);
  };

})();
