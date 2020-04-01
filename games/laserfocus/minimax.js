function score(board) {
	// assumes player 2 is maximizer
	if (board.isWinning(2)) {
		return Infinity
	} else if (board.isGameOver()) {
		return -Infinity
	} else {
		return 0.0
	}
}

function minimax(board, depth, isMaximizing) {
	if (depth==0 || board.isGameOver()) {
		return score(board)
	}
	if (isMaximizing) {
		//Player 2 is maximizing
		maxScore = -Infinity
		for (var b of board.getPossibleMoves(2)) {
			s = minimax(b, depth-1, false)
			maxScore = max(s, maxScore)
		}
		return maxScore
	} else {
		minScore = Infinity
		for (var b of board.getPossibleMoves(1)) {
			s = minimax(b, depth-1, true)
			minScore = min(s, minScore)
		}
		return minScore
	}
}

function minimaxAlphaBeta(board, depth, isMaximizing, alpha, beta) {
	if (depth==0 || board.isGameOver()) {
		return score(board)
	}
	if (isMaximizing) {
		//Player 2 is maximizing
		maxScore = -Infinity
		for (var b of board.getPossibleMoves(2)) {
			s = minimaxAlphaBeta(b, depth-1, false, alpha, beta)
			maxScore = max(s, maxScore)
			alpha = max(s, alpha)
			if (beta <= alpha) {break}
		}
		return maxScore
	} else {
		minScore = Infinity
		for (var b of board.getPossibleMoves(1)) {
			s = minimaxAlphaBeta(b, depth-1, true, alpha, beta)
			minScore = min(s, minScore)
			beta = min(s, beta)
			if (beta <= alpha) {break}
		}
		return minScore
	}
}
