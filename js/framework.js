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
    constructor(x, y, width, height, colour = '#000', fill = false, outline = false, outlineThickness = 1, outlineColour = '#000') {
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
        this.colour = colour;
        this.fill = fill;
        this.outline = outline;
        this.outlineThickness = outlineThickness;
        this.outlineColour = outlineColour;
    }

    draw () {
        console.log('[FRAMEWORK ERROR]: SET A DRAW FUNCTION FOR GRAPHIC');
    }
}

class Rectangle extends Graphic {
    constructor(x, y, width, height, colour, fill, outline, outlineThickness, outlineColour) {
        super(x, y, width, height, colour, fill, outline, outlineThickness, outlineColour);
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

