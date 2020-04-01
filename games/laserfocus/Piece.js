class Piece {
	constructor(x, y, player, rotation) {
		this.x = x
		this.y = y
		this.player = player
		this.rotation = rotation
		this.color = player==1 ? color(250, 120, 120) : color(150, 150, 250)
	}
	
	copy() {
		return new Piece(this.x, this.y, this.player, this.rotation)
	}
	
	toString() {
		return (this.rotation=="LEFT" ? '\\' : '/')
	}
	
	move(x, y) {
		if (this.x==x && this.y==y) {
			this.rotation = this.rotation=="RIGHT" ? "LEFT" : "RIGHT"
		} else {
			this.x = x
			this.y = y
		}
	}
	
	draw() {
		var pixelX = 15+100*this.x
		var pixelY = 15+100*this.y
		fill(this.color)
		rect(pixelX, pixelY, 70, 70)
		this.drawBorder(color(0))
		fill(255)
		stroke(0)
		strokeWeight(2)
		if (this.rotation=="RIGHT") {
			quad(pixelX+60, pixelY+5, pixelX+65, pixelY+10, pixelX+10, pixelY+65, pixelX+5, pixelY+60)
		} else {
			quad(pixelX+10, pixelY+5 , pixelX+5, pixelY+10, pixelX+60, pixelY+65, pixelX+65, pixelY+60)
		}
	}
	
	drawBorder(color) {
		noFill()
		stroke(color)
		strokeWeight(2)
		rect(15+100*this.x, 15+100*this.y, 70, 70)
	}
}