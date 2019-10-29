canvas = new Canvas(800, 500);
document.body.appendChild(canvas.view);

let rectangle = new Rectangle(20, 20, 100, 150, '#0F0');
let rectangle2 = new Rectangle(50, 50, 100, 100);

canvas.addChild(rectangle);
canvas.addChild(rectangle2);

rectangle.position.set(300, 300);
rectangle2.position.set(100, 100)