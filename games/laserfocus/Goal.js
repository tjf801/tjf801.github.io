class Goal {
	constructor(x, y, player) {
		this.x = x
		this.y = y
		this.player = player
		this.activated = false
	}
	
	copy() {
		return new Goal(this.x, this.y, this.player)
	}
	
	toString() {
		return 'G'
	}
	
	draw() {
		noFill()
		stroke(0)
		strokeWeight(2)
		rect(15+100*this.x, 15+100*this.y, 70, 70)
	}
}