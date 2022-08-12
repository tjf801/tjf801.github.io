const Pieces = {
	O: {
		blocks: [[0, 0], [1, 0], [0, 1], [1, 1]],
		rotationpoint: [0.5, 0.5],
		color: color(255, 255, 0)
	},
	L: {
		blocks: [[0, 0], [0, 1], [0, 2], [1, 2]],
		rotationpoint: [0, 1],
		color: color(255, 127, 0)
	},
	J: {
		blocks: [[1, 0], [1, 1], [1, 2], [0, 2]],
		rotationpoint: [1, 1],
		color: color(0, 0, 255)
	},
	S: {
		blocks: [[0, 1], [1, 1], [1, 0], [2, 0]],
		rotationpoint: [1, 1],
		color: color(0, 255, 0)
	},
	Z: {
		blocks: [[0, 0], [1, 0], [1, 1], [2, 1]],
		rotationpoint: [1, 1],
		color: color(255, 0, 0)
	},
	T: {
		blocks: [[0, 1], [1, 0], [1, 1], [1, 2]],
		rotationpoint: [1, 1],
		color: color(127, 0, 255),
	},
	I: {
		blocks: [[0, 0], [0, 1], [0, 2], [0, 3]],
		rotationpoint: [0.5, 1.5],
		color: color(0, 255, 255)
	}
}

function getNewRandomPiece(position) {
	return Piece(Pieces["OLJSZTI"[Math.floor(random(0, 7))]], position)
}

class Block {
	constructor () {
		
	}
}

class Piece {
	constructor (shape, startPosition) {
		this.shape = shape
		
	}
}