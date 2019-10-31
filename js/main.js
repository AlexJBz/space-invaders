let game = {
    settings: {
        moveSpeed: 5,
        enemyCount: 35,
        rowCount: 5,
        enemySpeed: 18
    },
    canvas: null,
    enemyControllerClass: class EnemyController {
        constructor(enemyCount, rows) {
            this.enemyCount = enemyCount;
            this.rows = rows;
            this.moveLeft = true;
            this.enemies = [];
            this.init();
            this.moveInterval = setInterval(()=> {
                this.moveEnemies();
            }, 1000 / 30);
        }

        moveEnemies() {
            if (this.rowPosition) {
                if (this.moveLeft) {
                    this.rowPosition += game.settings.enemySpeed;
                    if (this.rowPosition <= 780 - this.rowWidth) {
                        this.moveAliens(game.settings.enemySpeed);
                    } else {
                        this.moveLeft = false;
                        this.downShift();
                    }
                } else {
                    this.rowPosition -= game.settings.enemySpeed;
                    if (this.rowPosition >= 20) {
                        this.moveAliens(-game.settings.enemySpeed);
                    } else {
                        this.moveLeft = true;
                        this.downShift();
                    }
                }
            }
        }

        moveAliens(amount) {
            this.enemies.forEach(enemy => {
                let alien = enemy.alien;
                alien.position.x += amount;
            });
        }

        downShift() {
            this.enemies.forEach(enemy => {
                let alien = enemy.alien;
                alien.position.y += alien.height;
            });
        }

        init() {
            let enemiesPerRow = this.enemyCount / this.rows;
            this.rowWidth = ((enemiesPerRow * 40) + (10 * enemiesPerRow));
            this.rowPosition = (game.canvas.view.width / 2) - this.rowWidth / 2;
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < enemiesPerRow; j++) {
                    let newEnemy = new game.enemyClass();
                    this.enemies.push(newEnemy);
                    newEnemy.alien.position.set(this.rowPosition + (j * (newEnemy.alien.width + 10)), 25 + i * (newEnemy.alien.height + 5));
                    game.canvas.addGraphic(newEnemy.alien);
                }
            }
        }
    },
    enemyClass: class Enemy {
        constructor() {
            this.alive = true;
            this.alien = new Sprite(0, 0, 40, 36, '../img/enemy.png');
        }

        die() {
            this.alive = false;
            this.alien.visible = false;
        }
    },
    playerClass: class Player {
        constructor() {
            this.health = 100;
            this.ship = new Sprite(0, 0, 52, 36, '../img/player.png');
            game.canvas.addGraphic(this.ship);
            this.ship.position.set((game.canvas.view.width / 2 - this.ship.width / 2), (game.canvas.view.height - this.ship.height - 10));
            this.controlListener();
            this.moveKey = 0;
            this.moveInterval = null;
            this.bullets = [];
            this.bulletInterval = setInterval(()=> {
                this.moveBullets();
            }, 1000 / 30);
        }

        controlListener() {
            window.addEventListener('keypress', key => {
                // 97 = A, 100 = D
                if (key.keyCode == 97 || key.keyCode == 100) {
                    if (!this.moveInterval) {
                        this.moveKey = key.keyCode;
                        this.moveInterval = setInterval(() => { this.move(key.keyCode) }, 1000 / 30);
                    }
                }
            });
            window.addEventListener('keyup', key => {
                // 32 = Space
                if (key.keyCode + 32 == this.moveKey) {
                    clearInterval(this.moveInterval);
                    this.moveInterval = null;
                    this.moveKey = 0;
                } else if (key.keyCode == 32) {
                    this.shoot();
                }
            });
        }

        shoot () {
            this.bullets.push(new Rectangle(game.player.ship.position.x + (game.player.ship.width / 2) - 1, game.player.ship.position.y - 5, 2, 10, '#4caf50', true));
            game.canvas.addGraphic(this.bullets[this.bullets.length - 1]);
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

        moveBullets() {
            for (let i = 0; i < this.bullets.length; i++) {
                let bullet = this.bullets[i];
                bullet.position.y -= 6;
                let hit = false;
                game.enemyController.enemies.forEach(enemy => {
                    if (enemy.alive) {
                        if (bullet.position.x >= enemy.alien.position.x && bullet.position.x <= enemy.alien.position.x + enemy.alien.width) {
                            if (bullet.position.y >= enemy.alien.position.y && bullet.position.y <= enemy.alien.position.y + enemy.alien.height) {
                                enemy.die();
                                hit = true;
                            }
                        }
                    }
                });
                if (bullet.position.y <= -6 || hit) {
                    this.bullets.splice(i, 1);
                    game.canvas.removeGraphic(bullet);
                }
            }
        }
    },
    player: null,
    enemyController: null,
    init () {
        this.canvas = new Canvas(800, 500);
        document.body.appendChild(this.canvas.view);
        this.player = new this.playerClass();
        this.enemyController = new this.enemyControllerClass(this.settings.enemyCount, this.settings.rowCount);
    }
}

game.init();