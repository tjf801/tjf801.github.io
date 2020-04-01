class Fruit {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.value = 1;
	}
	
	draw() {
		fill(255, 0, 0);
		rect(this.x*pixelSize, this.y*pixelSize, pixelSize, pixelSize);
	}
}