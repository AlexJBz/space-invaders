// This is a very bespoke and probably quite bad canvas framework
class Canvas {
    constructor(width, height) {
        this.view = document.createElement('canvas');
        this.context = this.view.getContext('2d');
        this.view.width = width;
        this.view.height = height;
        this.graphics = [];
        this.context.imageSmoothingEnabled = false;
        this.renderer = setInterval(()=> {
            this.render();
        }, 1000 / 30);
    }

    render() {  
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.beginPath();
        this.graphics.forEach(graphic => {
            graphic.draw(this.context);
        });
    }

    addGraphic(child) {
        let found = false;
        this.graphics.forEach(graphic => {
            if (graphic == child) {
                console.log('Tried to duplicate')
                found = true;
                return;
            }
        });
        if (!found) {
            this.graphics.push(child);
        }
    }

    removeGraphic(child) {
        for (let i = 0; i < this.graphics.length; i++) {
            let graphic = this.graphics[i];
            if (graphic == child) {
                this.graphics.splice(i, 1);
                return;
            }
        }
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
        console.log('[FRAMEWORK ERROR]: SET A DRAW FUNCTION FOR ' + this);
    }
}

class Rectangle extends Graphic {
    constructor(x, y, width, height, colour, fill, outline, outlineThickness, outlineColour) {
        super(x, y, width, height);
        this.colour = colour;
        this.fill = fill;
        this.outline = outline;
        this.outlineThickness = outlineThickness;
        this.outlineColour = outlineColour;
    }

    draw (context) {
        context.lineWidth = 1;
        context.beginPath();
        context.strokeStyle = this.colour;
        if (this.fill) {
            context.fillStyle = this.colour;
            context.fillRect(this.position.x, this.position.y, this.width, this.height);
        } else {
            context.rect(this.position.x, this.position.y, this.width, this.height);
        }
        if (this.outline) {
            context.strokeStyle = this.outlineColour;
            context.lineWidth = this.outlineThickness;
            context.strokeRect(this.position.x, this.position.y, this.width, this.height);
        }
        context.stroke();
    }
}

class Sprite extends Graphic {
    constructor(x, y, width, height, imageUrl) {
        super(x, y, width, height);
        this.image = new Image(width, height);
        this.image.src = imageUrl;
    }

    draw(context) {
        context.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

