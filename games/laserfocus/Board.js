class Board {
	constructor() {
		this.pieces = []
		this.lasers = []
		
		this.setupPieces()
	}
	
	copy() {
		var b = new Board()
		b.pieces = []
		for (var piece of this.pieces) {
			b.pieces.push(piece.copy())
		}
		return b
	}
	
	toString() {
		var string = ''
		for (var y = 1; y<8; y++) {
			for (var x = 1; x<8; x++) {
				string += (this.getItem(x, y)==null ? ' ' : this.getItem(x, y).toString())
			}
			string += '\n'
		}
		return string
	}
	
	getItem(x, y) {
		for (var piece of this.pieces) {
			if (piece.x==x && piece.y==y) {
				return piece
			}
		}
		return null
	}
	
	removePiece(x, y) {
		var p = []
		for (var piece of this.pieces) {
			if (!(piece.x==x && piece.y==y)) {
				p.push(piece)
			}
		}
		this.pieces = p
	}
	
	setupPieces() {
		for (var x = 5; x < 8; x++) {
			for (var y = 1; y < 4; y++) {
				if (!(x==7 && y==1)) {
					this.pieces.push(new Piece(x, y, 1, "LEFT"))
				}
			}
			for (var y = 5; y < 8; y++) {
				if (!(x==7 && y==7)) {
					this.pieces.push(new Piece(x, y, 2, "RIGHT"))
				}
			}
		}
		
		this.pieces.push(new Goal(7, 1, 1))
		this.pieces.push(new Goal(7, 7, 2))
		
		this.lasers.push(new Laser(0, 4, color(255, 0, 0)))
		
		this.validSpaces = [
					[1,1],	[2,1],	[3,1],	[4,1],	[5,1],	[6,1],	[7,1],
					[1,2],	[2,2],	[3,2],	[4,2],	[5,2],	[6,2],	[7,2],
			[0,3],	[1,3],	[2,3],	[3,3],	[4,3],	[5,3],	[6,3],	[7,3],
					[1,4],	[2,4],	[3,4],	[4,4],	[5,4],	[6,4],	[7,4],
			[0,5],	[1,5],	[2,5],	[3,5],	[4,5],	[5,5],	[6,5],	[7,5],
					[1,6],	[2,6],	[3,6],	[4,6],	[5,6],	[6,6],	[7,6],
					[1,7],	[2,7],	[3,7],	[4,7],	[5,7],	[6,7],	[7,7]]
		
	}
	
	draw() {
		for (var space of this.validSpaces) {
			var x = space[0]
			var y = space[1]
			noStroke()
			fill(color(100*(2-(x+y)%2), 100*(2-(x+y)%2), 100*(2-(x+y)%2)))
			rect(x*100, y*100, 100, 100)
		}
		
		for (var piece of this.pieces) {
			piece.draw()
		}
		
		for (var laser of this.lasers) {
			laser.draw(this)
		}
	}
	
	isWinning(player) {
		for (var laser of this.lasers) {
			var r = laser.getInGoal(this)[0]
			var p = laser.getInGoal(this)[1]
			if (r && p==player) {return true}
		}
		return false
	}
	
	isGameOver() {
		for (var laser of this.lasers) {
			if (laser.getInGoal(this)[0]) {return true}
		}
		return false
	}
	
	getMoveOptions(piece) {
		var options = []
		
		var x = piece.x
		var y = piece.y
		
		options.push([x, y])
		
		for (var option of [[1,0], [1,1], [0,1], [-1,1], [-1,0], [-1,-1], [0,-1], [1,-1]]) {
			var a = option[0]
			var b = option[1]
			
			var space = this.getItem(x+a, y+b)
			
			for (var validspace of this.validSpaces) {
				if (space==null && x+a==validspace[0] && y+b==validspace[1]) {
					options.push([x+a,y+b])
					
				}
			}
		}
		
		for (var option of [[2,2], [2,-2], [-2,-2], [-2,2]]) {
			var a = option[0]
			var b = option[1]
			
			var space = this.getItem(x+a, y+b)
			var space2 = this.getItem(x+a/2, y+b/2)
			
			for (var validspace of this.validSpaces) {
				if (space==null && space2!=null && space2 instanceof Piece && space2.player!=piece.player && x+a==validspace[0] && y+b==validspace[1]) {
					options.push([x+a,y+b])
				}
			}
		}
		
		return options
	}
	
	getPossibleMoves(turn) {
		var boards = []
		for (var piece of this.pieces) {
			if (piece instanceof Piece && piece.player==turn) {
				for (var move of this.getMoveOptions(piece)) {
					var b = this.copy()
					if (abs(move[0]-piece.x)==2) {
						b.removePiece((move[0]+piece.x)/2, (move[1]+piece.y)/2)
					}
					b.getItem(piece.x, piece.y).move(move[0], move[1])
					boards.push(b)
				}
			}
		}
		
		return boards
	}
}