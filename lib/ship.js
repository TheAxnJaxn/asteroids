// MovingObject subclass - this is the player

(function () {
  if (typeof Asteroids === "undefined") { window.Asteroids = {}; }

  var Ship = Asteroids.Ship = function(attrs) {
    attrs['color'] = attrs['color'] || "#0000FF";
    attrs['vel'] = attrs['vel'] || [0,0];
    attrs['radius'] = attrs['radius'] || 15;
    attrs['game'] = attrs['game'];

    attrs['pos'] = [ Asteroids.Game.DIM_X / 2, Asteroids.Game.DIM_Y / 2 ];

    Asteroids.MovingObject.call(this, attrs);

    this.direction = Math.PI;
  };

  Ship.MAX_SPEED = 20;

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

    var bulletVel = [ this.vel[0] + Asteroids.Bullet.SPEED * Math.sin(this.direction),
                      this.vel[1] + Asteroids.Bullet.SPEED * Math.cos(this.direction) ]

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
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.beginPath();

    ctx.moveTo( this.pos[0] + 20 * Math.sin(this.direction),
                this.pos[1] + 20 * Math.cos(this.direction) );

    ctx.lineTo( this.pos[0] + 10 * Math.sin(this.direction + 5 * Math.PI / 4),
                this.pos[1] + 10 * Math.cos(this.direction + 5 * Math.PI / 4) );

    ctx.lineTo( this.pos[0] + 10 * Math.sin(this.direction + 3 * Math.PI / 4),
                this.pos[1] + 10 * Math.cos(this.direction + 3 * Math.PI / 4) );

    ctx.closePath();
    ctx.stroke();
  };

  Ship.prototype.getSpeed = function getSpeed () {
    return Math.sqrt( Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2) );
  };

  Ship.prototype.speedUp = function () {
    this.accelerate(1);
  };

  Ship.prototype.slowDown = function () {
    this.accelerate(-1);
  };

  Ship.prototype.accelerate = function accelerate (num) {
    var oldSpeed = this.getSpeed();
    var x = this.vel[0];
    var y = this.vel[1];
    this.vel[0] += num * Math.sin(this.direction);
    this.vel[1] += num * Math.cos(this.direction);
    var newSpeed = this.getSpeed();
    if (newSpeed > Ship.MAX_SPEED && newSpeed > oldSpeed) {
      this.vel[0] = x;
      this.vel[1] = y;
    }
  };

  Ship.prototype.rotateRight = function rotateRight () {
    var angle = -1*(2*Math.PI)/64;
    this.direction += angle;
  };

  Ship.prototype.rotateLeft = function rotateLeft () {
    var angle = (2*Math.PI)/64;
    this.direction += angle;
  };

  Ship.prototype.zeroVel = function zeroVel () {
    this.vel = [0,0];
  };

})();
