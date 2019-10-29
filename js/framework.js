// This is a very bespoke and probably quite bad canvas framework
class Canvas {
    constructor(width, height) {
        this.view = document.createElement('canvas');
        this.view.width = width;
        this.view.height = height;
    }
}