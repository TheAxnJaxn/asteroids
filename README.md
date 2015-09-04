# Krista's Asteroids

Play the game here: [Live link][asteroids]
[asteroids]: https://rawgit.com/TheAxnJaxn/asteroids/master/index.html

## About my asteroids
- Created with JavaScript, HTML5 Canvas, and minor CSS
- Sizes itself to the size of your screen when first loaded

## Design: Built out in the following classes:
- MovingObject: functions/attributes common to all moving objects, such as movement
- Ship: rotates the ship left or right using radians to store the direction the ship is pointing, increases/decreases velocity to a maximum speed, fires bullets in direction the ship is pointing
- Asteroid: draws circular asteroid with randomly chosen points
- Game: holds game state, such as arrays for asteroids, bullets, ships, and score keeping
- GameView: binds keys used to play the game, has start function that sets the time interval and steps the game forward then redraws
- Bullet: has limit of how long each bullet is in the game
- Util: common utility code, such as inherits functionality

## About me

Learn more about me on my [portfolio page][link]
[link]: http://theaxnjaxn.github.io/
