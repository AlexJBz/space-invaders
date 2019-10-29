// This is a very bespoke and probably quite bad canvas framework
class Canvas {
    constructor(width, height) {
        this.view = document.createElement('canvas');
        this.context = this.view.getContext('2d');
        this.view.width = width;
        this.view.height = height;
        this.graphics = [];
        this.renderer = setInterval(()=> {
            this.render();
        }, 1000 / 30);
    }

    render() {  
        this.graphics.forEach(graphic => {
            graphic.draw(this.context);
        });
    }

    addChild(child) {
        this.graphics.push(child);
    }
}

class Graphic {
    constructor(x, y, width, height) {
        this.position = {
            x: x,
            y: y,
            set (x, y) {
                this.x = x;
                this.y = y;
            }
        }
        this.width = width;
        this.height = height;
    }

    draw () {
        console.log('[FRAMEWORK ERROR]: SET A DRAW FUNCTION FOR GRAPHIC');
    }
}

class Rectangle extends Graphic {
    constructor(x, y, width, height) {
        super(x, y, width, height);
    }

    draw (context) {
        context.beginPath();
        context.rect(this.position.x, this.position.y, this.width, this.height);
        context.stroke();
    }
}

