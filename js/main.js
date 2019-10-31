

// let enemyTest = new Sprite(0, 0, 40, 36, '../img/enemy.png');
// let playerTest = new Sprite(50, 0, 52, 36, '../img/player.png');

// canvas.addGraphic(enemyTest);
// canvas.addGraphic(playerTest);

// playerTest.position.set(250, 250);

let game = {
    settings: {
        moveSpeed: 5,
    },
    canvas: null,
    playerClass: class Player {
        constructor() {
            this.health = 100;
            this.ship = new Sprite(0, 0, 52, 36, '../img/player.png');
            game.canvas.addGraphic(this.ship);
            this.ship.position.set((game.canvas.view.width / 2 - this.ship.width / 2), (game.canvas.view.height - this.ship.height - 10));
            this.controlListener();
            this.moveKey = null;
            this.moveInterval = null;
        }

        controlListener() {
            // 97 A, 100 D, 32 SPACE
            window.addEventListener('keypress', key => {
                if (key.keyCode == 97 || key.keyCode == 100) {
                    if (!this.moveInterval) {
                        this.moveKey = key.keyCode;
                        this.moveInterval = setInterval(() => { this.move(key.keyCode) }, 1000 / 30);
                    }
                }
            });
            window.addEventListener('keyup', key => {
                if (key.keyCode + 32 == this.moveKey) {
                    clearInterval(this.moveInterval);
                    this.moveInterval = null;
                } else if (key.keyCode == 32) {
                    this.shoot();
                }
            });
        }

        shoot () {
            console.log('Shoot god dammit!');
        }

        move(keyCode) {
            if (keyCode == 97) {
                if (this.ship.position.x - game.settings.moveSpeed <= 10) {
                    this.ship.position.x = 10;
                } else {
                    this.ship.position.x -= game.settings.moveSpeed;
                }
            } else {
                if (this.ship.position.x + game.settings.moveSpeed >= game.canvas.view.width - this.ship.width - 10) {
                    this.ship.position.x = game.canvas.view.width - this.ship.width - 10;
                } else {
                    this.ship.position.x += game.settings.moveSpeed;
                }
            }
        }
    },
    player: null,
    init () {
        this.canvas = new Canvas(800, 500);
        document.body.appendChild(this.canvas.view);
        this.player = new this.playerClass();
    }
}

game.init();