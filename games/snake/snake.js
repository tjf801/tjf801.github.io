class Snake {
	constructor(x, y) {
		this.headX = x;
		this.headY = y;
		this.segments = [];
		this.direction = "STOP";
		this.addNewSegments = 0;
	}
	
	draw() {
		fill(255);
		rect(this.headX*pixelSize, this.headY*pixelSize, pixelSize, pixelSize);
		
		for (var segment of this.segments) {
			rect(segment[0]*pixelSize, segment[1]*pixelSize, pixelSize, pixelSize);
		}
	}
	
	move() {
		if (this.direction=="STOP") {return;}
		
		this.segments.unshift([this.headX, this.headY]);
		
		if (this.direction=="UP") {
			this.headY--;
		} else if (this.direction=="RIGHT") {
			this.headX++;
		} else if (this.direction=="DOWN") {
			this.headY++;
		} else if (this.direction=="LEFT") {
			this.headX--;
		}
		
		if (this.addNewSegments<=0) {
			this.segments.pop();
		} else {
			this.addNewSegments--;
		}
	}
	
	inBody(x, y) {
		for (var segment of this.segments) {
			if (segment[0]==x && segment[1]==y) {
				return true;
			}
		}
		return false;
	}
}