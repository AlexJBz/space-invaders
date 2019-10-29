canvas = new Canvas(800, 500);
document.body.appendChild(canvas.view);

let rectangle = new Rectangle(20, 20, 100, 150, '#0F0');
let rectangle2 = new Rectangle(50, 50, 100, 100);
let spriteTest = new Sprite(0, 0, 100, 100, 'https://i.pinimg.com/originals/77/3a/eb/773aeb0834b3f37e3eaac542f913c65a.png');
canvas.addChild(rectangle);
canvas.addChild(rectangle2);
canvas.addChild(spriteTest);

spriteTest.position.set(100, 200);

rectangle.position.set(300, 300);
rectangle2.position.set(100, 100)