const pixelSize = 20;

const WIDTH = 40;
const HEIGHT = 30;

let snake;
let fruit;

let gameover;

function setup() {
	createCanvas(WIDTH*pixelSize, HEIGHT*pixelSize);
	frameRate(10);
	gameover = false;
	snake = new Snake(floor(WIDTH/2), floor(HEIGHT/2));
	getNewFruit();
	loop();
}

function keyPressed() {
	if (!gameover) {
		if (keyCode==UP_ARROW && snake.direction!="DOWN") {
			snake.direction = "UP";
		} else if (keyCode==RIGHT_ARROW && snake.direction!="LEFT") {
			snake.direction = "RIGHT";
		} else if (keyCode==DOWN_ARROW && snake.direction!="UP") {
			snake.direction = "DOWN";
		} else if (keyCode==LEFT_ARROW && snake.direction!="RIGHT") {
			snake.direction = "LEFT";
		}
	} else {
		//reset the game if space is pressed
		if (keyCode==32) {console.log(1+snake.segments.length);setup();}
	}
}

function getNewFruit() {
	if (fruit==undefined) {fruit = new Fruit(floor(random(WIDTH)), floor(random(HEIGHT)));}
	while ((fruit.x==snake.headX && fruit.y==snake.headY) || snake.inBody(fruit.x, fruit.y)) {
		fruit = new Fruit(floor(random(WIDTH)), floor(random(HEIGHT)));
	}
}

function draw() {
	
	if (gameover) {noLoop(); return;}
	
	background(51);
	snake.draw();
	snake.move();
	fruit.draw();
	
	if (fruit.x==snake.headX && fruit.y==snake.headY) {
		snake.addNewSegments = fruit.value;
		getNewFruit();
	}
	
	gameover = (snake.headX==-1 || snake.headX==WIDTH || snake.headY==-1 || snake.headY==HEIGHT) || (snake.inBody(snake.headX, snake.headY));
	
}