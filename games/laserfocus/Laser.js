class Laser {
	constructor(x, y, color) {
		this.x = x
		this.y = y
		this.direction = 0
		this.color = color
		this.inGoal = false
	}
	
	getInGoal(board) {
		var x = this.x
		var y = this.y
		var direction = this.direction
		while ((x>-3 && x<10) && (y>-3&&y<10)) {
			switch (direction) {
				case 0: x++; break;
				case 1: y++; break;
				case 2: x--; break;
				case 3: y--; break;
			}
			
			for (var piece of board.pieces) {
				if (x==piece.x && y==piece.y) {
					if (piece instanceof Piece) {
						if ((piece.rotation=="LEFT" && (direction==0 || direction==2)) || (piece.rotation=="RIGHT" && (direction==1 || direction==3))) {
							direction = (direction+1)%4
						} else {
							direction--
							if (direction<0) {direction+=4}
						}
					} else if (piece instanceof Goal) {
						return [true, piece.player]
					}
					break
				}
			}
		}
		return [false, null]
	}
	
	draw(board) {
		this.inGoal = false
		var x = this.x
		var y = this.y
		var direction = this.direction
		var lastX
		var lastY
		while ((x>-3 && x<10) && (y>-3&&y<9) && !this.inGoal) {
			lastX = x
			lastY = y
			
			switch (direction) {
				case 0: x++; break;
				case 1: y++; break;
				case 2: x--; break;
				case 3: y--; break;
			}
			
			strokeWeight(6)
			stroke(this.color)
			line(50+100*lastX, 50+100*lastY, 50+100*x, 50+100*y)
			
			for (var piece of board.pieces) {
				if (x==piece.x && y==piece.y) {
					if (piece instanceof Piece) {
						if ((piece.rotation=="LEFT" && (direction==0 || direction==2)) || (piece.rotation=="RIGHT" && (direction==1 || direction==3))) {
							direction = (direction+1)%4
						} else {
							direction--
							if (direction<0) {direction+=4}
						}
					} else if (piece instanceof Goal) {
						this.inGoal = true
					}
					break
				}
			}
		}
		noStroke()
		fill(150, 150, 150)
		rect(this.x*100+10, this.y*100+10, 40, 80)
		fill(140, 140, 140)
		rect(this.x*100+50, this.y*100+20, 40, 60)
	}
}