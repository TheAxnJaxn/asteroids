// Utility code

(function () {
  if (typeof Asteroids === "undefined") { window.Asteroids = {}; }

  var Util = Asteroids.Util = {};

  Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate() {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
    ChildClass.prototype.constructor = ChildClass;
  };

  // randomizes the direction, with given speed
  Util.randomVec = function (speed) {
    var dx = (Math.random() * speed) - 1;
    var dy = (Math.random() * speed) - 1;

    return [dx, dy];
  };

})();
