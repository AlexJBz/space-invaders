canvas = new Canvas(800, 500);
document.body.appendChild(canvas.view);

// new Sprite(x coordinate, y coordinate, width, height)
// new Rectangle(x coordinate, y coordinate, width, height, colour ('#HEX'), fill (true/false), outline (true/false), thickness, outline colour)
// once you've made a new sprite/rectangle then make sure to add it to the canvas
// canvas.addGraphic(newGraphic);

// Refer to the below, don't mess with ANY of framework.js

let enemyTest = new Sprite(0, 0, 40, 36, '../img/enemy.png');
let playerTest = new Sprite(50, 0, 52, 36, '../img/player.png');

canvas.addGraphic(enemyTest);
canvas.addGraphic(playerTest);

playerTest.position.set(250, 250);