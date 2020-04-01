let board
let turn
let state
let selected
let options
let choice
let botPlaying
let DEPTH

let timer

function setup() {
	board = new Board()
	DEPTH = 4
	
	depthText = createDiv("Depth: " + DEPTH);
	depthMinus = createButton("-");
	depthPlus = createButton('+');
	
	depthPlus.mousePressed(function() {
		if (DEPTH > 1) {DEPTH++;depthText.html("Depth: " + DEPTH);}
	});
	depthMinus.mousePressed(function() {
		DEPTH--;depthText.html("Depth: " + DEPTH);
	});
	createDiv('')
	
	createCanvas(900, 900)
	
	// state 1: none selected
	// state 2: piece selected, waiting to click on option
	// state 3: option chosen, moving piece and stuff
	state = 1
	turn = 1
	
	timer = 30
	botPlaying = true
}

function drawScreen() {
	background(0)
	board.draw()
}

function getHovered() {
	let selected = null
	for (var piece of board.pieces) {
		var inbounds = mouseX>15+100*piece.x && mouseX<85+100*piece.x && mouseY>15+100*piece.y && mouseY<85+100*piece.y
		if (piece instanceof Piece && inbounds && piece.player==turn) {
			selected = piece
			piece.drawBorder(color(255))
		}
	}
	return selected
}

function hoverOptions() {
	for (var option of options) {
		var x = option[0]
		var y = option[1]
		var inbounds = mouseX>15+100*x && mouseX<85+100*x && mouseY>15+100*y && mouseY<85+100*y
		noFill()
		strokeWeight(2)
		if (inbounds) {
			stroke(color(255, 0, 0))
			
		} else {
			stroke(color(255))
		}
		rect(15+100*x, 15+100*y, 70, 70)
	}
}

function runGame() {
	if (state==1) {
			
		drawScreen()
		
		selected = getHovered()
		
		if (mouseIsPressed && !pMouseIsPressed) {
			
			if (selected!=null) {
				options = board.getMoveOptions(selected)
				
				drawScreen()
				selected.drawBorder(color(255))
				state = 2
			}
		}
		
	} else if (state==2) {
		hoverOptions()
		
		if (mouseIsPressed && !pMouseIsPressed) {
			choice = null
			for (var option of options) {
				var x = option[0]
				var y = option[1]
				var inbounds = mouseX>15+100*x && mouseX<85+100*x && mouseY>15+100*y && mouseY<85+100*y
				if (inbounds) {
					choice = option
					state = 3
					break
				}
			}
			if (choice==null) {
				state = 1
			}
		}
	} else if (state==3) {
		turn = (turn%2) + 1
		
		if (abs(choice[0]-selected.x)==2) {
			board.removePiece((choice[0]+selected.x)/2, (choice[1]+selected.y)/2)
		}
		
		selected.move(choice[0], choice[1])
		
		state = 1
	}
}

function runBot() {
	// todo: this thing is broken
	
	//console.log(board.getPossibleMoves(turn))
	
	maxScore = -Infinity
	var goodBoards = []
	for (var b of board.getPossibleMoves(turn)) {
		s = minimaxAlphaBeta(b, DEPTH, false, -Infinity, Infinity)
		if (s > maxScore) {
			maxScore = s
			goodBoards = [b]
		} else if (s==maxScore) {
			console.log(b.toString())
			console.log(score(b), s)
			console.log('----------------------')
			goodBoards.push(b)
		}
	}
	
	if (maxScore==-Infinity) {
		console.log('bot gave up')
	} else {
		console.log(maxScore)
	}
	
	console.log('---------------------------')
	
	/*
	for (var b of goodBoards) {
		console.log(b.toString())
		console.log(score(b), minimaxAlphaBeta(b, DEPTH, false, -Infinity, Infinity))
		console.log('----------------------')
	}*/
	
	if (goodBoards==[]) {goodBoards = [random(board.getPossibleMoves(turn))];console.log('no good boards')}
	board = random(goodBoards)
	
	if (minimaxAlphaBeta(board, DEPTH, false, -Infinity, Infinity)!=maxScore) {
		console.log(goodBoards)
		console.log(minimaxAlphaBeta(board, DEPTH, false, -Infinity, Infinity))
	}
	
	turn = (turn%2)+1
}

function draw() {
	if (!board.isGameOver()) {
		if (turn==1) {
			runGame()
		} else if (!botPlaying && turn==2) {
			runGame()
		} else {
			drawScreen()
			//makes a half second delay before the bot plays
			if (timer > 0) {
				timer--
			} else {
				runBot()
				timer = 30
			}
		}
	} else {
		drawScreen()
		if (mouseIsPressed && !pMouseIsPressed) {
			console.log('winner: ', board.isWinning(1) ? 'Red' : 'Blue')
			board = new Board()
			turn = 1
			state = 1
		}
	}
	
	pMouseIsPressed = mouseIsPressed
}