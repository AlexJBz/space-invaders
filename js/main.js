canvas = new Canvas(800, 500);
document.body.appendChild(canvas.view);

let enemyTest = new Sprite(0, 0, 40, 36, '../img/enemy.png');
let playerTest = new Sprite(50, 0, 52, 36, '../img/player.png');

canvas.addGraphic(enemyTest);
canvas.addGraphic(playerTest);